/**
 * @file Ilustración de Contact: sobre con etiqueta de envío.
 */
import { Barcode } from '../Barcode/Barcode'
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/mail-envelope.svg'

/**
 * Sobre cerrado con la etiqueta de destino ("TO: CHAINLEDGER"), un código de barras,
 * una estampilla roja con el símbolo de la marca y un matasellos encima.
 * Acompaña la invitación a escribir en la sección Contact.
 *
 * El sobre, la etiqueta y la estampilla están en la imagen; encima van el texto y el
 * código de barras de la etiqueta (generado con {@link Barcode}) y el matasellos, que
 * se estampa al llegar.
 */
export function MailEnvelope({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={300}
      height={200}
      className={className}
      alt="A closed envelope addressed to ChainLedger, with a stamp and a postmark."
    >
      <text x="104" y="134" fontFamily="var(--f-data)" fontSize="8" fontWeight="700" fill="var(--ink)">
        TO: CHAINLEDGER
      </text>
      <Barcode seed="TO: CHAINLEDGER" bars={10} x={104} y={148} width={37} height={10} fill="var(--ink)" />

      <g className="illo__stamp">
        <circle cx="206" cy="78" r="20" fill="none" stroke="var(--ink)" strokeWidth="2" opacity=".75" />
        <path
          d="M160 70c8-5 16 5 24 0s16 5 24 0M160 80c8-5 16 5 24 0s16 5 24 0M160 90c8-5 16 5 24 0s16 5 24 0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          opacity=".75"
        />
      </g>
    </Illustration>
  )
}
