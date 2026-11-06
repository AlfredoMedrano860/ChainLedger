/**
 * @file Hook para saber cuándo un elemento entra en pantalla por primera vez.
 */
import { useEffect, useRef, useState } from 'react'

/**
 * Observa un elemento y devuelve `true` desde la primera vez que aparece en pantalla
 * (al menos un 35 % visible). Las ilustraciones lo usan para animar su sello una sola
 * vez, cuando la persona llega a ellas.
 *
 * Si el navegador no tiene `IntersectionObserver`, devuelve `true` de inmediato.
 *
 * @returns `[ref, inView]`: la ref va en el elemento a observar.
 *
 * @example
 * const [ref, inView] = useInView<HTMLElement>()
 * return <figure ref={ref} className={inView ? 'is-in' : ''}>…</figure>
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return [ref, inView] as const
}
