/**
 * @file Hash corto y encadenamiento de bloques para la demostración del hero.
 *
 * No es criptografía real: usa FNV-1a de 32 bits (dos pasadas) para producir un código
 * de 16 caracteres hexadecimales. Es suficiente para mostrar la idea clave del sitio:
 * si cambia una sola letra del registro, cambia todo el hash.
 */

/**
 * Calcula FNV-1a de 32 bits sobre un texto.
 *
 * @param text - Texto de entrada.
 * @param seed - Valor inicial; con semillas distintas se obtienen hashes distintos.
 * @returns Entero sin signo de 32 bits.
 */
function fnv1a(text: string, seed: number): number {
  let h = seed >>> 0
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

/**
 * Genera un hash corto y determinista (el mismo texto siempre da el mismo hash).
 *
 * @param text - Texto a resumir.
 * @returns 16 caracteres hexadecimales, por ejemplo `69e8061a3f0c62b7`.
 */
export function shortHash(text: string): string {
  const a = fnv1a(text, 0x811c9dc5).toString(16).padStart(8, '0')
  const b = fnv1a(text, 0x01000193 ^ 0x5bd1e995).toString(16).padStart(8, '0')
  return a + b
}

/** Un movimiento de inventario tal como lo escribe una persona. */
export interface LedgerBlock {
  /** Posición del bloque en la cadena, empezando en 1. */
  index: number
  /** Qué pasó, por ejemplo `120 boxes received`. */
  record: string
  /** Dónde pasó. */
  place: string
  /** Hora del movimiento, en formato `HH:MM`. */
  time: string
}

/** Un bloque ya encadenado: incluye su hash y el hash que guarda del bloque anterior. */
export interface ChainedBlock extends LedgerBlock {
  /** Hash del bloque anterior que este bloque tiene guardado. */
  prevHash: string
  /** Hash de este bloque (se calcula con sus datos y con prevHash). */
  hash: string
  /** `true` si prevHash ya no coincide con el hash real del bloque anterior. */
  broken: boolean
}

/** prevHash del primer bloque (el bloque génesis no tiene anterior). */
export const GENESIS_PREV = '0000000000000000'

/**
 * Encadena una lista de bloques calculando el hash de cada uno.
 *
 * Si se pasa `sealed`, cada bloque usa como prevHash el hash que se guardó cuando la
 * cadena se creó. Así, si alguien edita un registro después, su hash nuevo deja de
 * coincidir con el prevHash sellado del siguiente bloque y ese bloque queda `broken`.
 *
 * @param blocks - Bloques en orden.
 * @param sealed - Hashes originales de cada bloque (opcional).
 * @returns Los mismos bloques con prevHash, hash y broken.
 */
export function buildChain(blocks: LedgerBlock[], sealed?: string[]): ChainedBlock[] {
  const out: ChainedBlock[] = []
  blocks.forEach((b, i) => {
    const prevHash = i === 0 ? GENESIS_PREV : (sealed?.[i - 1] ?? out[i - 1].hash)
    const hash = shortHash(`${b.index}|${b.record}|${b.place}|${b.time}|${prevHash}`)
    const broken = i > 0 && prevHash !== out[i - 1].hash
    out.push({ ...b, prevHash, hash, broken })
  })
  return out
}
