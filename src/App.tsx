/**
 * @file Componente raíz: arma la página con todas las secciones en orden.
 *
 * Las secciones 02, 04, 05 y 07 (de Didier) están reservadas con <SectionPlaceholder>.
 * Para completar una (por ejemplo Concept):
 *  1. Crea `src/sections/concept/Concept.tsx` (y su `concept.css`).
 *  2. Envuelve el contenido en `<Section id="concept" title="…">` (pone el número, el
 *     encabezado y el contenedor). Para texto con datos al lado usa `<ArticleLayout>`.
 *  3. Impórtala aquí y reemplaza su <SectionPlaceholder> por <Concept />.
 * El menú y el índice ya la enlazan, porque salen de `SECTIONS` en `data/site.ts`.
 */
import { AccessibilityPanel } from './components/accessibility/AccessibilityPanel'
import { BackToTop } from './components/BackToTop/BackToTop'
import { ChatBot } from './components/chatbot/ChatBot'
import { SectionPlaceholder } from './components/SectionPlaceholder/SectionPlaceholder'
import { AUTHORS } from './data/site'
import { Contact } from './sections/contact/Contact'
import { Development } from './sections/development/Development'
import { Footer } from './sections/footer/Footer'
import { Glossary } from './sections/glossary/Glossary'
import { Header } from './sections/header/Header'
import { Hero } from './sections/hero/Hero'
import { Introduction } from './sections/introduction/Introduction'

/** Autor de las secciones 02, 04, 05 y 07, que por ahora están reservadas. */
const DIDIER = AUTHORS[1].name

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
        <SectionPlaceholder id="concept" writer={DIDIER} />
        <Development />
        <SectionPlaceholder id="example" writer={DIDIER} />
        <SectionPlaceholder id="benefits" writer={DIDIER} />
        <Glossary />
        <SectionPlaceholder id="faq" writer={DIDIER} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
      <AccessibilityPanel />
    </>
  )
}
