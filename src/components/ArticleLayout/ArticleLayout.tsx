/**
 * @file Diseño de texto con columna de datos al lado.
 */
import type { ReactNode } from 'react'
import { Fields, type FieldItem } from '../Fields/Fields'
import './article-layout.css'

/** Props de {@link ArticleLayout}. */
interface ArticleLayoutProps {
  /** Datos de la sección (autor, tema…) para la columna izquierda. */
  meta: FieldItem[]
  /** Ilustración debajo de los datos. */
  illustration?: ReactNode
  /** Primer párrafo, más grande, que resume la sección. */
  lede: ReactNode
  /** Resto del texto (párrafos `<p>`). */
  children: ReactNode
}

/**
 * Dos columnas: a la izquierda los datos de la sección ({@link Fields}) y una
 * ilustración, fijos mientras se lee; a la derecha el texto, con el primer párrafo
 * destacado. Lo comparten Introduction y Development para que se vean iguales.
 *
 * @example
 * <ArticleLayout meta={[{ label: 'Writer', value: writer.name }]} illustration={<PrivateLedger />} lede={<>…</>}>
 *   <p>…</p>
 * </ArticleLayout>
 */
export function ArticleLayout({ meta, illustration, lede, children }: ArticleLayoutProps) {
  return (
    <div className="article">
      <aside className="article__side">
        <Fields items={meta} />
        {illustration}
      </aside>

      <article className="article__text">
        <p className="article__lede">{lede}</p>
        {children}
      </article>
    </div>
  )
}
