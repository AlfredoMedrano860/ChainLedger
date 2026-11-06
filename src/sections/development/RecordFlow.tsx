/**
 * @file Diagrama de cómo se agrega un registro nuevo a la cadena.
 */
import { StepIcon, type StepIconName } from '../../components/illustrations/StepIcons'
import { pad2 } from '../../data/site'

/** Un paso del diagrama. */
interface FlowStep {
  /** Nombre corto del paso. */
  title: string
  /** Explicación en una o dos oraciones sencillas. */
  text: string
  /** Ícono del paso. */
  icon: StepIconName
}

/** Los cuatro pasos, desde que alguien escribe el registro hasta que un auditor lo revisa. */
const STEPS: FlowStep[] = [
  { icon: 'record', title: 'Record', text: 'A worker with permission adds a movement: what happened, when, and where.' },
  { icon: 'link', title: 'Link', text: 'The new block saves the hash of the block before it.' },
  { icon: 'copy', title: 'Copy', text: 'Every node in the network keeps a copy of the chain.' },
  { icon: 'check', title: 'Check', text: 'If someone changes a record, the copies do not match, and auditors can see it.' },
]

/**
 * Muestra los cuatro pasos como una fila de manifiesto (en celular, una columna),
 * cada uno con su número, su ícono ({@link StepIcon}), su nombre y una explicación.
 * Es el "simple diagram" de la sección Development en la propuesta del proyecto.
 */
export function RecordFlow() {
  return (
    <figure className="flow" aria-labelledby="flow-title">
      <figcaption id="flow-title" className="flow__title">
        How a new record is added
      </figcaption>
      <ol className="flow__steps">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flow__step">
            <div className="flow__top">
              <span className="flow__num">{pad2(i + 1)}</span>
              <StepIcon name={step.icon} className="flow__icon" />
            </div>
            <h3 className="flow__name">{step.title}</h3>
            <p className="flow__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}
