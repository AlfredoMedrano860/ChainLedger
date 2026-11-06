/**
 * @file Índice del sitio que aparece al final de la introducción.
 */
import { ArrowIcon } from '../../components/icons/Icons'
import { SECTIONS, pad2 } from '../../data/site'

/**
 * Tabla tipo manifiesto con las secciones 02 a 08: número, nombre, una línea de
 * descripción y una flecha. Cada fila es un enlace a su sección. Los datos salen de
 * `SECTIONS` en `data/site.ts`.
 */
export function SiteIndex() {
  const rows = SECTIONS.filter((s) => s.id !== 'introduction')

  return (
    <div className="contents">
      <h3 className="contents__title">On this site</h3>
      <ol className="contents__list">
        {rows.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="contents__row">
              <span className="contents__num">{pad2(SECTIONS.indexOf(s) + 1)}</span>
              <span className="contents__label">{s.label}</span>
              <span className="contents__summary">{s.summary}</span>
              <ArrowIcon className="contents__arrow" />
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
