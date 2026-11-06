/**
 * @file Header del sitio: marca y menú de las 8 secciones.
 */
import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '../../components/Logo/LogoMark'
import { PROJECT, SECTIONS, pad2 } from '../../data/site'
import { useActiveSection } from './useActiveSection'
import './header.css'

/**
 * Header fijo en la parte superior, en dos niveles:
 *  1. La marca ChainLedger (enlace al inicio).
 *  2. Las 8 secciones del sitio, tomadas de `SECTIONS` en `data/site.ts`.
 *
 * La sección que se está leyendo se marca con una barra roja.
 *
 * Menú compacto (clase `is-compact`): las secciones se esconden detrás del botón MENU
 * y se abren en una lista que tapa la página; Escape la cierra y el fondo deja de
 * desplazarse. Se usa en pantallas de 760 px o menos y también cuando las secciones
 * no caben en su fila (una fila en escritorio, dos de 4 en tablet), por ejemplo con
 * letra grande o la fuente para dislexia.
 *
 * El alto real del header se guarda en la variable CSS `--header-h` cada vez que
 * cambia. Así el scroll a cada sección y las columnas fijas quedan justo debajo.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const active = useActiveSection()
  const headerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const list = listRef.current
    if (!header || !list || !('ResizeObserver' in window)) return
    const root = document.documentElement
    const mobile = window.matchMedia('(max-width: 760px)')
    const tablet = window.matchMedia('(max-width: 1080px)')

    const update = () => {
      let next = mobile.matches
      if (!next) {
        // Se mide el menú normal (sin la clase) y se cuentan sus filas: si hay más de
        // las previstas, las secciones no caben y se usa el menú compacto.
        header.classList.remove('is-compact')
        const tops = new Set([...list.children].map((li) => (li as HTMLElement).offsetTop))
        next = tops.size > (tablet.matches ? 2 : 1)
      }
      header.classList.toggle('is-compact', next)
      setCompact(next)
      if (!next) setOpen(false)
      root.style.setProperty('--header-h', `${header.offsetHeight}px`)
    }

    const observer = new ResizeObserver(() => requestAnimationFrame(update))
    observer.observe(header)
    observer.observe(list)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-h')
    }
  }, [])

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
    <header ref={headerRef} className={`header ${compact ? 'is-compact' : ''}`}>
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
          <ol ref={listRef} className="nav__list">
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
