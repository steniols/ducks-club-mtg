import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: number;
  month: string;
  year: number;
  url: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    month: "Janeiro",
    year: 2026,
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/janeiro_8951d5d4.jpeg",
    description: "Torneio de Janeiro - O início de uma lenda!",
  },
  {
    id: 2,
    month: "Fevereiro",
    year: 2026,
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/fevereiro_39818cc8.jpg",
    description: "Torneio de Fevereiro - Momento épico do campeonato!",
  },
  {
    id: 3,
    month: "Março",
    year: 2026,
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029555026/KkG9CmMFx3FsZmCnqMBDyE/marco_b5d05b45.jpg",
    description: "Torneio de Março - Farinha reina supremo!",
  },
  {
    id: 4,
    month: "Abril",
    year: 2026,
    url: "/manus-storage/3_386f3605.jpg",
    description: "Torneio de Abril - O grupo todo reunido!",
  },
];

export default function GallerySection() {
  // Design: Galeria criativa com lightbox interativo
  // Permite visualizar fotos em grid responsivo com modal de ampliação
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            📸 GALERIA DE MOMENTOS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reviva os melhores momentos dos torneios do DUCKS CLUB. Clique em qualquer foto para ampliar!
          </p>
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            >
              <img
                src={image.url}
                alt={image.description}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white font-bold text-lg">{image.month} {image.year}</p>
                <p className="text-yellow-300 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-10 right-0 text-white hover:text-yellow-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Imagem */}
              <img
                src={galleryImages[selectedIndex].url}
                alt={galleryImages[selectedIndex].description}
                className="w-full rounded-lg shadow-2xl"
              />

              {/* Informações */}
              <div className="text-center mt-6">
                <p className="text-white text-xl font-bold">
                  {galleryImages[selectedIndex].month} {galleryImages[selectedIndex].year}
                </p>
                <p className="text-yellow-300 text-lg mt-2">
                  {galleryImages[selectedIndex].description}
                </p>
              </div>

              {/* Navegação */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handlePrev}
                  className="bg-primary hover:bg-primary/80 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-white flex items-center px-4">
                  {selectedIndex + 1} / {galleryImages.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/80 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
