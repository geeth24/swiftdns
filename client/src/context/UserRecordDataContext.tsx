'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

interface UserRecordDataContextType {
  createUserRecordData: (
    userId: string,
    recordType: 'cf' | 'vercel',
    data: RecordData,
  ) => Promise<void>;
  addIPAddress: (userId: string, ipAddress: string) => Promise<void>;
  addDNSRecord: (userId: string, recordData: DNSRecord) => Promise<void>;
  updateDNSRecord: (
    userId: string,
    recordId: string,
    updatedData: Partial<DNSRecord>,
  ) => Promise<void>;
  getUserRecordData: (userId: string, recordType: 'cf' | 'vercel') => Promise<RecordData | null>;
  getIPAddresses: (userId: string) => Promise<string[]>;
  getDNSRecords: (userId: string) => Promise<DNSRecord[]>;
  addDNSType: (dnsType: DNSType) => Promise<void>;
  getDNSTypes: () => Promise<DNSType[]>;
}

interface RecordData {
  email?: string;
  apikey?: string;
  token: string;
}

export interface DNSRecord {
  id?: string; // Optional ID for tracking the document
  type: string;
  name: string;
  value: string;
}

export interface DNSType {
  type: '' | 'A' | 'CNAME' | 'AAAA' | 'TXT';
}

const UserRecordDataContext = createContext<UserRecordDataContextType | null>(null);

export const UserRecordDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const firestore = getFirestore();

  const createUserRecordData = async (
    userId: string,
    recordType: 'cf' | 'vercel',
    data: RecordData,
  ) => {
    try {
      const docRef = doc(firestore, 'userRecordData', userId, recordType, 'info');
      await setDoc(docRef, data);
    } catch (error: any) {
      console.error('Error creating user record data:', error.message);
    }
  };

  const addIPAddress = async (userId: string, ipAddress: string) => {
    try {
      const colRef = collection(firestore, 'userRecordData', userId, 'ipAddresses');
      await addDoc(colRef, { ipAddress });
    } catch (error: any) {
      console.error('Error adding IP address:', error.message);
    }
  };

  const addDNSRecord = async (userId: string, recordData: DNSRecord) => {
    try {
      const colRef = collection(firestore, 'userRecordData', userId, 'dnsRecords');
      const docRef = await addDoc(colRef, recordData);
      // Update the DNS record with its ID (if necessary)
      await updateDoc(docRef, { id: docRef.id });
    } catch (error: any) {
      console.error('Error adding DNS record:', error.message);
    }
  };

  const updateDNSRecord = async (
    userId: string,
    recordId: string,
    updatedData: Partial<DNSRecord>,
  ) => {
    try {
      const docRef = doc(firestore, 'userRecordData', userId, 'dnsRecords', recordId);
      await updateDoc(docRef, updatedData);
    } catch (error: any) {
      console.error('Error updating DNS record:', error.message);
    }
  };

  const getUserRecordData = async (
    userId: string,
    recordType: 'cf' | 'vercel',
  ): Promise<RecordData | null> => {
    try {
      const docRef = doc(firestore, 'userRecordData', userId, recordType, 'info');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as RecordData;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error: any) {
      console.error('Error fetching user record data:', error.message);
      return null;
    }
  };

  const getIPAddresses = async (userId: string): Promise<string[]> => {
    try {
      const colRef = collection(firestore, 'userRecordData', userId, 'ipAddresses');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data().ipAddress);
    } catch (error: any) {
      console.error('Error fetching IP addresses:', error.message);
      return [];
    }
  };

  const getDNSRecords = async (userId: string): Promise<DNSRecord[]> => {
    try {
      const colRef = collection(firestore, 'userRecordData', userId, 'dnsRecords');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as DNSRecord,
      );
    } catch (error: any) {
      console.error('Error fetching DNS records:', error.message);
      return [];
    }
  };

  const addDNSType = async (dnsType: DNSType) => {
    try {
      const collectionRef = collection(firestore, 'dnsTypes');
      await addDoc(collectionRef, dnsType);
    } catch (error: any) {
      console.error('Error adding DNS type:', error.message);
    }
  };

  const getDNSTypes = async (): Promise<DNSType[]> => {
    try {
      const colRef = collection(firestore, 'dnsTypes');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data() as DNSType);
    } catch (error: any) {
      console.error('Error fetching DNS types:', error.message);
      return [];
    }
  };

  return (
    <UserRecordDataContext.Provider
      value={{
        createUserRecordData,
        addIPAddress,
        addDNSRecord,
        updateDNSRecord,
        getUserRecordData,
        getIPAddresses,
        getDNSRecords,
        addDNSType,
        getDNSTypes,
      }}
    >
      {children}
    </UserRecordDataContext.Provider>
  );
};

export const useUserRecordData = () => {
  const context = useContext(UserRecordDataContext);
  if (!context) {
    throw new Error('useUserRecordData must be used within a UserRecordDataProvider');
  }
  return context;
};
