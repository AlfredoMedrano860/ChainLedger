/**
 * @file Sección 07 · FAQ.
 *
 * Autor del texto: Didier Aarón Mayorga Hernández. Preguntas frecuentes con respuestas
 * cortas, en una lista desplegable (`<details>`), y un enlace a Contact.
 */
import type { ReactNode } from 'react'
import { ArrowIcon } from '../../components/icons/Icons'
import { QuestionBubbles } from '../../components/illustrations/QuestionBubbles'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS, pad2 } from '../../data/site'
import './faq.css'

const writer = AUTHORS[1]

/** Una pregunta frecuente. */
interface Question {
  q: string
  a: ReactNode
}

const QUESTIONS: Question[] = [
  {
    q: 'Is a blockchain the same as Bitcoin?',
    a: (
      <>
        No. Bitcoin is a digital currency that uses a <Term id="public-blockchain">public blockchain</Term>. A blockchain is the
        technology behind it, and companies can use it for other things, like inventory.
      </>
    ),
  },
  {
    q: 'Do companies need cryptocurrencies to use a private blockchain?',
    a: 'No. A private blockchain saves records, like movements of products or payments between offices. It does not need any digital money.',
  },
  {
    q: 'Can someone change a record after it is saved?',
    a: (
      <>
        It is very difficult. Each block keeps the <Term id="hash">hash</Term> of the block before it, so a change breaks the
        chain, and the other <Term id="node">nodes</Term> can see that their copies do not match.
      </>
    ),
  },
  {
    q: 'Who can see the information?',
    a: (
      <>
        Only the people and companies with <Term id="permission">permission</Term>. The organization that controls the private
        blockchain decides who can read and who can add records.
      </>
    ),
  },
  {
    q: 'Is it better than a normal database?',
    a: 'Not always. It is better when many partners share the same records and need to trust them. For simple records inside one company, a normal database is usually cheaper and faster.',
  },
  {
    q: 'Is it expensive?',
    a: 'It can be. The company must pay for the system, the equipment, and the training of its workers. Big companies can pay for it more easily than small ones.',
  },
  {
    q: 'Which companies use it today?',
    a: 'Companies in food, transport, banking, and medicine. For example, Walmart uses IBM Food Trust to follow its food from the farm to the store.',
  },
]

/**
 * Lista de preguntas desplegables. Cada una se abre y se cierra sola (`<details>`), sin
 * JavaScript, y funciona con teclado y lector de pantalla. Debajo, una invitación a
 * escribir a los autores.
 */
export function Faq() {
  return (
    <Section id="faq" title="Frequently Asked Questions">
      <div className="section-intro">
        <div className="faq__intro">
          <p>Short answers to the questions that people ask most about private blockchain.</p>
          <span className="label">Writer · {writer.name}</span>
        </div>
        <QuestionBubbles className="section-intro__illo" />
      </div>

      <div className="faq">
        {QUESTIONS.map((item, i) => (
          <details key={item.q} className="faq__item">
            <summary className="faq__q">
              <span className="faq__num">Q{pad2(i + 1)}</span>
              <span className="faq__question">{item.q}</span>
              <span className="faq__toggle" aria-hidden="true" />
            </summary>
            <p className="faq__a">{item.a}</p>
          </details>
        ))}
      </div>

      <a className="faq__more" href="#contact">
        <span>
          <span className="label">Still have a question?</span>
          <span className="faq__more-text">Ask Blocky or write to us</span>
        </span>
        <ArrowIcon className="faq__more-arrow" />
      </a>
    </Section>
  )
}
