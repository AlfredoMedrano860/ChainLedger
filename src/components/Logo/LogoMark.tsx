/**
 * @file Símbolo de ChainLedger.
 */

/** Props de {@link LogoMark}. */
interface LogoMarkProps {
  /** Clase para darle tamaño desde el CSS de quien lo usa. */
  className?: string
}

/**
 * Dibuja el símbolo de la marca: dos cuadros encadenados, como el sello de una caja
 * de envío. El segundo va en rojo de señal. El contorno toma el color del texto
 * (`currentColor`), así que funciona sobre fondo claro y sobre el footer grafito.
 *
 * Es decorativo (`aria-hidden`): el nombre accesible lo pone el enlace que lo contiene.
 *
 * @example
 * <LogoMark className="brand__mark" />
 */
export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="13" y="13" width="17" height="17" fill="var(--signal)" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  )
}
