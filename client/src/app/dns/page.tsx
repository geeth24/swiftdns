'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DNSRecord, DNSType, useUserRecordData } from '@/context/UserRecordDataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function DNSManagement() {
  const { user } = useAuth();
  const { getDNSRecords, addDNSRecord, updateDNSRecord, getDNSTypes, addDNSType } =
    useUserRecordData();
  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([]);
  const [dnsTypes, setDnsTypes] = useState<DNSType[]>([]);
  const [newRecord, setNewRecord] = useState<DNSRecord>({ type: '', name: '', value: '' });
  const [newDNSType, setNewDNSType] = useState<DNSType>({ type: 'A' });

  useEffect(() => {
    const fetchDNSData = async () => {
      if (user) {
        const records = await getDNSRecords(user.uid);
        const types = await getDNSTypes();
        setDnsRecords(records);
        setDnsTypes(types);
      }
    };

    fetchDNSData();
  }, [user, getDNSRecords, getDNSTypes]);

  const handleAddDNSRecord = async () => {
    if (user) {
      await addDNSRecord(user.uid, newRecord);
      setNewRecord({ type: '', name: '', value: '' });
      const updatedRecords = await getDNSRecords(user.uid);
      setDnsRecords(updatedRecords);
    }
  };

  const handleAddDNSType = async () => {
    if (user) {
      await addDNSType(newDNSType);
      setNewDNSType({ type: '' });
      const updatedTypes = await getDNSTypes();
      setDnsTypes(updatedTypes);
    }
  };

  const handleUpdateDNSRecord = async (id: string) => {
    if (user) {
      await updateDNSRecord(user.uid, id, { value: 'new-value' }); // Example update
      const updatedRecords = await getDNSRecords(user.uid);
      setDnsRecords(updatedRecords);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>DNS Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3>Add DNS Type</h3>
          <input
            type="text"
            placeholder="DNS Type (e.g., A, CNAME, AAAA, TXT)"
            value={newDNSType.type}
            onChange={(e) =>
              setNewDNSType({ type: e.target.value as '' | 'A' | 'CNAME' | 'AAAA' | 'TXT' })
            }
          />
          <Button onClick={handleAddDNSType}>Add DNS Type</Button>
        </div>

        <div>
          <h3>Add DNS Record</h3>
          <select
            value={newRecord.type}
            onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
          >
            <option value="">Select Type</option>
            {dnsTypes.map((dnsType) => (
              <option key={dnsType.type} value={dnsType.type}>
                {dnsType.type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Name"
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Value"
            value={newRecord.value}
            onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
          />
          <Button onClick={handleAddDNSRecord}>Add DNS Record</Button>
        </div>

        <div>
          <h3>Existing DNS Records</h3>
          {dnsRecords.map((record) => (
            <div key={record.id}>
              <p>
                {record.type} - {record.name} - {record.value}
              </p>
              <Button onClick={() => handleUpdateDNSRecord(record.id!)}>Update Record</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DNSManagement;
