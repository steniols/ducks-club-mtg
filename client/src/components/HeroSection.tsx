import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary to-slate-900">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/ducks-club-hero-BEbmd3pRSiYwJeno4gx3m3.webp"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Diagonal cut effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-10 transform rotate-45 -translate-y-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            DUCKS CLUB
          </h1>
          <p className="text-xl md:text-2xl text-orange-200 mb-8 font-semibold">
            Torneios Mensais de Magic: The Gathering
          </p>
          <p className="text-lg text-gray-100 mb-12 max-w-2xl mx-auto">
            Bem-vindo ao maior (e mais divertido) grupo de Magic da região. Aqui celebramos os campeões e zoamos o pato com estilo.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-orange-600 text-white font-bold text-lg px-8"
              onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Ranking
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8"
              onClick={() => document.getElementById('duck')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🦆 Conhecer o Pato
            </Button>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{
        clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)'
      }}></div>
    </section>
  );
}
