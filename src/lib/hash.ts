// Hash corto y determinista (FNV-1a de 32 bits, dos pasadas → 16 hex).
// No es criptográfico; solo sirve para mostrar que un cambio mínimo en el texto cambia todo el hash.
function fnv1a(text: string, seed: number): number {
  let h = seed >>> 0
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

export function shortHash(text: string): string {
  const a = fnv1a(text, 0x811c9dc5).toString(16).padStart(8, '0')
  const b = fnv1a(text, 0x01000193 ^ 0x5bd1e995).toString(16).padStart(8, '0')
  return a + b
}

export interface LedgerBlock {
  index: number
  record: string
  place: string
  time: string
}

export interface ChainedBlock extends LedgerBlock {
  prevHash: string
  hash: string
  /** El prevHash guardado ya no coincide con el hash real del bloque anterior. */
  broken: boolean
}

export const GENESIS_PREV = '0000000000000000'

/**
 * Encadena los bloques. `sealed` son los hashes que se guardaron al crear la cadena:
 * si alguien edita un registro, su hash nuevo deja de coincidir con el prevHash sellado del siguiente.
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
