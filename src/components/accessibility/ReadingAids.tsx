/**
 * @file Ayudas de lectura que se dibujan sobre la página: guía, máscara y filtros de color.
 */
import { useEffect, useRef } from 'react'
import { COLOR_BLIND_FILTERS } from './options'

/**
 * Sigue la altura del puntero (mouse o dedo) o del elemento que recibe el foco del
 * teclado, y la guarda en la variable CSS `--guide-y` de la capa. El CSS usa esa
 * variable para colocar la guía o la ventana de la máscara.
 *
 * @returns Ref que se debe poner en la capa (`<div ref={layer}>`).
 */
function useGuideY() {
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = layer.current
    if (!el) return
    const set = (y: number) => el.style.setProperty('--guide-y', `${y}px`)
    set(window.innerHeight / 2)
    const onMove = (e: PointerEvent) => set(e.clientY)
    const onFocus = (e: FocusEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('[data-a11y-ui]')) return
      const r = e.target.getBoundingClientRect()
      set(r.top + r.height / 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    window.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('focusin', onFocus)
    }
  }, [])

  return layer
}

/** Guía de lectura: una franja con línea roja bajo el renglón que se está leyendo. */
export function ReadingGuide() {
  const layer = useGuideY()
  return (
    <div ref={layer} className="reading-guide" aria-hidden="true" data-a11y-ui="">
      <span />
    </div>
  )
}

/** Máscara de lectura: oscurece la pantalla y deja visible una ventana de unos tres renglones. */
export function ReadingMask() {
  const layer = useGuideY()
  return (
    <div ref={layer} className="reading-mask" aria-hidden="true" data-a11y-ui="">
      <span className="reading-mask__top" />
      <span className="reading-mask__window" />
      <span className="reading-mask__bottom" />
    </div>
  )
}

/**
 * Define los filtros SVG de daltonismo (`#cl-protanopia`, `#cl-deuteranopia`,
 * `#cl-tritanopia`). Debe estar siempre en la página para que el CSS pueda usarlos.
 */
export function ColorBlindFilters() {
  return (
    <svg className="a11y-filters" aria-hidden="true" focusable="false">
      {Object.entries(COLOR_BLIND_FILTERS).map(([id, values]) => (
        <filter key={id} id={`cl-${id}`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={values} />
        </filter>
      ))}
    </svg>
  )
}
