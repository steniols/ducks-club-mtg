import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface RpgLightboxItem {
  src: string;
  title: string;
  subtitle?: string;
}

interface RpgLightboxProps {
  items: RpgLightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export default function RpgLightbox({ items, index, onChange }: RpgLightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") onChange((index + 1) % items.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, items.length, onChange]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#140c05]/90 p-4"
      onClick={() => onChange(null)}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="rp-parch flex max-h-full w-full max-w-3xl flex-col items-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex w-full items-center justify-between gap-3">
          <p className="rp-title truncate text-lg">{item.title}</p>
          <button type="button" onClick={() => onChange(null)} className="rp-btn !p-1.5" aria-label="Fechar">
            <X className="h-4 w-4" />
          </button>
        </div>
        <span className="rp-frame rp-photo w-fit max-w-full">
          <img src={item.src} alt={item.title} className="block max-h-[65vh] w-auto max-w-full object-contain" />
        </span>
        {item.subtitle && <p className="mt-3 text-center text-[var(--rp-ink-soft)]">{item.subtitle}</p>}
        {items.length > 1 && (
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              className="rp-btn !p-1.5"
              onClick={() => onChange((index - 1 + items.length) % items.length)}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-bold">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              className="rp-btn !p-1.5"
              onClick={() => onChange((index + 1) % items.length)}
              aria-label="Próxima"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
