/**
 * Som do pato do mês ("quack, quack"), compartilhado entre o pato do lago (RpgDuckFace)
 * e o botão de silenciar (RpgSoundToggle).
 */

/** Um único "quack" (entre 0,25 s e 0,55 s do arquivo; o resto é silêncio), tocado duas vezes. */
const QUACK_SRC = "/sounds/pato.mp3";
const QUACK_OFFSET = 0.25;
const QUACK_LENGTH = 0.3;
const MUTED_KEY = "ducks-club:quack-muted";

let audio: AudioContext | null = null;
let quackBuffer: AudioBuffer | null = null;
let muted = readMuted();
const listeners = new Set<() => void>();

function readMuted() {
  try {
    return localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

function notify() {
  listeners.forEach((fn) => fn());
}

/**
 * O navegador só libera áudio depois de uma interação do visitante,
 * então o contexto é criado (e o som carregado) no primeiro clique/toque/tecla.
 */
function unlock() {
  if (!audio) {
    const ctx = (audio = new AudioContext());
    ctx.addEventListener("statechange", notify);
    fetch(QUACK_SRC)
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        quackBuffer = buffer;
        notify();
      })
      .catch(() => {});
  }
  void audio.resume();
}

/** Passa a escutar a primeira interação do visitante; devolve a função de limpeza. */
export function listenForAudioUnlock() {
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
}

/** Toca "quack, quack" daqui a `delay` segundos, se o som estiver liberado e não silenciado. */
export function playQuack(delay: number) {
  if (muted || !quackBuffer || audio?.state !== "running" || document.hidden) return;
  const t = audio.currentTime + delay;
  for (const start of [t, t + QUACK_LENGTH]) {
    const source = audio.createBufferSource();
    source.buffer = quackBuffer;
    source.connect(audio.destination);
    source.start(start, QUACK_OFFSET, QUACK_LENGTH);
  }
}

export function setQuackMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTED_KEY, value ? "1" : "0");
  } catch {
    // sem armazenamento: vale só nesta visita
  }
  notify();
}

export interface DuckSoundState {
  ready: boolean;
  muted: boolean;
}

let snapshot: DuckSoundState = { ready: false, muted };

/** Para useSyncExternalStore: `ready` indica que o som já foi liberado e carregado. */
export function subscribeDuckSound(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getDuckSoundState() {
  const ready = audio?.state === "running" && quackBuffer !== null;
  if (ready !== snapshot.ready || muted !== snapshot.muted) snapshot = { ready, muted };
  return snapshot;
}
