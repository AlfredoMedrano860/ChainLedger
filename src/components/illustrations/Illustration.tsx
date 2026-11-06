/**
 * @file Contenedor común de las ilustraciones.
 */
import type { ReactNode } from 'react'
import { useInView } from './useInView'
import './illustrations.css'

/** Props de {@link Illustration}. */
interface IllustrationProps {
  /** Imagen con la parte fija del dibujo (archivo SVG en `src/assets/illustrations`). */
  src: string
  /** Texto corto debajo del dibujo (opcional). */
  caption?: string
  /** Descripción del dibujo para lectores de pantalla. */
  alt: string
  /** Ancho del dibujo en unidades del `viewBox` (también reserva su espacio al cargar). */
  width: number
  /** Alto del dibujo en unidades del `viewBox`. */
  height: number
  /** Clase extra para darle tamaño o posición desde la sección. */
  className?: string
  /** Capa encima de la imagen: textos y partes animadas (elementos SVG). */
  children?: ReactNode
}

/**
 * Muestra una ilustración en dos capas dentro de una `<figure>`:
 *
 * 1. Una imagen (`<img>`) con todo lo que no se mueve. Se descarga aparte, queda en
 *    caché y solo se pide cuando la persona se acerca (`loading="lazy"`), así que no
 *    pesa en el JavaScript ni agrega nodos a la página.
 * 2. Un SVG encima, con el mismo `viewBox`, solo con los textos (para que usen las
 *    fuentes del sitio) y las partes animadas, como el sello que se estampa.
 *
 * Cuando la figura entra en pantalla recibe la clase `is-in`, que dispara las
 * animaciones de la capa de arriba.
 */
export function Illustration({ src, caption, alt, width, height, className = '', children }: IllustrationProps) {
  const [ref, inView] = useInView<HTMLElement>()

  return (
    <figure ref={ref} className={`illo ${inView ? 'is-in' : ''} ${className}`}>
      <div className="illo__art">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
        {children && (
          <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            {children}
          </svg>
        )}
      </div>
      {caption && <figcaption className="illo__caption label">{caption}</figcaption>}
    </figure>
  )
}
