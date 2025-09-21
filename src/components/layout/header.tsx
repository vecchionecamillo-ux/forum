'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PenSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#marketplace', label: 'Marketplace' },
  { href: '#tessera', label: 'La Tessera' },
  { href: '#piattaforma', label: 'Piattaforma' },
  { href: '#news', label: 'News' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

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
        <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-sm font-medium transition-colors hover:text-foreground/80">
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-accent"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span className="hidden sm:inline">Cantiere Culturale</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-foreground/90">
        {navContent}
        <Button asChild variant="outline" size="sm" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground ml-4">
          <Link href="/style-guide">
            <PenSquare className="mr-2 h-4 w-4" />
            Style Guide AI
          </Link>
        </Button>
      </nav>
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col gap-6 mt-8 p-4">
              {navContent}
              <Button asChild variant="default" className="bg-accent text-accent-foreground mt-4">
                <Link href="/style-guide" onClick={handleLinkClick}>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Style Guide AI
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
