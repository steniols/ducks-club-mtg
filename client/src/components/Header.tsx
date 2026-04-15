import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b-4 border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/pasted_file_IRaJoH_image_98eaa1f9.png" 
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
          <Link href="/#ranking" className="text-foreground hover:text-primary font-medium transition-colors">
            Ranking
          </Link>
          <Link href="/#metagame" className="text-foreground hover:text-primary font-medium transition-colors">
            Metagame
          </Link>
          <Link href="/#duck" className="text-destructive hover:text-red-700 font-bold transition-colors">
            🦆 O PATO
          </Link>
        </nav>
      </div>
    </header>
  );
}
