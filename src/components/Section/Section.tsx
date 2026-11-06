/**
 * @file Envoltorio común de las secciones de contenido.
 */
import type { ReactNode } from 'react'
import { SECTIONS, type SectionId } from '../../data/site'
import { SectionHeader } from '../SectionHeader/SectionHeader'

/** Props de {@link Section}. */
interface SectionProps {
  /** Identificador de la sección en `SECTIONS` (también es el ancla HTML). */
  id: SectionId
  /** Título grande. Si no se pasa, se usa el nombre de la sección. */
  title?: string
  /** Contenido de la sección, debajo del encabezado. */
  children: ReactNode
}

/**
 * Arma una sección con la estructura que comparten todas: `<section class="sec">`,
 * el `.container` y el {@link SectionHeader}.
 *
 * El número y el nombre corto salen de `SECTIONS` (`data/site.ts`), así que si se
 * cambia el orden de las secciones, los números se actualizan solos. El `<h2>` recibe
 * el id `{id}-title` y la sección lo usa en `aria-labelledby`.
 *
 * @example
 * <Section id="concept" title="What Is a Blockchain?">
 *   <p>…</p>
 * </Section>
 */
export function Section({ id, title, children }: SectionProps) {
  const index = SECTIONS.findIndex((s) => s.id === id)
  const { label } = SECTIONS[index]
  const titleId = `${id}-title`

  return (
    <section id={id} className="sec" aria-labelledby={titleId}>
      <div className="container">
        <SectionHeader number={index + 1} label={label} title={title ?? label} titleId={titleId} />
        {children}
      </div>
    </section>
  )
}
