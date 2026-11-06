/**
 * @file Sección 01 · Introduction ("More Than Bitcoin").
 *
 * Autor del texto: José Alfredo Medrano Saravia. El texto es la versión final del
 * borrador de la Parte 1 del documento de entrega; si se corrige allá, hay que
 * actualizarlo aquí también.
 */
import { SectionHeader } from '../../components/SectionHeader/SectionHeader'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import { SiteIndex } from './SiteIndex'
import './introduction.css'

const writer = AUTHORS[0]

/**
 * Sección de introducción: encabezado, datos de la sección (autor, tema y alcance),
 * el texto en tres párrafos y el índice del sitio ({@link SiteIndex}).
 *
 * Las palabras del glosario usan {@link Term} y enlazan a `#term-{id}` en la sección
 * Glossary.
 */
export function Introduction() {
  return (
    <section id="introduction" className="sec" aria-labelledby="intro-title">
      <div className="container">
        <SectionHeader number={1} label="Introduction" title="More Than Bitcoin" titleId="intro-title" />

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

        <SiteIndex />
      </div>
    </section>
  )
}
