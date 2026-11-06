/**
 * @file Ficha de una palabra del glosario.
 */
import type { GlossaryTerm } from '../../data/glossary'

/** Props de {@link GlossaryEntry}. */
interface GlossaryEntryProps {
  /** Palabra con su definición y categoría. */
  term: GlossaryTerm
  /** Número de ficha, por ejemplo `06.04`. */
  number: string
  /** Secciones donde aparece la palabra, ya con su texto visible (`02 Concept`). */
  sections: { id: string; label: string }[]
}

/**
 * Una ficha del fichero: número y categoría arriba, la palabra en grande, la definición
 * y los enlaces "Appears in". De fondo lleva la letra inicial en contorno, que se oculta
 * con la opción "Hide decorations" del panel de accesibilidad.
 *
 * Se renderiza como un `<div>` con `<dt>` y `<dd>` dentro, así que debe ir dentro de un `<dl>`.
 */
export function GlossaryEntry({ term, number, sections }: GlossaryEntryProps) {
  return (
    <div id={`term-${term.id}`} className="gl-card">
      <span className="gl-card__letter" aria-hidden="true">
        {term.term[0]}
      </span>
      <div className="gl-card__top">
        <span className="gl-card__num">{number}</span>
        <span className="gl-card__cat">{term.category}</span>
      </div>
      <dt className="gl-card__term">{term.term}</dt>
      <dd className="gl-card__body">
        <p className="gl-card__def">{term.definition}</p>
        <p className="gl-card__seen">
          <span className="label">Appears in</span>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </p>
      </dd>
    </div>
  )
}
