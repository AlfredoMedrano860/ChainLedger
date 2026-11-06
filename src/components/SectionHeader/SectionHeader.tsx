/**
 * @file Encabezado estándar de las secciones de contenido.
 */
import { pad2 } from '../../data/site'
import './section-header.css'

/** Props de {@link SectionHeader}. */
interface SectionHeaderProps {
  /** Número de la sección (1 a 8). Se muestra grande y en contorno. */
  number: number
  /** Nombre corto de la sección para la etiqueta, por ejemplo `Introduction`. */
  label: string
  /** Título de la sección. */
  title: string
  /** `id` del `<h2>`; la `<section>` lo usa en `aria-labelledby`. */
  titleId: string
}

/**
 * Encabezado de una sección: número grande en contorno, etiqueta "Section 0X · Nombre"
 * y el título, sobre una regla gruesa. Todas las secciones deben usarlo para que se
 * vean iguales.
 *
 * Normalmente no se usa directo: {@link Section} lo agrega con el número y el nombre
 * que salen de `SECTIONS`.
 *
 * @example
 * <SectionHeader number={2} label="Concept" title="What Is a Blockchain?" titleId="concept-title" />
 */
export function SectionHeader({ number, label, title, titleId }: SectionHeaderProps) {
  return (
    <header className="sec-head">
      <span className="sec-head__num" aria-hidden="true">
        {pad2(number)}
      </span>
      <div className="sec-head__text">
        <span className="label">
          Section {pad2(number)} · {label}
        </span>
        <h2 id={titleId} className="sec-head__title">
          {title}
        </h2>
      </div>
    </header>
  )
}
