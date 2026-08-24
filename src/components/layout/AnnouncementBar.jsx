import { announcements } from '../../data/site'

/** Barra de avisos: mensajes de confianza siempre visibles, sobre rojo granero. */
export function AnnouncementBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-[28px] gap-y-2 bg-barn px-5 py-[9px] text-center text-[12px] tracking-wide text-notice uppercase">
      {announcements.map((text, i) => (
        <span key={text} className="flex items-center gap-x-[28px]">
          {i > 0 && <span className="h-[12px] w-px bg-notice/40 max-sm:hidden" />}
          {text}
        </span>
      ))}
    </div>
  )
}
