/**
 * @file Ilustración de FAQ: un globo de pregunta y uno de respuesta.
 */
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/question-bubbles.png'

/**
 * Dos globos de diálogo: el gris tiene un signo de pregunta grande y el rojo, la
 * respuesta, cuyas líneas aparecen una tras otra. Al final se estampa "ANSWERED".
 *
 * Los globos están en la imagen PNG; encima van el signo, las líneas y el sello.
 */
export function QuestionBubbles({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={280}
      height={210}
      className={className}
      alt="A gray speech bubble with a question mark and a red speech bubble with an answer. A stamp says ANSWERED."
      caption="Short answers in simple words"
    >
      <text x="95" y="102" textAnchor="middle" fontFamily="var(--f-display)" fontWeight="900" fontSize="76" fill="var(--ink)">
        ?
      </text>

      <g className="illo__chain">
        <rect x="138" y="112" width="96" height="7" fill="var(--on-signal)" />
        <rect x="138" y="128" width="108" height="7" fill="var(--on-signal)" />
        <rect x="138" y="144" width="70" height="7" fill="var(--on-signal)" />
      </g>

      <g className="illo__stamp">
        <g transform="rotate(-8 64 180)">
          <rect x="18" y="168" width="92" height="24" fill="var(--paper)" stroke="var(--signal-ink)" strokeWidth="3" />
          <text x="64" y="184" textAnchor="middle" fontFamily="var(--f-data)" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="var(--signal-ink)">
            ANSWERED
          </text>
        </g>
      </g>
    </Illustration>
  )
}
