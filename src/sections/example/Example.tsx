/**
 * @file Sección 04 · Example ("Walmart and IBM Food Trust").
 *
 * Autor del texto: Didier Aarón Mayorga Hernández. Cuenta el caso de Walmart con IBM
 * Food Trust (rastrear mangos de la tienda a la finca) y termina con la actividad
 * interactiva {@link TraceActivity}.
 */
import { ArticleLayout } from '../../components/ArticleLayout/ArticleLayout'
import { MangoCrate } from '../../components/illustrations/MangoCrate'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import { TraceActivity } from './TraceActivity'
import './example.css'

const writer = AUTHORS[1]

/**
 * Sección del caso real: datos de la sección, la ilustración {@link MangoCrate} y la
 * comparación de tiempos (antes y con blockchain), el texto del caso y la actividad.
 */
export function Example() {
  return (
    <Section id="example" title="Walmart and IBM Food Trust">
      <ArticleLayout
        meta={[
          { label: 'Writer', value: writer.name },
          { label: 'Company', value: 'Walmart' },
          { label: 'Platform', value: 'IBM Food Trust' },
          { label: 'Product traced', value: 'Sliced mangoes' },
        ]}
        illustration={
          <>
            <MangoCrate className="example__illo" />
            <dl className="trace-time" aria-label="Time to trace one package of mangoes">
              <div className="trace-time__row">
                <dt className="label">Paper records</dt>
                <dd className="trace-time__value">6 days, 18 h, 26 min</dd>
              </div>
              <div className="trace-time__row trace-time__row--chain">
                <dt className="label">With blockchain</dt>
                <dd className="trace-time__value">2.2 seconds</dd>
              </div>
            </dl>
          </>
        }
        lede={
          <>
            Walmart is one of the biggest supermarket companies in the world. In 2016, it started to work with IBM to follow its
            food from the farm to the store with a <Term id="blockchain">blockchain</Term>.
          </>
        }
      >
        <p>
          In one test, Walmart wanted to know where a package of sliced mangoes came from. With the old paper records, the search
          took almost seven days. With the blockchain, it took only 2.2 seconds. This kind of quick search is called{' '}
          <Term id="traceability">traceability</Term>.
        </p>
        <p>
          Speed is very important when food makes people sick. If the company finds the farm in a few seconds, it can remove only
          the bad products from the stores, and it does not need to throw away all the mangoes in the country.
        </p>
        <p>
          In 2018, the system became IBM Food Trust, and other food companies joined it. It is a{' '}
          <Term id="private-blockchain">private blockchain</Term>: only farms, transport companies, and stores with{' '}
          <Term id="permission">permission</Term> can add records. Every movement of the food is saved in order, so the records
          are also very useful for <Term id="auditing">auditing</Term>.
        </p>
      </ArticleLayout>

      <TraceActivity />
    </Section>
  )
}
