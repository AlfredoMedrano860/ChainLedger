/**
 * @file Código de barras generado a partir de un hash o al azar.
 */

import { useState, type CSSProperties } from 'react'

/** Props de {@link Barcode}. */
interface BarcodeProps {
  /**
   * Texto hexadecimal (normalmente un hash) que define las barras. Si se pasa, el
   * dibujo depende solo de este valor: el mismo hash da siempre el mismo código.
   */
  value?: string
  /**
   * Semilla para generar barras al azar cuando no hay `value`. Con la misma semilla
   * sale siempre el mismo código (no cambia al volver a renderizar ni al recargar).
   * Si tampoco se pasa, se elige una semilla al azar una sola vez al montar.
   */
  seed?: string
  /** Cantidad de barras cuando se generan al azar. Por defecto 16. */
  bars?: number
  /** Clase para darle tamaño y color (el color se controla con `fill` en CSS). */
  className?: string
  /** Color de las barras, para usarlo dentro de una ilustración. */
  fill?: string
  /**
   * Posición y tamaño dentro de otro SVG (en unidades de su `viewBox`). Con ellos el
   * código se puede colocar dentro de una ilustración, por ejemplo en una etiqueta.
   */
  x?: number
  y?: number
  width?: number
  height?: number
}

/** Dígitos hexadecimales que se usan para generar barras al azar. */
const HEX = '0123456789abcdef'

/**
 * Convierte una semilla en una lista de dígitos hexadecimales pseudoaleatorios
 * (generador mulberry32). Siempre devuelve lo mismo para la misma semilla.
 */
function randomHex(seed: string, length: number) {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  let out = ''
  for (let i = 0; i < length; i++) {
    h = (h + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    out += HEX[((t ^ (t >>> 14)) >>> 0) % 16]
  }
  return out
}

/**
 * Dibuja un código de barras (decorativo, no es escaneable).
 *
 * Cada dígito hexadecimal define el ancho de una barra (1 a 3) y del espacio que le
 * sigue (1 a 2). Los dígitos salen de `value` (un hash) o, si no hay, se generan al
 * azar a partir de `seed`. Así ningún código se dibuja barra por barra a mano:
 *
 * - En el hero, el código depende del hash del bloque: si alguien altera un registro,
 *   el hash cambia y el código también.
 * - En las ilustraciones se usa `seed`, y `x`/`y`/`width`/`height` para colocarlo
 *   dentro del dibujo.
 *
 * El SVG se estira al tamaño disponible (`preserveAspectRatio="none"`), pero la
 * variable CSS `--bar-units` (ancho total en unidades) permite limitar cuánto se ensancha
 * cada barra para que no se vean bloques gruesos en contenedores anchos.
 *
 * @example
 * <Barcode value={block.hash} className="block__barcode" />
 * <Barcode seed="CL-204" bars={14} x={16} y={32} width={38} height={18} fill="var(--ink)" />
 */
export function Barcode({ value, seed, bars = 16, className = '', fill, x, y, width, height }: BarcodeProps) {
  const [randomSeed] = useState(() => Math.random().toString(36).slice(2))
  const digits = value ?? randomHex(seed ?? randomSeed, bars)

  const rects: { x: number; w: number }[] = []
  let total = 0
  for (const ch of digits) {
    const n = parseInt(ch, 16)
    const w = 1 + (n % 3)
    rects.push({ x: total, w })
    total += w + 1 + ((n >> 2) % 2)
  }

  return (
    <svg
      className={`barcode ${className}`}
      viewBox={`0 0 ${total} 20`}
      preserveAspectRatio="none"
      style={{ '--bar-units': total } as CSSProperties}
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
      aria-hidden="true"
    >
      {rects.map((r) => (
        <rect key={r.x} x={r.x} y="0" width={r.w} height="20" />
      ))}
    </svg>
  )
}
