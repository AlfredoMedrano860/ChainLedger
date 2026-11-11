/**
 * @file Sección 02 · Concept ("What Is a Blockchain?").
 *
 * Autor del texto: Didier Aarón Mayorga Hernández. Explica bloques, hashes y nodos, y
 * compara la blockchain pública con la privada.
 */
import { ArticleLayout } from '../../components/ArticleLayout/ArticleLayout'
import { NodeNetwork } from '../../components/illustrations/NodeNetwork'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import './concept.css'

const writer = AUTHORS[1]

/** Una fila de la tabla pública vs. privada. */
interface ComparisonRow {
  /** Pregunta que compara los dos tipos. */
  topic: string
  /** Respuesta para la blockchain pública. */
  open: string
  /** Respuesta para la blockchain privada. */
  closed: string
}

const COMPARISON: ComparisonRow[] = [
  { topic: 'Who can join?', open: 'Anyone', closed: 'Only people with permission' },
  { topic: 'Who controls it?', open: 'Nobody in particular', closed: 'One organization' },
  { topic: 'Who can read the records?', open: 'Everyone', closed: 'Only the members' },
  { topic: 'Speed', open: 'Slower: many unknown nodes must agree', closed: 'Faster: a few known nodes agree' },
  { topic: 'Example', open: 'Bitcoin', closed: "A company's inventory system" },
]

/**
 * Sección de concepto: datos de la sección con la ilustración {@link NodeNetwork}
 * (tres nodos con la misma copia de la cadena), el texto y una tabla de manifiesto que compara
 * la blockchain pública con la privada (en celular cada fila se apila).
 */
export function Concept() {
  return (
    <Section id="concept" title="What Is a Blockchain?">
      <ArticleLayout
        meta={[
          { label: 'Writer', value: writer.name },
          { label: 'Topic', value: 'Blocks, hashes, and nodes' },
          { label: 'Compares', value: 'Public vs. private blockchain' },
        ]}
        illustration={<NodeNetwork className="concept__illo" />}
        lede={
          <>
            A <Term id="blockchain">blockchain</Term> is a digital <Term id="ledger">ledger</Term>. It saves information in
            groups called blocks, and the blocks are connected in order, one after the other.
          </>
        }
      >
        <p>
          Each <Term id="block">block</Term> has a group of records, the date, and a <Term id="hash">hash</Term>. A hash is a short
          code that works like a fingerprint: if one letter of the block changes, the hash changes too. Each block also keeps the
          hash of the block before it. For this reason, if someone changes an old record, the connection with the next block
          breaks, and everybody can see it.
        </p>
        <p>
          A blockchain does not live on only one computer. Many computers, called <Term id="node">nodes</Term>, keep a copy of the
          same chain. When a new block arrives, the nodes check it and add it to their copy. If one copy is different from the
          others, the network knows that something is wrong.
        </p>
        <p>
          There are two main types of blockchain. In a <Term id="public-blockchain">public blockchain</Term>, like Bitcoin, anyone
          can read the records and participate. In a <Term id="private-blockchain">private blockchain</Term>, one organization
          decides who has <Term id="permission">permission</Term> to read or add information. Companies usually prefer the private
          type, because it keeps their data protected and it is useful for <Term id="auditing">auditing</Term> and inventory
          control.
        </p>
      </ArticleLayout>

      <div className="compare">
        <h3 className="compare__title">Public vs. private blockchain</h3>
        <table className="compare__table">
          <thead>
            <tr>
              <th scope="col">
                <span className="label">Question</span>
              </th>
              <th scope="col">Public</th>
              <th scope="col" className="compare__private">
                Private
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.topic}>
                <th scope="row">{row.topic}</th>
                <td data-label="Public">{row.open}</td>
                <td data-label="Private" className="compare__private">
                  {row.closed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
