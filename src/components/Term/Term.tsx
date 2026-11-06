/**
 * @file Enlace de una palabra del texto a su definición en el glosario.
 */
import type { ReactNode } from 'react'
import './term.css'

/** Props de {@link Term}. */
interface TermProps {
  /**
   * Identificador de la palabra en el glosario. El enlace apunta a `#term-{id}`,
   * así que en la sección Glossary cada definición debe tener ese `id`
   * (por ejemplo `id="term-hash"`).
   */
  id: string
  /** Texto visible (la palabra tal como aparece en el párrafo). */
  children: ReactNode
}

/**
 * Marca una palabra del glosario dentro de un párrafo con subrayado naranja y la
 * enlaza a su definición.
 *
 * @example
 * <p>Each block has a <Term id="hash">hash</Term>.</p>
 */
export function Term({ id, children }: TermProps) {
  return (
    <a className="term" href={`#term-${id}`}>
      {children}
    </a>
  )
}
