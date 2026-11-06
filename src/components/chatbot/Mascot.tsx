/**
 * @file Blocky, la mascota del chatbot: un bloque cuadrado con ojos.
 */
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/a11y'

/** Expresiones de Blocky. */
export type MascotMood = 'idle' | 'thinking' | 'happy' | 'confused'

/** Boca para cada expresión (trazo SVG en un cuadro de 64×64). */
const MOUTHS: Record<MascotMood, string> = {
  idle: 'M27 46h10',
  thinking: 'M28 47h4',
  happy: 'M25 44q7 7 14 0',
  confused: 'M25 47l4-2 3 2 4-2 3 2',
}

/** Props de {@link Mascot}. */
interface MascotProps {
  /** Expresión actual. Por defecto `idle`. */
  mood?: MascotMood
  /** Clase para darle tamaño. */
  className?: string
}

/**
 * Dibuja a Blocky: un cuadrado rojo con sombra dura y ojos cuadrados.
 *
 * - Las pupilas siguen al puntero (mouse o dedo) por toda la página.
 * - Parpadea solo cada pocos segundos (animación CSS).
 * - Con `mood="thinking"` mira hacia arriba; `happy` sonríe y `confused` arruga la boca.
 *
 * Si la persona pidió reducir animaciones, los ojos se quedan quietos y no parpadea.
 * Es decorativo: el botón o panel que lo contiene pone el nombre accesible.
 */
export function Mascot({ mood = 'idle', className = '' }: MascotProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const pupils = svg.querySelectorAll('.mascot__pupil')
    let frame = 0
    // Centro de Blocky en pantalla. Se mide una sola vez y se vuelve a medir solo si la
    // ventana cambia de tamaño o se hace scroll: medir en cada movimiento obligaba al
    // navegador a recalcular el layout de la página.
    let center: { x: number; y: number } | null = null
    let last = ''
    const resetCenter = () => {
      center = null
    }
    const onMove = (e: PointerEvent) => {
      if (prefersReducedMotion()) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!center) {
          const r = svg.getBoundingClientRect()
          center = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        }
        const dx = e.clientX - center.x
        const dy = e.clientY - center.y
        const len = Math.hypot(dx, dy) || 1
        const reach = Math.min(1, len / 240)
        // Se redondea a medio píxel y solo se escribe si cambió: así un movimiento
        // pequeño del mouse no vuelve a calcular los estilos del dibujo.
        const x = Math.round((dx / len) * 3 * reach * 2) / 2
        const y = Math.round((dy / len) * 3 * reach * 2) / 2
        const next = `${x},${y}`
        if (next === last) return
        last = next
        // Se mueve con el atributo transform de cada pupila: no pasa por CSS, así que
        // no obliga a recalcular estilos. La expresión thinking (CSS) tiene prioridad.
        for (const pupil of pupils) pupil.setAttribute('transform', `translate(${x} ${y})`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resetCenter, { passive: true })
    window.addEventListener('scroll', resetCenter, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resetCenter)
      window.removeEventListener('scroll', resetCenter)
    }
  }, [])

  return (
    <svg ref={svgRef} className={`mascot mascot--${mood} ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="12" width="50" height="48" fill="var(--ink)" />
      <rect x="5" y="7" width="50" height="48" fill="var(--signal)" stroke="var(--ink)" strokeWidth="3.5" />
      <path d="M12 14h8" stroke="var(--paper)" strokeWidth="3" strokeLinecap="square" opacity=".7" />

      <g className="mascot__eyes">
        <g className="mascot__eye">
          <rect x="15" y="21" width="12" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
          <rect className="mascot__pupil" x="19" y="25" width="5" height="7" fill="var(--ink)" />
        </g>
        <g className="mascot__eye">
          <rect x="33" y="21" width="12" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
          <rect className="mascot__pupil" x="37" y="25" width="5" height="7" fill="var(--ink)" />
        </g>
      </g>

      <path className="mascot__mouth" d={MOUTHS[mood]} fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}
