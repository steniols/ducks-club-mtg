import { useState } from "react";
import { galleryImages } from "@/components/GallerySection";
import RpgPanel from "./RpgPanel";
import RpgLightbox from "./RpgLightbox";

export default function RpgGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = [...galleryImages].reverse();
  const items = images.map((image) => ({
    src: image.url,
    title: `${image.month} ${image.year}`,
    subtitle: image.description,
  }));

  return (
    <RpgPanel id="galeria" title="Galeria de Momentos">
      <p className="mb-4 text-[var(--rp-ink-soft)]">
        Reviva os melhores momentos dos torneios do DUCKS CLUB. Clique em qualquer foto para ampliar!
      </p>
      <ul className="grid grid-cols-2 gap-4 @lg:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5">
        {images.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full text-center"
              aria-label={`Ampliar foto de ${image.month} ${image.year}`}
            >
              <span className="rp-frame rp-photo aspect-[4/3] bg-[#1d140b]">
                <img
                  src={image.url}
                  alt={image.description}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="mt-1.5 block text-sm font-bold">{image.month}</span>
            </button>
          </li>
        ))}
      </ul>
      <RpgLightbox items={items} index={openIndex} onChange={setOpenIndex} />
    </RpgPanel>
  );
}
