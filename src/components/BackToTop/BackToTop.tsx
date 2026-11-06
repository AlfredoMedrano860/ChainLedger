/**
 * @file Botón flotante para volver al inicio de la página.
 */
import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/a11y'
import { ArrowIcon } from '../icons/Icons'
import '../FloatingButton/floating-button.css'

/** A partir de cuántos píxeles de scroll aparece el botón. */
const SHOW_AFTER = 480

/**
 * Botón cuadrado que aparece arriba del botón de accesibilidad después de bajar
 * {@link SHOW_AFTER} píxeles, y lleva al inicio de la página.
 *
 * Si la persona pidió reducir animaciones (en el panel o en su sistema), el salto es
 * inmediato en lugar de suave. Mientras está oculto no se puede enfocar con el teclado.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setVisible(window.scrollY > SHOW_AFTER))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <button
      type="button"
      className={`fab fab--top ${visible ? 'is-visible' : ''}`}
      aria-label="Back to the top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })}
    >
      <ArrowIcon direction="up" />
    </button>
  )
}
