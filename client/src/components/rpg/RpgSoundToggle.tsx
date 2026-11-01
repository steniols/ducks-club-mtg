import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getDuckSoundState, setQuackMuted, subscribeDuckSound } from "./duckSound";

/** Botão de ligar/desligar o "quack" do pato; só aparece depois que o navegador libera o som. */
export default function RpgSoundToggle() {
  const { ready, muted } = useSyncExternalStore(subscribeDuckSound, getDuckSoundState);
  if (!ready) return null;

  const Icon = muted ? VolumeX : Volume2;
  const label = muted ? "Ativar som do pato" : "Desativar som do pato";
  return (
    <button
      type="button"
      onClick={() => setQuackMuted(!muted)}
      className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center border-2 border-[var(--rp-ink)] bg-[var(--rp-parch)] text-[var(--rp-ink)] shadow-[2px_2px_0_rgba(61,36,20,0.5)] hover:brightness-95"
      aria-label={label}
      aria-pressed={muted}
      title={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
