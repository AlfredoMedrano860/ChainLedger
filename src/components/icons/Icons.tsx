/**
 * @file Íconos SVG del sitio.
 *
 * Todos son decorativos (`aria-hidden`): el texto o el `aria-label` del botón que los
 * contiene es lo que se anuncia. Toman el color del texto (`currentColor`) y su tamaño
 * se define en el CSS del botón.
 */

/** Dirección de {@link ArrowIcon}. */
type ArrowDirection = 'right' | 'down' | 'up'

/** Trazo de la flecha para cada dirección. */
const ARROW_PATHS: Record<ArrowDirection, string> = {
  right: 'M4 12h16m-7-7 7 7-7 7',
  down: 'M12 4v16m-7-7 7 7 7-7',
  up: 'M12 20V4m-7 7 7-7 7 7',
}

/**
 * Flecha de trazo recto, con puntas cuadradas como el resto del sistema.
 *
 * @param props.direction - Hacia dónde apunta. Por defecto `right`.
 * @param props.className - Clase opcional.
 */
export function ArrowIcon({ direction = 'right', className }: { direction?: ArrowDirection; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
      <path d={ARROW_PATHS[direction]} />
    </svg>
  )
}

/** Equis para cerrar paneles. */
export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  )
}

/** Símbolo internacional de accesibilidad: persona con los brazos abiertos. */
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
