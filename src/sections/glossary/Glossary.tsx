/**
 * @file Sección 06 · Glossary.
 *
 * Autor de las definiciones: José Alfredo Medrano Saravia. Las palabras están en
 * `data/glossary.ts`.
 */
import { useId, useMemo, useState } from 'react'
import { Section } from '../../components/Section/Section'
import { AUTHORS, SECTIONS, pad2 } from '../../data/site'
import { GLOSSARY } from '../../data/glossary'
import { GlossaryEntry } from './GlossaryEntry'
import './glossary.css'

const writer = AUTHORS[0]

/** Número de la sección Glossary según el orden de `SECTIONS` (para numerar las fichas). */
const SECTION_NUMBER = SECTIONS.findIndex((s) => s.id === 'glossary') + 1

/** Letras iniciales que tienen al menos una palabra, en orden (A, B, H, L…). */
const LETTERS = [...new Set(GLOSSARY.map((t) => t.term[0].toUpperCase()))]

/**
 * Quita tildes y pasa a minúsculas para comparar textos al buscar.
 *
 * @param text - Texto original.
 * @returns Texto normalizado.
 */
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Glosario en forma de fichero: una cuadrícula de fichas ({@link GlossaryEntry}).
 *
 * Arriba hay una barra con la introducción, el buscador y la franja "Jump to" con las
 * letras que tienen palabras. El buscador filtra por palabra o por definición y anuncia
 * cuántos resultados hay; mientras se busca, la franja de letras se desactiva porque
 * puede apuntar a fichas ocultas.
 *
 * Cada ficha tiene `id="term-{id}"`, así que los enlaces `<Term>` del texto llegan
 * directo a su definición.
 */
export function Glossary() {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const searching = query.trim() !== ''

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return GLOSSARY
    return GLOSSARY.filter((t) => normalize(t.term).includes(q) || normalize(t.definition).includes(q))
  }, [query])

  return (
    <Section id="glossary">
      <div className="gl-bar">
        <div className="gl-bar__intro">
          <p>Ten important words from this site, with a simple definition.</p>
          <span className="label">Writer · {writer.name}</span>
        </div>

        <div className="gl-bar__search">
          <label className="label" htmlFor={inputId}>
            Search a word
          </label>
          <div className="gl-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. hash"
              autoComplete="off"
            />
            {searching && (
              <button type="button" className="gl-search__clear" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="gl-letters" aria-label="Jump to a letter">
        <span className="label">Jump to</span>
        <ol>
          {LETTERS.map((letter) => {
            const first = GLOSSARY.find((t) => t.term[0].toUpperCase() === letter)!
            return (
              <li key={letter}>
                <a href={`#term-${first.id}`} aria-disabled={searching || undefined} tabIndex={searching ? -1 : undefined}>
                  {letter}
                </a>
              </li>
            )
          })}
        </ol>
        <span className="gl-letters__count label" role="status">
          {searching ? `${results.length} of ${GLOSSARY.length} words` : `${GLOSSARY.length} words`}
        </span>
      </nav>

      {results.length ? (
        <dl className="gl-grid">
          {results.map((t) => (
            <GlossaryEntry
              key={t.id}
              term={t}
              number={`${pad2(SECTION_NUMBER)}.${pad2(GLOSSARY.indexOf(t) + 1)}`}
              sections={t.appearsIn.map((id) => {
                const n = SECTIONS.findIndex((s) => s.id === id)
                return { id, label: `${pad2(n + 1)} ${SECTIONS[n].label}` }
              })}
            />
          ))}
        </dl>
      ) : (
        <div className="gl-empty">
          <p>No words match “{query}”.</p>
          <button type="button" className="btn btn--line" onClick={() => setQuery('')}>
            Show all words
          </button>
        </div>
      )}
    </Section>
  )
}
