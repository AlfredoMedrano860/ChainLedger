/**
 * @file Palabras del glosario (sección 06 · Glossary).
 *
 * Autor de las definiciones: José Alfredo Medrano Saravia (versión final del borrador
 * de la Parte 3). Están en orden alfabético.
 *
 * El `id` de cada palabra es el que usan los enlaces del texto: `<Term id="hash">`
 * apunta a `#term-hash`.
 */
import type { SectionId } from './site'

/** Una palabra del glosario. */
export interface GlossaryTerm {
  /** Identificador para enlazar la palabra (`#term-{id}`). */
  id: string
  /** Palabra tal como se muestra. */
  term: string
  /** Definición en lenguaje sencillo. */
  definition: string
  /** Área a la que pertenece la palabra; se muestra como etiqueta en la ficha. */
  category: string
  /** Secciones del sitio donde aparece la palabra; se muestran como enlaces. */
  appearsIn: SectionId[]
}

/** Las 10 palabras del glosario. */
export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'auditing',
    term: 'Auditing',
    definition: "The review of a company's records to check that they are correct and honest.",
    category: 'Business',
    appearsIn: ['introduction', 'concept', 'example'],
  },
  {
    id: 'block',
    term: 'Block',
    definition: 'A group of records saved together in a blockchain.',
    category: 'Core tech',
    appearsIn: ['concept'],
  },
  {
    id: 'blockchain',
    term: 'Blockchain',
    definition: 'A digital ledger where blocks are connected in order, one after the other.',
    category: 'Core tech',
    appearsIn: ['introduction', 'concept', 'development', 'example'],
  },
  {
    id: 'hash',
    term: 'Hash',
    definition: 'A short code that works like a fingerprint of a block. If the block changes, the hash changes.',
    category: 'Security',
    appearsIn: ['concept'],
  },
  {
    id: 'ledger',
    term: 'Ledger',
    definition: 'A book or file where a company writes its records.',
    category: 'Accounting',
    appearsIn: ['concept'],
  },
  {
    id: 'node',
    term: 'Node',
    definition: 'A computer that keeps a copy of the blockchain.',
    category: 'Infrastructure',
    appearsIn: ['concept', 'development'],
  },
  {
    id: 'permission',
    term: 'Permission',
    definition: 'The right to read or add information in a private blockchain.',
    category: 'Security',
    appearsIn: ['concept', 'example'],
  },
  {
    id: 'private-blockchain',
    term: 'Private blockchain',
    definition: 'A blockchain where one organization decides who can participate.',
    category: 'System type',
    appearsIn: ['introduction', 'concept', 'example'],
  },
  {
    id: 'public-blockchain',
    term: 'Public blockchain',
    definition: 'A blockchain where anyone can read and participate, like Bitcoin.',
    category: 'System type',
    appearsIn: ['concept'],
  },
  {
    id: 'traceability',
    term: 'Traceability',
    definition: 'The ability to follow the history of a product from its origin to its present location.',
    category: 'Supply chain',
    appearsIn: ['example'],
  },
]
