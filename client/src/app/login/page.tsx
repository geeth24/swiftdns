'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { login, loginWithGoogle, createUser, forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      setError('Enter your email first');
      return;
    }
    setError('');
    try {
      await forgotPassword(email);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background pt-14 text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)] opacity-40"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-56px)] max-w-[1320px] grid-cols-1 px-6 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <section className="flex flex-col justify-between border-border/60 py-12 lg:border-r lg:pr-16">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="relative inline-flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Access · port 443
          </div>

          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ 00 — {showSignUp ? 'new account' : 'sign in'}
            </p>
            <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
              {showSignUp ? (
                <>
                  First <span className="italic text-primary">resolve</span>. <br />
                  Then route.
                </>
              ) : (
                <>
                  Welcome <br />
                  <span className="italic text-primary">back.</span>
                </>
              )}
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              {showSignUp
                ? 'Create an account to store your presets and Cloudflare credentials. Everything is scoped to your user.'
                : 'Sign in to pick up where you left off. Your zones, presets, and saved IPs are waiting.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <div>
              <div className="text-foreground/80">v2.0</div>
              <div>build 42.apr</div>
            </div>
            <div>
              <div className="text-foreground/80">SOC 2</div>
              <div>via cloudflare</div>
            </div>
            <div>
              <div className="text-foreground/80">api</div>
              <div>token only</div>
            </div>
          </div>
        </section>

        <section className="flex items-center py-12 lg:pl-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>§ Auth · {showSignUp ? 'create' : 'login'}</span>
              <span>01 / 01</span>
            </div>

            <form
              onSubmit={showSignUp ? handleSignUp : handleLogin}
              className="space-y-5"
            >
              <Field
                label="Email"
                id="email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(v) => setEmail(v)}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Password
                  </Label>
                  {!showSignUp && (
                    <button
                      type="button"
                      onClick={handleForgot}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-none border-0 border-b border-border/80 bg-transparent px-0 pr-10 font-mono text-[14px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" strokeWidth={1.5} />
                    ) : (
                      <EyeIcon className="size-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="border-l-2 border-destructive bg-destructive/5 px-3 py-2 font-mono text-[11px] text-destructive">
                  ! {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-full font-mono text-xs uppercase tracking-[0.18em]"
              >
                {showSignUp ? 'Create account' : 'Sign in'}
                <ArrowUpRight className="ml-2 size-4" strokeWidth={1.5} />
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                or
              </span>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="h-12 w-full rounded-full border-border/60 font-mono text-xs uppercase tracking-[0.18em]"
            >
              Continue with Google
            </Button>

            <div className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {!showSignUp ? (
                <button onClick={() => setShowSignUp(true)}>
                  No account? <span className="text-primary">Create one →</span>
                </button>
              ) : (
                <button onClick={() => setShowSignUp(false)}>
                  Have an account? <span className="text-primary">Sign in →</span>
                </button>
              )}
            </div>

            <p className="mt-10 text-center font-serif text-sm italic text-muted-foreground">
              &ldquo;The best interface is the one you can trust.&rdquo;
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="h-11 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[14px] shadow-none focus-visible:border-primary focus-visible:ring-0"
      />
    </div>
  );
}
