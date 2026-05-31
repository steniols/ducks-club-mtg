import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/ducks-logo.png" 
            alt="DUCKS CLUB Logo" 
            className="h-14 w-14"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">DUCKS CLUB</h1>
            <p className="text-xs text-muted-foreground">MTG Tournaments</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <button 
            onClick={() => scrollToSection('ranking')}
            className="text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0"
          >
            Ranking
          </button>
          <button 
            onClick={() => scrollToSection('metagame')}
            className="text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0"
          >
            Metagame
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0"
          >
            Galeria
          </button>
          <button 
            onClick={() => scrollToSection('duck')}
            className="text-destructive hover:text-red-700 font-bold transition-colors cursor-pointer bg-none border-none p-0"
          >
            O PATO
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-primary">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary font-medium transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <button 
              onClick={() => handleNavClick('ranking')}
              className="text-left text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0 py-2"
            >
              Ranking
            </button>
            <button 
              onClick={() => handleNavClick('metagame')}
              className="text-left text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0 py-2"
            >
              Metagame
            </button>
            <button 
              onClick={() => handleNavClick('gallery')}
              className="text-left text-foreground hover:text-primary font-medium transition-colors cursor-pointer bg-none border-none p-0 py-2"
            >
              Galeria
            </button>
            <button 
              onClick={() => handleNavClick('duck')}
              className="text-left text-destructive hover:text-red-700 font-bold transition-colors cursor-pointer bg-none border-none p-0 py-2"
            >
              O PATO
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
