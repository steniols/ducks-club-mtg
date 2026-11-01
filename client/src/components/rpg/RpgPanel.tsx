import type { ReactNode } from "react";

interface RpgPanelProps {
  id?: string;
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Pergaminho com placa de madeira no topo — moldura padrão do layout RPG. */
export default function RpgPanel({ id, title, action, className = "", children }: RpgPanelProps) {
  return (
    <section id={id} className={`rp-parch @container scroll-mt-24 px-4 pb-5 pt-0 sm:px-6 ${className}`}>
      <header className="-mt-4 mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="rp-plate text-base sm:text-lg">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
