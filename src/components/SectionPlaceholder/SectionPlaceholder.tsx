/**
 * @file Sección reservada que todavía no tiene contenido.
 */
import { SECTIONS, pad2, type SectionId } from '../../data/site'
import { Section } from '../Section/Section'
import './section-placeholder.css'

/** Props de {@link SectionPlaceholder}. */
interface SectionPlaceholderProps {
  /** Sección que se reserva. El número y el nombre salen de `SECTIONS`. */
  id: SectionId
  /** Persona que va a escribir la sección. */
  writer: string
}

/**
 * Deja una sección en su lugar, con su encabezado y un espacio vacío, para que el menú
 * y el índice ya puedan enlazarla mientras se escribe.
 *
 * Cuando la sección esté lista, se reemplaza este componente en `App.tsx` por el
 * componente real (por ejemplo `<Concept />`).
 *
 * @example
 * <SectionPlaceholder id="concept" writer="Didier Aarón Mayorga Hernández" />
 */
export function SectionPlaceholder({ id, writer }: SectionPlaceholderProps) {
  const index = SECTIONS.findIndex((s) => s.id === id)

  return (
    <Section id={id}>
      <div className="placeholder">
        <span className="label">
          Section {pad2(index + 1)} · Reserved
        </span>
        <p className="placeholder__writer">Writer: {writer}</p>
      </div>
    </Section>
  )
}
