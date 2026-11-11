/**
 * @file Componente raíz: arma la página con todas las secciones en orden.
 *
 * Las 8 secciones siguen el orden de `SECTIONS` en `data/site.ts`; el menú y el índice
 * salen de esa lista. Para una sección nueva se envuelve el contenido en
 * `<Section id="…" title="…">` y se importa aquí.
 */
import { AccessibilityPanel } from './components/accessibility/AccessibilityPanel'
import { BackToTop } from './components/BackToTop/BackToTop'
import { ChatBot } from './components/chatbot/ChatBot'
import { Benefits } from './sections/benefits/Benefits'
import { Concept } from './sections/concept/Concept'
import { Contact } from './sections/contact/Contact'
import { Development } from './sections/development/Development'
import { Example } from './sections/example/Example'
import { Faq } from './sections/faq/Faq'
import { Footer } from './sections/footer/Footer'
import { Glossary } from './sections/glossary/Glossary'
import { Header } from './sections/header/Header'
import { Hero } from './sections/hero/Hero'
import { Introduction } from './sections/introduction/Introduction'

/**
 * Página completa: enlace para saltar al contenido, header, secciones, footer y los
 * elementos flotantes (volver arriba, chatbot Blocky y accesibilidad).
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
        <Concept />
        <Development />
        <Example />
        <Benefits />
        <Glossary />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
      <AccessibilityPanel />
    </>
  )
}
