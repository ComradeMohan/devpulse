'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Github, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useUser();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            DevPulse
          </span>
        </Link>
        
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Image
                      src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`}
                      alt={user.displayName || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.username}`}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">
                <Github className="mr-2 h-4 w-4" /> Sign In with GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
