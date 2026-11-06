/**
 * @file Manifiesto interactivo del hero: una cadena de tres bloques que se puede alterar.
 */
import { useMemo, useState } from 'react'
import { Barcode } from '../../components/Barcode/Barcode'
import { pad2 } from '../../data/site'
import { buildChain } from '../../lib/hash'
import { LEDGER_BLOCKS, TAMPERED_INDEX, TAMPERED_RECORD } from './ledgerData'
import './ledger-chain.css'

/**
 * Acorta un hash para mostrarlo: primeros 6 y últimos 4 caracteres.
 *
 * @param hash - Hash completo de 16 caracteres.
 * @returns Por ejemplo `69e806…62b7`.
 */
const shortenHash = (hash: string) => `${hash.slice(0, 6)}…${hash.slice(-4)}`

/**
 * Muestra el lote CL-204 como un manifiesto de tres bloques encadenados, cada uno
 * con su hash, el hash del bloque anterior y un código de barras generado del hash.
 *
 * El botón "Change block 02" cambia en secreto el registro del bloque 2 (120 → 95
 * cajas). Su hash cambia, pero el bloque 3 sigue guardando el hash original, así que
 * ya no coinciden: la cadena se marca como rota en el bloque 3. Es la idea central
 * de la introducción ("nobody can change it in secret") vista en acción.
 *
 * El estado del manifiesto se anuncia a lectores de pantalla con `role="status"`.
 */
export function LedgerChain() {
  const [tampered, setTampered] = useState(false)

  const sealed = useMemo(() => buildChain(LEDGER_BLOCKS).map((b) => b.hash), [])
  const chain = useMemo(() => {
    const blocks = tampered ? LEDGER_BLOCKS.map((b) => (b.index === TAMPERED_INDEX ? { ...b, record: TAMPERED_RECORD } : b)) : LEDGER_BLOCKS
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
          {brokenAt ? `Broken at block ${pad2(brokenAt)}` : 'Verified'}
        </span>
      </div>

      <ol className="manifest__rows">
        {chain.map((b) => {
          const edited = tampered && b.index === TAMPERED_INDEX
          return (
            <li key={b.index} className={`block ${edited ? 'is-edited' : ''} ${b.broken ? 'is-broken' : ''}`}>
              <span className="block__num">{pad2(b.index)}</span>
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
                    <dd className={b.broken ? 'is-bad' : ''}>{shortenHash(b.prevHash)}</dd>
                  </div>
                  <div>
                    <dt>Hash</dt>
                    <dd className={edited ? 'is-changed' : ''}>{shortenHash(b.hash)}</dd>
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
