'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { GlobeIcon, LogInIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
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
  const [ipIsOpen, setIpIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addIPAddress, getIPAddresses } = useUserRecordData();
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newIp, setNewIp] = useState('');

  useEffect(() => {
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
        setLoading(false);
      });
    }
  }, [user, getIPAddresses]);

  const navItems = user
    ? [
        { href: '/providers/cf', label: 'Zones' },
        { href: '/config', label: 'Config' },
      ]
    : [];

  const renderNavItems = (mobile = false) => (
    <>
      {navItems.map((item, index) => (
        <React.Fragment key={item.label}>
          {item.href ? (
            <Link href={item.href}>
              <Button
                variant="ghost"
                className={mobile ? 'w-full justify-start' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              className={mobile ? 'w-full justify-start' : ''}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent">
      <div className="absolute inset-0 z-[-1] bg-secondary/50 backdrop-blur-3xl" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <SwiftDNSLogo className="w-36" />
            </Link>
          </div>
          <div className="hidden md:block">{renderNavItems()}</div>
          <div className="flex items-center">
            {user ? (
              <Button onClick={logout} className="hidden md:inline-flex">
                <LogOutIcon className="mr-2 h-5 w-5" />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="hidden md:inline-flex">
                  <LogInIcon className="mr-2 h-5 w-5" />
                  Log In
                </Button>
              </Link>
            )}
            <div className="ml-4">
              <ModeToggle />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="ml-4 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {renderNavItems(true)}
          {user ? (
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOutIcon className="mr-2 h-5 w-5" />
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start">
                <LogInIcon className="mr-2 h-5 w-5" />
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
