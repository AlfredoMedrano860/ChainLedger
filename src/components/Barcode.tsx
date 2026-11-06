// Código de barras generado desde un hash (hex). Cada dígito define el ancho de una barra
// y del espacio siguiente, así que cualquier cambio en el hash cambia el dibujo.
export function Barcode({ value, className = '' }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (const ch of value) {
    const n = parseInt(ch, 16)
    const w = 1 + (n % 3) // barra de 1 a 3
    const gap = 1 + (n >> 2) % 2 // espacio de 1 a 2
    bars.push({ x, w })
    x += w + gap
  }

  return (
    <svg className={`barcode ${className}`} viewBox={`0 0 ${x} 20`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height="20" />
      ))}
    </svg>
  )
}
