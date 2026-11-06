/**
 * @file Hero: primera pantalla del sitio.
 */
import { ArrowIcon } from '../../components/icons/Icons'
import { PROJECT } from '../../data/site'
import { LedgerChain } from './LedgerChain'
import './hero.css'

/**
 * Primera pantalla: el nombre del sitio a todo el ancho y, debajo, dos columnas.
 *  - Izquierda: subtítulo (siempre en dos líneas en escritorio), descripción, público
 *    y los botones "Start reading" (baja a la introducción) y "Glossary".
 *  - Derecha: el manifiesto interactivo {@link LedgerChain}.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" className="hero__mega">
          {PROJECT.name}
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__sub">
              <span>Private blockchain for corporate</span> <span>auditing and inventory</span>
            </p>
            <p className="hero__lead">
              A simple guide to how companies use a private blockchain to keep their records safe, easy to check, and impossible to
              change in secret.
            </p>
            <p className="hero__for">
              <span className="label">For</span>
              Students of technology and business, and young workers who like new technologies.
            </p>
            <div className="hero__actions">
              <a href="#introduction" className="btn btn--down">
                Start reading
                <ArrowIcon direction="down" />
              </a>
              <a href="#glossary" className="btn btn--line">
                Glossary
                <ArrowIcon />
              </a>
            </div>
          </div>

          <LedgerChain />
        </div>
      </div>
    </section>
  )
}
