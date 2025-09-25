'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User, Shield, Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/about', label: 'Chi Siamo' },
  { href: '/tessere', label: 'Tessere' },
  { href: '/eventi', label: 'Eventi & Community' },
  { href: '/formazione', label: 'lab039' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/collabora', label: 'Collabora' },
];

export function Header() {
  const { user, isModerator, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const navContent = (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} onClick={handleLinkClick} className="text-sm font-medium transition-colors text-foreground/70 hover:text-foreground">
          {link.label}
        </Link>
      ))}
      <Link href="/ai-assistant" onClick={handleLinkClick} className="text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center">
        <Bot className="mr-2 h-4 w-4" /> AI Assistant
      </Link>
      {isModerator && (
         <Link href="/admin" onClick={handleLinkClick} className="text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center">
           <Shield className="mr-2 h-4 w-4" /> Admin
         </Link>
      )}
    </>
  );

  const authButtonsDesktop = (
    <div className="hidden md:flex items-center gap-2">
      {user ? (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link href="/profile"><User className="mr-2 h-4 w-4" />Profilo</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Registrati</Link>
          </Button>
        </>
      )}
    </div>
  );

  const authButtonsMobile = (
     <div className="mt-4 pt-4 border-t flex flex-col gap-4">
        {user ? (
            <>
            <Button asChild variant="ghost" size="sm" className="justify-start">
                <Link href="/profile" onClick={handleLinkClick}><User className="mr-2 h-4 w-4"/>Profilo</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { logout(); handleLinkClick(); }} className="justify-start text-destructive hover:text-destructive/80">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
            </>
        ) : (
            <div className='flex flex-col gap-2'>
              <Button asChild size="sm" className="w-full">
                  <Link href="/login" onClick={handleLinkClick}>Login</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/signup" onClick={handleLinkClick}>Registrati</Link>
              </Button>
            </div>
        )}
    </div>
  )


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 transition-all duration-300',
         (isScrolled || !isHomePage) ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span className="hidden sm:inline">Cantiere Culturale</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navContent}
      </nav>
       <div className="flex items-center gap-2">
        {authButtonsDesktop}
        <ThemeToggle />
        <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
                <nav className="flex flex-col gap-6 mt-8 p-4">
                  {navContent}
                  {authButtonsMobile}
                </nav>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
