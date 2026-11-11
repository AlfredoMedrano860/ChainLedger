/**
 * @file Ilustración de Concept: tres nodos con la misma copia de la cadena.
 */
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/node-network.png'

/** Esquina superior izquierda de cada monitor en la imagen. */
const SCREENS = [
  { name: 'NODE A', x: 108, y: 14 },
  { name: 'NODE B', x: 20, y: 128 },
  { name: 'NODE C', x: 196, y: 128 },
]

/**
 * Tres computadoras conectadas con líneas punteadas. En la pantalla de cada una
 * aparece la misma cadena de tres bloques (uno tras otro), y al final se estampa el
 * sello "SAME COPY": cada nodo guarda una copia idéntica de la blockchain.
 *
 * Los monitores y las líneas están en la imagen PNG; encima van los nombres de los
 * nodos, los bloques animados y el sello.
 */
export function NodeNetwork({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={320}
      height={240}
      className={className}
      alt="Three connected computers. Each screen shows the same chain of three blocks, and a stamp says SAME COPY."
      caption="Every node keeps a copy"
    >
      {SCREENS.map(({ name, x, y }) => (
        <g key={name}>
          <text x={x + 16} y={y + 21} fontFamily="var(--f-data)" fontSize="7" fontWeight="700" fill="var(--ink)">
            {name}
          </text>
          <g className="illo__chain">
            <rect x={x + 16} y={y + 28} width="18" height="14" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2" />
            <rect x={x + 43} y={y + 28} width="18" height="14" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2" />
            <rect x={x + 70} y={y + 28} width="18" height="14" fill="var(--signal)" stroke="var(--ink)" strokeWidth="2" />
            <path d={`M${x + 34} ${y + 35}h9M${x + 61} ${y + 35}h9`} stroke="var(--ink)" strokeWidth="2" />
          </g>
        </g>
      ))}

      <g className="illo__stamp">
        <g transform="rotate(-8 160 116)">
          <rect x="114" y="104" width="92" height="24" fill="var(--paper)" stroke="var(--signal-ink)" strokeWidth="3" />
          <text x="160" y="120" textAnchor="middle" fontFamily="var(--f-data)" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="var(--signal-ink)">
            SAME COPY
          </text>
        </g>
      </g>
    </Illustration>
  )
}
