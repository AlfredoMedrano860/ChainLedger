/**
 * @file Sección 05 · Benefits & Limitations.
 *
 * Autor del texto: Didier Aarón Mayorga Hernández. Presenta los puntos buenos y malos de
 * una blockchain privada para una empresa, en dos columnas, y una conclusión.
 */
import { BalanceScale } from '../../components/illustrations/BalanceScale'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import type { ReactNode } from 'react'
import './benefits.css'

const writer = AUTHORS[1]

/** Un punto de la lista: nombre corto y explicación. */
interface Point {
  title: string
  text: ReactNode
}

const BENEFITS: Point[] = [
  {
    title: 'Hard to change',
    text: 'Every record is connected to the one before it, so nobody can change old information in secret.',
  },
  {
    title: 'Faster audits',
    text: (
      <>
        Auditors can check the whole history in one place. They do not need to look for papers in different offices, so{' '}
        <Term id="auditing">auditing</Term> takes less time.
      </>
    ),
  },
  {
    title: 'Better traceability',
    text: (
      <>
        A company can follow a product from its origin to the store in seconds. This is called{' '}
        <Term id="traceability">traceability</Term>.
      </>
    ),
  },
  {
    title: 'Control of access',
    text: (
      <>
        The company decides who has <Term id="permission">permission</Term> to read or add records.
      </>
    ),
  },
  {
    title: 'More trust',
    text: 'Partners, like transport companies and stores, see the same records, so there are fewer arguments.',
  },
]

const LIMITATIONS: Point[] = [
  {
    title: 'High cost',
    text: 'Building the system, buying equipment, and paying experts is expensive, especially for small companies.',
  },
  {
    title: 'Training is necessary',
    text: 'Workers need to learn new tools and new rules before they can use the system well.',
  },
  {
    title: 'Wrong data stays wrong',
    text: 'The blockchain protects records, but it cannot check if they are true. If a person writes a mistake, the mistake is saved too.',
  },
  {
    title: 'Partners must join',
    text: 'It only works well when suppliers and transport companies also use it, and some of them may not want to.',
  },
  {
    title: 'Less open',
    text: (
      <>
        In a <Term id="private-blockchain">private blockchain</Term>, one organization has the control, so people outside the
        company must trust it.
      </>
    ),
  },
]

/**
 * Dos columnas de manifiesto: beneficios (marcados con +) y limitaciones (marcadas
 * con −), cada punto numerado. Debajo, una conclusión corta. En celular las columnas
 * se apilan.
 */
export function Benefits() {
  return (
    <Section id="benefits" title="The Good and the Bad Points">
      <div className="section-intro">
        <div className="pros-cons__intro">
          <p className="pros-cons__lede">
            A private blockchain can help a company a lot, but it is not perfect. Before a company uses it, it is important to
            know its benefits and its limitations.
          </p>
          <span className="label">Writer · {writer.name}</span>
        </div>
        <BalanceScale className="section-intro__illo" />
      </div>

      <div className="pros-cons">
        <PointList title="Benefits" sign="+" points={BENEFITS} />
        <PointList title="Limitations" sign="−" points={LIMITATIONS} tone="limit" />
      </div>

      <div className="pros-cons__verdict">
        <span className="label">So, is it a good idea?</span>
        <p>
          It depends on the company. A private blockchain is a good idea when many partners share the same records and the
          company needs to check them often, like in food or medicine. For a small store with simple records, a normal database
          can be cheaper and enough.
        </p>
      </div>
    </Section>
  )
}

/**
 * Una columna de puntos con su título.
 *
 * @param title - Título de la columna.
 * @param sign - Signo que acompaña al número de cada punto (`+` o `−`).
 * @param points - Puntos en orden.
 * @param tone - `limit` para la columna de limitaciones (signo en grafito en vez de rojo).
 */
function PointList({ title, sign, points, tone }: { title: string; sign: string; points: Point[]; tone?: 'limit' }) {
  return (
    <section className={`points${tone ? ` points--${tone}` : ''}`} aria-label={title}>
      <h3 className="points__title">{title}</h3>
      <ol className="points__list">
        {points.map((p, i) => (
          <li key={p.title} className="points__item">
            <span className="points__sign" aria-hidden="true">
              {sign}
              {i + 1}
            </span>
            <div>
              <h4 className="points__name">{p.title}</h4>
              <p className="points__text">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
