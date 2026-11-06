import { useMemo, useState } from 'react'
import { buildChain, type LedgerBlock } from '../lib/hash'
import { Barcode } from './Barcode'

// Un lote de inventario en tres movimientos. Al "editar en secreto" el bloque 2,
// su hash cambia y deja de coincidir con el que el bloque 3 tiene guardado.
const ORIGINAL: LedgerBlock[] = [
  { index: 1, record: '120 boxes received', place: 'Central warehouse', time: '08:14' },
  { index: 2, record: '120 boxes loaded', place: 'Truck 07', time: '13:40' },
  { index: 3, record: '120 boxes on shelf', place: 'Store 12', time: '18:05' },
]

const TAMPERED_RECORD = '95 boxes loaded'

const short = (h: string) => `${h.slice(0, 6)}…${h.slice(-4)}`

export function LedgerChain() {
  const [tampered, setTampered] = useState(false)

  // Hashes sellados cuando se creó la cadena (versión original).
  const sealed = useMemo(() => buildChain(ORIGINAL).map((b) => b.hash), [])
  const chain = useMemo(() => {
    const blocks = tampered ? ORIGINAL.map((b) => (b.index === 2 ? { ...b, record: TAMPERED_RECORD } : b)) : ORIGINAL
    return buildChain(blocks, sealed)
  }, [tampered, sealed])

  const brokenAt = chain.find((b) => b.broken)?.index

  return (
    <figure className={`manifest ${brokenAt ? 'is-broken' : ''}`} aria-labelledby="manifest-caption">
      <div className="manifest__head">
        <div>
          <span className="label">Inventory ledger</span>
          <span className="manifest__lot">Lot CL-204</span>
        </div>
        <span className="manifest__status" role="status">
          {brokenAt ? `Broken at block ${String(brokenAt).padStart(2, '0')}` : 'Verified'}
        </span>
      </div>

      <ol className="manifest__rows">
        {chain.map((b) => {
          const edited = tampered && b.index === 2
          return (
            <li key={b.index} className={`block ${edited ? 'is-edited' : ''} ${b.broken ? 'is-broken' : ''}`}>
              <span className="block__num">{String(b.index).padStart(2, '0')}</span>
              <div className="block__body">
                <p className="block__record">
                  {edited ? (
                    <>
                      <del>120</del> <ins>95</ins> boxes loaded
                    </>
                  ) : (
                    b.record
                  )}
                </p>
                <p className="block__place">
                  {b.place} · {b.time}
                </p>
                <dl className="block__hashes">
                  <div>
                    <dt>Prev</dt>
                    <dd className={b.broken ? 'is-bad' : ''}>{short(b.prevHash)}</dd>
                  </div>
                  <div>
                    <dt>Hash</dt>
                    <dd className={edited ? 'is-changed' : ''}>{short(b.hash)}</dd>
                  </div>
                </dl>
              </div>
              <Barcode value={b.hash} className="block__barcode" />
            </li>
          )
        })}
      </ol>

      <figcaption id="manifest-caption" className="manifest__foot">
        <p>
          {tampered
            ? 'Someone changed block 02 in secret. Its hash changed, so block 03 no longer matches, and everybody can see it.'
            : 'Each block saves the hash of the block before it. Try to change a record in secret.'}
        </p>
        <button type="button" className="manifest__btn" onClick={() => setTampered((t) => !t)} aria-pressed={tampered}>
          {tampered ? 'Restore record' : 'Change block 02'}
        </button>
      </figcaption>
    </figure>
  )
}
