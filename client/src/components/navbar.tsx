'use client';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { GlobeIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import { ModeToggle } from './ui/mode-toggle';
import { useAuth } from '@/context/AuthContext';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { useUserRecordData } from '@/context/UserRecordDataContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import SwiftDNSLogo from './swiftdns-logo';

function Navbar() {
  const { user, logout } = useAuth();
  const [ipIsOpen, setIpIsOpen] = React.useState(false);
  const { addIPAddress, getIPAddresses } = useUserRecordData();
  const [ipAddresses, setIpAddresses] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [newIp, setNewIp] = React.useState('');

  useEffect(() => {
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent">
      <div className="absolute inset-0 z-[-1] bg-secondary/50 backdrop-blur-3xl" />
      <div className="mx-auto md:px-6">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <SwiftDNSLogo className="w-36" />
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/providers">
                  <Button
                    className="hidden md:block"
                    variant="ghost"
                    onClick={() => {
                      setIpIsOpen(false);
                    }}
                  >
                    Providers
                  </Button>
                </Link>
                <Button onClick={logout}>
                  <LogOutIcon className="mr-2 h-5 w-5" />
                  Logout
                </Button>
                <Sheet open={ipIsOpen} onOpenChange={setIpIsOpen}>
                  <SheetTrigger asChild>
                    <Button size="icon">
                      <GlobeIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>IP Addresses</SheetTitle>
                      <SheetDescription>View your IP addresses and manage them</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-2">
                      <Label htmlFor="ip-address">IP Address</Label>
                      <Input
                        id="ip-address"
                        value={newIp}
                        onChange={(e) => setNewIp(e.target.value)}
                        className=""
                      />
                    </div>
                    <Button
                      onClick={() => {
                        addIPAddress(user.uid, newIp);
                        setNewIp('');
                        getIPAddresses(user.uid).then((ips) => {
                          setIpAddresses(ips);
                        });
                      }}
                      className="mt-4"
                    >
                      Add IP
                    </Button>
                    <div className="mt-4 space-y-2">
                      {loading ? <p>Loading...</p> : ipAddresses.map((ip) => <p key={ip}>{ip}</p>)}
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <Link href="/login">
                <Button>
                  <LogInIcon className="mr-2 h-5 w-5" />
                  Log In
                </Button>
              </Link>
            )}

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
