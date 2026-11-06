/**
 * @file Datos generales del sitio: secciones, proyecto y autores.
 *
 * Todo el texto que se repite en varias partes (menú, índice, footer) sale de aquí,
 * así que para cambiar un nombre o agregar una sección basta con editar este archivo.
 * El contenido visible del sitio está en inglés.
 */

/** Identificador de cada sección. También es el `id` HTML al que apuntan los enlaces (`#concept`). */
export type SectionId =
  | 'introduction'
  | 'concept'
  | 'development'
  | 'example'
  | 'benefits'
  | 'glossary'
  | 'faq'
  | 'contact'

/** Una sección del sitio. */
export interface Section {
  /** Identificador y ancla HTML. */
  id: SectionId
  /** Nombre que se muestra en el menú y en el índice. */
  label: string
  /** Descripción de una línea para el índice de la introducción. */
  summary: string
}

/** Las 8 secciones en el orden de la propuesta del proyecto. */
export const SECTIONS: Section[] = [
  { id: 'introduction', label: 'Introduction', summary: 'Why blockchain is more than cryptocurrencies.' },
  { id: 'concept', label: 'Concept', summary: 'Blocks, hashes, and nodes, and public vs. private blockchain.' },
  { id: 'development', label: 'Development', summary: 'How companies use it for auditing and inventory.' },
  { id: 'example', label: 'Example', summary: 'The Walmart and IBM Food Trust case, with an activity.' },
  { id: 'benefits', label: 'Benefits & Limitations', summary: 'The good and the bad points for a company.' },
  { id: 'glossary', label: 'Glossary', summary: 'Ten key words in simple language.' },
  { id: 'faq', label: 'FAQ', summary: 'Answers to common questions.' },
  { id: 'contact', label: 'Contact', summary: 'The authors, the course, and an email for questions.' },
]

/** Datos del proyecto y del curso. */
export const PROJECT = {
  name: 'ChainLedger',
  title: 'Private Blockchain for Corporate Auditing and Inventory',
  university: 'Universidad de Costa Rica',
  course: 'TM-6300 Grammar and Composition I',
  courseCode: 'TM-6300',
  professor: 'Dra. Sussan Zamora Cortés',
  delivery: 'Second Delivery: Project Draft and Digital Prototype',
  date: 'November 16th, 2026',
  year: 2026,
  /** Correo del grupo para preguntas y comentarios (sección Contact). */
  email: 'mc.alfredomedra@gmail.com',
}

/** Un autor del proyecto. */
export interface Author {
  /** Nombre completo. */
  name: string
  /** Carné universitario. */
  id: string
  /** Secciones que escribió. */
  wrote: string
  /** Perfil de LinkedIn (opcional). Si existe, el nombre se muestra como enlace en el footer. */
  linkedin?: string
}

/** Autores del proyecto, con su carné y las secciones que escribió cada uno. */
export const AUTHORS: Author[] = [
  {
    name: 'José Alfredo Medrano Saravia',
    id: 'C4H043',
    wrote: 'Introduction, Development, Glossary, and Contact',
    linkedin: 'https://www.linkedin.com/in/josealfredomedrano',
  },
  { name: 'Didier Aarón Mayorga Hernández', id: 'C4H018', wrote: 'Concept, Example, Benefits and Limitations, and FAQ' },
]

/**
 * Convierte un número en texto de dos dígitos (`1` → `01`).
 * Se usa para numerar secciones y bloques.
 *
 * @param n - Número a formatear.
 * @returns El número con al menos dos dígitos.
 */
export const pad2 = (n: number) => String(n).padStart(2, '0')
