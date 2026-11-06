/**
 * @file Código de barras generado a partir de un hash.
 */

/** Props de {@link Barcode}. */
interface BarcodeProps {
  /** Texto hexadecimal (normalmente un hash) que define las barras. */
  value: string
  /** Clase para darle tamaño y color (el color se controla con `fill` en CSS). */
  className?: string
}

/**
 * Dibuja un código de barras a partir de un texto hexadecimal.
 *
 * Cada carácter define el ancho de una barra (1 a 3) y del espacio que le sigue
 * (1 a 2). Por eso, si el hash cambia, el dibujo cambia: en el hero se ve cómo el
 * código del bloque alterado deja de ser el mismo. No es un código escaneable real.
 *
 * El SVG se estira al tamaño del contenedor (`preserveAspectRatio="none"`).
 *
 * @example
 * <Barcode value={block.hash} className="block__barcode" />
 */
export function Barcode({ value, className = '' }: BarcodeProps) {
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (const ch of value) {
    const n = parseInt(ch, 16)
    const width = 1 + (n % 3)
    const gap = 1 + ((n >> 2) % 2)
    bars.push({ x, w: width })
    x += width + gap
  }

  return (
    <svg className={`barcode ${className}`} viewBox={`0 0 ${x} 20`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height="20" />
      ))}
    </svg>
  )
}
