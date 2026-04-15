export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DUCKS CLUB</h3>
            <p className="text-gray-200 text-sm">
              O maior grupo de Magic: The Gathering da região. Torneios mensais, competição saudável e muito humor.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#ranking" className="hover:text-accent transition-colors">Ranking</a></li>
              <li><a href="#metagame" className="hover:text-accent transition-colors">Metagame</a></li>
              <li><a href="#duck" className="hover:text-accent transition-colors">O Pato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Torneios: Mensais</li>
              <li>Formato: Magic: The Gathering</li>
              <li>Desde: 2022</li>
              <li>Membros: Crescendo! 🦆</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-gray-200">
          <p>
            Feito com ❤️ para a comunidade DUCKS CLUB
          </p>
          <p className="mt-2">
            © 2026 DUCKS CLUB - MTG Tournaments. Todos os direitos reservados.
          </p>
          <p className="mt-4 text-xs text-gray-300">
            Magic: The Gathering é uma marca registrada da Wizards of the Coast.
          </p>
        </div>
      </div>
    </footer>
  );
}
