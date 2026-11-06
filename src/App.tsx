import { Accessibility } from './components/Accessibility'
import { BackToTop } from './components/BackToTop'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Introduction } from './components/Introduction'

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
      <Accessibility />
    </>
  )
}
