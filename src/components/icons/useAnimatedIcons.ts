/**
 * @file Hook para saber si los íconos pueden animarse.
 */
import { useEffect, useState } from 'react'

/** Clase que pone el panel de accesibilidad en `<html>` con "Stop animations". */
const STOP_CLASS = 'a11y-reduce-motion'

/** `true` si el sistema no pide reducir el movimiento y el panel no lo detuvo. */
const canAnimate = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.documentElement.classList.contains(STOP_CLASS)

/**
 * Devuelve si los íconos animados deben moverse. Se actualiza solo si la persona cambia
 * la preferencia del sistema o activa "Stop animations" en el panel de accesibilidad.
 */
export function useAnimatedIcons() {
  const [animated, setAnimated] = useState(canAnimate)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAnimated(canAnimate())
    const observer = new MutationObserver(update)
    media.addEventListener('change', update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      media.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [])

  return animated
}
