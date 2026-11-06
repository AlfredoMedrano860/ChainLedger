/**
 * @file Componente raíz: arma la página con todas las secciones en orden.
 *
 * Para agregar una sección nueva (por ejemplo Concept):
 *  1. Crea `src/sections/concept/Concept.tsx` (y su `concept.css`).
 *  2. Usa `<section id="concept" className="sec">` con `<SectionHeader number={2} … />`.
 *  3. Impórtala aquí y colócala dentro de `<main>` en su lugar.
 * El menú y el índice ya la enlazan, porque salen de `SECTIONS` en `data/site.ts`.
 */
import { AccessibilityPanel } from './components/accessibility/AccessibilityPanel'
import { BackToTop } from './components/BackToTop/BackToTop'
import { Footer } from './sections/footer/Footer'
import { Header } from './sections/header/Header'
import { Hero } from './sections/hero/Hero'
import { Introduction } from './sections/introduction/Introduction'

/**
 * Página completa: enlace para saltar al contenido, header, secciones, footer y los
 * botones flotantes (volver arriba y accesibilidad).
 */
export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <span id="top" />
        <Hero />
        <Introduction />
      </main>
      <Footer />
      <BackToTop />
      <AccessibilityPanel />
    </>
  )
}
