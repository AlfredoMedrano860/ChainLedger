/**
 * @file Sección 03 · Development ("How Companies Use Private Blockchain").
 *
 * Autor del texto: José Alfredo Medrano Saravia. El texto es la versión final del
 * borrador de la Parte 3 del documento de entrega, dividido en tres párrafos (uso
 * general, auditoría e inventario). Si se corrige allá, hay que actualizarlo aquí.
 */
import { ArticleLayout } from '../../components/ArticleLayout/ArticleLayout'
import { InventoryCrate } from '../../components/illustrations/InventoryCrate'
import { Section } from '../../components/Section/Section'
import { Term } from '../../components/Term/Term'
import { AUTHORS } from '../../data/site'
import { RecordFlow } from './RecordFlow'
import './development.css'

const writer = AUTHORS[0]

/**
 * Sección de desarrollo: encabezado, datos de la sección con la ilustración
 * {@link InventoryCrate}, el texto y el diagrama
 * {@link RecordFlow} con los pasos para agregar un registro.
 */
export function Development() {
  return (
    <Section id="development" title="How Companies Use Private Blockchain">
      <ArticleLayout
        meta={[
          { label: 'Writer', value: writer.name },
          { label: 'Uses', value: 'Auditing · Inventory control' },
          { label: 'Key idea', value: 'Records that are safe and hard to change' },
        ]}
        illustration={<InventoryCrate className="dev__illo" />}
        lede={
          <>
            Companies can use <Term id="blockchain">blockchain</Term> to save information within their system. With this
            technology, they can keep their data not only safe but also hard to change or steal.
          </>
        }
      >
        <p>
          For example, a private transaction system records every movement and connects it to the previous one. Because of this,
          any worker in the network can notice if someone changes the data, so the records stay correct and trustworthy.
        </p>
        <p>
          Blockchain can be used for inventory too. It can record every movement of a package or a stored product, including
          when, where, and how it is delivered. This makes the process more secure, and companies can even create a transparency
          policy to offer a better service.
        </p>
      </ArticleLayout>

      <RecordFlow />
    </Section>
  )
}
