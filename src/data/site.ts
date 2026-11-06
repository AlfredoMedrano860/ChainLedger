// Datos del proyecto: secciones del sitio, autores y curso. Todo el contenido visible está en inglés.

export type SectionId =
  | 'introduction'
  | 'concept'
  | 'development'
  | 'example'
  | 'benefits'
  | 'glossary'
  | 'faq'
  | 'contact'

export interface Section {
  id: SectionId
  label: string
  /** Una línea para el mapa del sitio en la introducción. */
  summary: string
}

// Orden de la propuesta del proyecto (8 secciones).
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

export const PROJECT = {
  name: 'ChainLedger',
  title: 'Private Blockchain for Corporate Auditing and Inventory',
  university: 'Universidad de Costa Rica',
  course: 'TM-6300 Grammar and Composition I',
  courseCode: 'TM-6300',
  professor: 'Dra. Sussan Zamora Cortés',
  delivery: 'Second Delivery: Project Draft and Digital Prototype',
  date: 'November 1st, 2026',
  year: 2026,
}

export const AUTHORS = [
  { name: 'José Alfredo Medrano Saravia', id: 'C4H043', wrote: 'Introduction, Development, Glossary, and Contact' },
  { name: 'Didier Aarón Mayorga Hernández', id: 'C4H018', wrote: 'Concept, Example, Benefits and Limitations, and FAQ' },
]
