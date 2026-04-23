import { Link } from "wouter";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b-4 border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/ducks-club-logo-transparent_24d53499.png" 
            alt="DUCKS CLUB Logo" 
            className="h-12 w-12"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">DUCKS CLUB</h1>
            <p className="text-xs text-muted-foreground">MTG Tournaments</p>
          </div>
        </Link>
        
        <nav className="flex gap-6 items-center">
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
      </div>
    </header>
  );
}
