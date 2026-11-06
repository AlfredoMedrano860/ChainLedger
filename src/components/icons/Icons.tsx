/**
 * @file Íconos del sitio. Las flechas y la equis son animados (librería
 * `@animateicons/react`, set Lucide); el de accesibilidad es un SVG propio, fijo.
 *
 * Todos son decorativos (`aria-hidden`): el texto o el `aria-label` del botón que los
 * contiene es lo que se anuncia. Toman el color del texto (`currentColor`) y su tamaño
 * se define en el CSS del botón o con la clase que se les pasa.
 */
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  XIcon,
} from '@animateicons/react/lucide'
import { useEffect, useRef, type ComponentType, type RefAttributes } from 'react'
import { useAnimatedIcons } from './useAnimatedIcons'
import './icons.css'

/** Control que la librería expone para animar un ícono desde fuera. */
interface IconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

/** Forma mínima de un ícono de la librería. */
type LibraryIcon = ComponentType<{ size?: number; isAnimated?: boolean; 'aria-hidden'?: boolean } & RefAttributes<IconHandle>>

/**
 * Muestra un ícono de la librería y lo anima cuando el mouse pasa por el botón o
 * enlace que lo contiene (o cuando recibe el foco con el teclado), no solo cuando pasa
 * por el ícono. No se anima si la persona pidió reducir el movimiento (en el sistema o
 * con "Stop animations" del panel de accesibilidad).
 */
function AnimatedIcon({ icon: Icon, className = '' }: { icon: LibraryIcon; className?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<IconHandle>(null)
  const animated = useAnimatedIcons()

  useEffect(() => {
    const host = boxRef.current?.closest('a, button')
    if (!host || !animated) return
    const start = () => iconRef.current?.startAnimation()
    const stop = () => iconRef.current?.stopAnimation()
    host.addEventListener('mouseenter', start)
    host.addEventListener('focus', start)
    host.addEventListener('mouseleave', stop)
    host.addEventListener('blur', stop)
    return () => {
      host.removeEventListener('mouseenter', start)
      host.removeEventListener('focus', start)
      host.removeEventListener('mouseleave', stop)
      host.removeEventListener('blur', stop)
    }
  }, [animated])

  return (
    <span ref={boxRef} className={`icon ${className}`.trim()} aria-hidden="true">
      <Icon ref={iconRef} size={24} isAnimated={animated} aria-hidden />
    </span>
  )
}

/** Dirección de {@link ArrowIcon}. */
type ArrowDirection = 'right' | 'down' | 'up' | 'up-right'

/** Ícono de la librería para cada dirección. */
const ARROWS: Record<ArrowDirection, LibraryIcon> = {
  right: ArrowRightIcon,
  down: ArrowDownIcon,
  up: ArrowUpIcon,
  'up-right': ArrowUpRightIcon,
}

/**
 * Flecha animada.
 *
 * @param props.direction - Hacia dónde apunta. Por defecto `right`.
 * @param props.className - Clase opcional (por ejemplo, para darle tamaño).
 */
export function ArrowIcon({ direction = 'right', className }: { direction?: ArrowDirection; className?: string }) {
  return <AnimatedIcon icon={ARROWS[direction]} className={className} />
}

/** Equis para cerrar paneles. */
export function CloseIcon({ className }: { className?: string }) {
  return <AnimatedIcon icon={XIcon} className={className} />
}

/** Símbolo internacional de accesibilidad: persona con los brazos abiertos (no animado). */
export function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="4.4" r="2.2" fill="currentColor" />
      <path
        d="M4.5 8.6 12 10l7.5-1.4M12 10v4.8m0 0-3.4 6M12 14.8l3.4 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
