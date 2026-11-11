/**
 * @file Actividad interactiva de Example: encontrar el registro alterado en un lote.
 */
import { useMemo, useState } from 'react'
import { buildChain, type LedgerBlock } from '../../lib/hash'
import { pad2 } from '../../data/site'

/** El viaje de una caja de mangos, de la finca a la tienda. */
const TRIP: LedgerBlock[] = [
  { index: 1, record: '400 kg of mangoes picked', place: 'Farm 18', time: '06:10' },
  { index: 2, record: '400 kg washed and packed', place: 'Packing house', time: '10:45' },
  { index: 3, record: 'Truck kept at 10 °C', place: 'Truck 31', time: '14:20' },
  { index: 4, record: '400 kg received', place: 'Distribution center', time: '22:05' },
  { index: 5, record: '80 boxes on shelf', place: 'Store 205', time: '07:30' },
]

/** Cambios que alguien podría hacer en secreto a cada uno de los primeros cuatro bloques. */
const CHANGES = ['380 kg of mangoes picked', '400 kg packed, not washed', 'Truck kept at 18 °C', '350 kg received']

/** Los hashes originales: la cadena se "sella" cuando se crea. */
const SEALED = buildChain(TRIP).map((b) => b.hash)

/** Elige al azar uno de los cuatro primeros bloques, distinto del anterior. */
const pick = (previous?: number) => {
  let next: number
  do next = Math.floor(Math.random() * CHANGES.length)
  while (next === previous)
  return next
}

/** Corta un hash para que quepa en la fila: `69e8…62b7`. */
const short = (hash: string) => `${hash.slice(0, 4)}…${hash.slice(-4)}`

/**
 * Actividad "Find the changed record": se muestra el viaje de un lote de mangos con un
 * registro cambiado en secreto. Cada fila tiene su hash y el hash del bloque anterior
 * que guardó al crearse. La persona elige el bloque que cree que cambiaron; al elegir,
 * se marca la conexión rota y se explica por qué.
 *
 * "Try another lot" cambia en secreto otro registro. El último bloque nunca se altera,
 * porque no tiene un bloque después que lo pueda delatar.
 */
export function TraceActivity() {
  const [changed, setChanged] = useState(() => pick())
  const [answer, setAnswer] = useState<number | null>(null)

  const chain = useMemo(() => {
    const blocks = TRIP.map((b, i) => (i === changed ? { ...b, record: CHANGES[i] } : b))
    return buildChain(blocks, SEALED)
  }, [changed])

  const solved = answer !== null
  const correct = answer === changed

  const restart = () => {
    setChanged((c) => pick(c))
    setAnswer(null)
  }

  return (
    <div className="activity">
      <div className="activity__head">
        <span className="label">Activity · Lot MG-2016</span>
        <h3 className="activity__title">Find the changed record</h3>
        <p className="activity__text">
          Somebody changed one record of this lot in secret. Compare the <strong>Hash</strong> of each block with the{' '}
          <strong>Prev</strong> that the next block saved. Where they are different, the chain is broken. Which record was
          changed?
        </p>
      </div>

      <ol className="trace">
        {chain.map((b, i) => {
          const isAnswer = answer === i
          const showBreak = solved && i === changed
          return (
            <li key={b.index} className={`trace__row${showBreak ? ' is-broken' : ''}${isAnswer ? ' is-answer' : ''}`}>
              <span className="trace__num">{pad2(b.index)}</span>
              <span className="trace__record">
                <span className="trace__what">{b.record}</span>
                <span className="trace__where">
                  {b.place} · {b.time}
                </span>
              </span>
              <span className="trace__hashes">
                <span>
                  <span className="label">Prev</span>{' '}
                  <span className={solved && b.broken ? 'is-mismatch' : undefined}>{short(b.prevHash)}</span>
                </span>
                <span>
                  <span className="label">Hash</span> <span className={showBreak ? 'is-mismatch' : undefined}>{short(b.hash)}</span>
                </span>
              </span>
              <button
                type="button"
                className="trace__pick"
                onClick={() => setAnswer(i)}
                disabled={solved}
                aria-pressed={isAnswer}
              >
                {isAnswer ? 'Your answer' : 'This one'}
              </button>
            </li>
          )
        })}
      </ol>

      <div className="activity__result" role="status">
        {solved && (
          <>
            <p className={`activity__verdict${correct ? ' is-right' : ''}`}>
              {correct ? 'Correct!' : `Not this time. The changed record was block ${pad2(changed + 1)}.`}
            </p>
            <p>
              Block {pad2(changed + 1)} now says “{CHANGES[changed]}”, so its hash is new. But block {pad2(changed + 2)} still keeps
              the old hash in its Prev field. They do not match, so any auditor can see the change.
            </p>
          </>
        )}
        <button type="button" className="btn btn--line" onClick={restart}>
          {solved ? 'Try another lot' : 'Change a different record'}
        </button>
      </div>
    </div>
  )
}
