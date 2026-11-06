/**
 * @file Sección 01 · Introduction ("More Than Bitcoin").
 *
 * Autor del texto: José Alfredo Medrano Saravia. El texto es la versión final del
 * borrador de la Parte 1 del documento de entrega; si se corrige allá, hay que
 * actualizarlo aquí también.
 */
import { ArticleLayout } from '../../components/ArticleLayout/ArticleLayout'
import { PrivateLedger } from '../../components/illustrations/PrivateLedger'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import { SiteIndex } from './SiteIndex'
import './introduction.css'

const writer = AUTHORS[0]

/**
 * Sección de introducción: encabezado, datos de la sección (autor, tema y alcance)
 * con la ilustración {@link PrivateLedger}, el texto en tres párrafos y el índice
 * del sitio ({@link SiteIndex}).
 *
 * Las palabras del glosario usan {@link Term} y enlazan a `#term-{id}` en la sección
 * Glossary.
 */
export function Introduction() {
  return (
    <Section id="introduction" title="More Than Bitcoin">
      <ArticleLayout
        meta={[
          { label: 'Writer', value: writer.name },
          { label: 'Topic', value: 'Private blockchain in companies' },
          { label: 'Covers', value: 'Auditing · Inventory control' },
        ]}
        illustration={<PrivateLedger className="intro__illo" />}
        lede={
          <>
            When people hear the word <Term id="blockchain">blockchain</Term>, most of them think about Bitcoin and other
            cryptocurrencies. However, blockchain is not only about digital money.
          </>
        }
      >
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
      </ArticleLayout>

      <SiteIndex />
    </Section>
  )
}
