'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOutIcon, LogInIcon, MenuIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
import { useAuth } from '@/context/AuthContext';
import SwiftDNSLogo from './swiftdns-logo';
import { cn } from '@/lib/utils';

function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = user
    ? [
        { href: '/providers/cf', label: 'Zones' },
        { href: '/config', label: 'Config' },
      ]
    : [];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <SwiftDNSLogo className="h-5 w-auto" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
              / v2
            </span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      'relative rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-[5px] h-px bg-primary" />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="hidden h-8 rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.18em] md:inline-flex"
            >
              <LogOutIcon className="mr-1.5 size-3.5" strokeWidth={1.5} />
              Logout
            </Button>
          ) : (
            <Link href="/login" className="hidden md:inline-flex">
              <Button
                size="sm"
                className="h-8 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
              >
                <LogInIcon className="mr-1.5 size-3.5" strokeWidth={1.5} />
                Sign in
              </Button>
            </Link>
          )}
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="size-4" strokeWidth={1.5} />
            ) : (
              <MenuIcon className="size-4" strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <span className="block rounded-sm px-3 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                  {item.label}
                </span>
              </Link>
            ))}
            {user ? (
              <button
                onClick={logout}
                className="block rounded-sm px-3 py-2 text-left font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <span className="block rounded-sm px-3 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                  Sign in
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
