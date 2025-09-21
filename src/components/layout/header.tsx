'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PenSquare, LogOut, User, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', label: 'Chi Siamo' },
  { href: '/eventi', label: 'Eventi' },
  { href: '/community', label: 'Community' },
  { href: '/#news', label: 'News' },
];

export function Header() {
  const { user, isModerator, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const navContent = (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} onClick={handleLinkClick} className="text-sm font-medium transition-colors hover:text-white/80">
          {link.label}
        </Link>
      ))}
      {isModerator && (
         <Link href="/admin" onClick={handleLinkClick} className="text-sm font-medium transition-colors hover:text-white/80 flex items-center">
           <Shield className="mr-2 h-4 w-4" /> Admin
         </Link>
      )}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 transition-all duration-300 text-white',
        isScrolled ? 'bg-black/50 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-300"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span className="hidden sm:inline">Cantiere Culturale</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navContent}
        <Button asChild variant="outline" size="sm" className="bg-transparent border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black ml-4">
          <Link href="/style-guide">
            <PenSquare className="mr-2 h-4 w-4" />
            Style Guide AI
          </Link>
        </Button>
        {user ? (
          <>
            <Button asChild variant="ghost" size="sm" className="hover:bg-white/10">
              <Link href="/profile"><User className="mr-2 h-4 w-4" />Profilo</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-white/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm" className="hover:bg-white/10">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-400 hover:bg-blue-500 text-white">
              <Link href="/signup">Registrati</Link>
            </Button>
          </>
        )}
      </nav>
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/80 backdrop-blur-lg text-white border-l-white/20">
            <nav className="flex flex-col gap-6 mt-8 p-4">
              {navContent}
              <Button asChild variant="default" className="bg-blue-400 text-white mt-4">
                <Link href="/style-guide" onClick={handleLinkClick}>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Style Guide AI
                </Link>
              </Button>
               <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-4">
                {user ? (
                    <>
                      <Button asChild variant="ghost" size="sm" className="justify-start hover:bg-white/10">
                        <Link href="/profile" onClick={handleLinkClick}><User className="mr-2 h-4 w-4"/>Profilo</Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { logout(); handleLinkClick(); }} className="justify-start text-red-400 hover:text-red-300 hover:bg-white/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" size="sm" className="justify-start hover:bg-white/10">
                         <Link href="/login" onClick={handleLinkClick}>Login</Link>
                      </Button>
                      <Button asChild size="sm" className="bg-blue-400 text-white">
                        <Link href="/signup" onClick={handleLinkClick}>Registrati</Link>
                      </Button>
                    </>
                  )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
