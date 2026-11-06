/**
 * @file Lista de datos con etiqueta y valor (campos de manifiesto).
 */
import type { ReactNode } from 'react'

/** Un dato: etiqueta pequeña arriba y valor debajo. */
export interface FieldItem {
  /** Etiqueta en mono y mayúsculas, por ejemplo `Writer`. */
  label: string
  /** Valor que se muestra debajo de la etiqueta. */
  value: ReactNode
}

/** Props de {@link Fields}. */
interface FieldsProps {
  /** Datos en el orden en que se muestran. */
  items: FieldItem[]
  /** Clase extra para la sección (columnas, márgenes…). */
  className?: string
  /**
   * `true` (por defecto) usa el estilo de manifiesto del design system: regla gruesa
   * arriba y una fina entre campos (`.fields` / `.field`). Con `false` solo se arma el
   * `<dl>` y la sección le da su propio estilo, como en el footer.
   */
  ruled?: boolean
}

/**
 * Dibuja una lista `<dl>` de campos de manifiesto. La usan los datos de la
 * introducción y de development, la ficha del curso en Contact y la del footer.
 *
 * @example
 * <Fields items={[{ label: 'Writer', value: writer.name }, { label: 'Topic', value: 'Private blockchain' }]} />
 */
export function Fields({ items, className = '', ruled = true }: FieldsProps) {
  return (
    <dl className={`${ruled ? 'fields ' : ''}${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label} className={ruled ? 'field' : undefined}>
          <dt className="label">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
