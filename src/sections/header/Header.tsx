/**
 * @file Header del sitio: marca y menú de las 8 secciones.
 */
import { useEffect, useState } from 'react'
import { LogoMark } from '../../components/Logo/LogoMark'
import { PROJECT, SECTIONS, pad2 } from '../../data/site'
import { useActiveSection } from './useActiveSection'
import './header.css'

/**
 * Header fijo en la parte superior, en dos niveles:
 *  1. La marca ChainLedger (enlace al inicio).
 *  2. Las 8 secciones del sitio, tomadas de `SECTIONS` en `data/site.ts`.
 *
 * La sección que se está leyendo se marca con una barra naranja. En pantallas de
 * 760 px o menos, las secciones se esconden detrás del botón MENU; con el menú
 * abierto, Escape lo cierra y el fondo deja de desplazarse.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label={`${PROJECT.name}, go to the top`}>
          <LogoMark className="brand__mark" />
          <span className="brand__name">{PROJECT.name}</span>
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="header__nav-row">
        <nav id="site-nav" className={`container nav ${open ? 'is-open' : ''}`} aria-label="Sections">
          <ol className="nav__list">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="nav__link"
                  aria-current={active === s.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__num" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  )
}
