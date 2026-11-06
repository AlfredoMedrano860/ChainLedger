/**
 * @file Detecta qué sección se está leyendo para marcarla en el menú.
 */
import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '../../data/site'

/**
 * Observa las secciones de la página y devuelve la que ocupa la franja central de la
 * pantalla (entre el 35 % y el 45 % desde arriba). El header la usa para poner
 * `aria-current="location"` en el enlace correspondiente.
 *
 * Solo observa las secciones que ya existen en la página; las que todavía no se han
 * construido simplemente no se marcan.
 *
 * @returns El id de la sección activa, o `null` si no hay ninguna en esa franja.
 */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null)
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id as SectionId)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return active
}
