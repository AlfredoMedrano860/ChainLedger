import type { ReactNode } from 'react'
import { AUTHORS, SECTIONS } from '../data/site'

// Término que enlaza a su definición en el glosario (la sección se construye después).
function Term({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a className="term" href={`#term-${id}`}>
      {children}
    </a>
  )
}

const writer = AUTHORS[0]

export function Introduction() {
  // El índice no incluye la introducción.
  const contents = SECTIONS.filter((s) => s.id !== 'introduction')

  return (
    <section id="introduction" className="sec" aria-labelledby="intro-title">
      <div className="container">
        <header className="sec-head">
          <span className="sec-head__num" aria-hidden="true">
            01
          </span>
          <div className="sec-head__text">
            <span className="label">Section 01 · Introduction</span>
            <h2 id="intro-title" className="sec-head__title">
              More Than Bitcoin
            </h2>
          </div>
        </header>

        <div className="intro">
          <dl className="fields intro__meta">
            <div className="field">
              <dt className="label">Writer</dt>
              <dd>{writer.name}</dd>
            </div>
            <div className="field">
              <dt className="label">Topic</dt>
              <dd>Private blockchain in companies</dd>
            </div>
            <div className="field">
              <dt className="label">Covers</dt>
              <dd>Auditing · Inventory control</dd>
            </div>
          </dl>

          {/* Texto final del borrador de la Parte 1 (sin cambios). */}
          <article className="intro__text">
            <p className="intro__lede">
              When people hear the word <Term id="blockchain">blockchain</Term>, most of them think about Bitcoin and other
              cryptocurrencies. However, blockchain is not only about digital money.
            </p>
            <p>
              Today, many companies use a <Term id="private-blockchain">private blockchain</Term> to save and protect their own
              information. In a private blockchain, the company decides who can read the records and who can add new ones. Also,
              every record is connected to the one before it, so nobody can change it in secret. For this reason, it is very useful
              for two important tasks: <Term id="auditing">auditing</Term> and inventory control.
            </p>
            <p>
              On this site, you will learn what a blockchain is, how companies use it, and why some of them prefer it to a normal
              database. You will also see a real example, an interactive activity, and a glossary with the most important words. If
              you study technology or business, or you simply like new technologies, this site is for you.
            </p>
          </article>
        </div>

        {/* índice como tabla de manifiesto */}
        <div className="contents">
          <h3 className="contents__title">On this site</h3>
          <ol className="contents__list">
            {contents.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="contents__row">
                  <span className="contents__num">{String(SECTIONS.indexOf(s) + 1).padStart(2, '0')}</span>
                  <span className="contents__label">{s.label}</span>
                  <span className="contents__summary">{s.summary}</span>
                  <svg className="contents__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                    <path d="M4 12h16m-7-7 7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
