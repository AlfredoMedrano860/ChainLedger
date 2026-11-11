/**
 * @file Ilustración de Benefits & Limitations: una balanza con pesas + y −.
 */
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/balance-scale.png'

/** Una pesa: cuadrado con su signo. */
function Weight({ x, y, size, sign, dark }: { x: number; y: number; size: number; sign: string; dark?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={dark ? 'var(--ink)' : 'var(--signal)'} stroke="var(--ink)" strokeWidth="2.5" />
      <text
        x={x + size / 2}
        y={y + size / 2 + size * 0.24}
        textAnchor="middle"
        fontFamily="var(--f-display)"
        fontSize={size * 0.75}
        fontWeight="900"
        fill={dark ? 'var(--paper)' : 'var(--on-signal)'}
      >
        {sign}
      </text>
    </g>
  )
}

/**
 * Una balanza equilibrada: en un plato caen las pesas de los beneficios (+, rojas) y en
 * el otro las de las limitaciones (−, grafito), una tras otra. Al final se estampa
 * "IT DEPENDS", la conclusión de la sección.
 *
 * La balanza está en la imagen PNG; encima van las pesas animadas y el sello.
 */
export function BalanceScale({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={300}
      height={220}
      className={className}
      alt="A balance scale with plus weights on one side and minus weights on the other. A stamp says IT DEPENDS."
      caption="Benefits on one side, limitations on the other"
    >
      <g className="illo__chain">
        <Weight x={34} y={124} size={26} sign="+" />
        <Weight x={226} y={124} size={26} sign="−" dark />
        <Weight x={62} y={130} size={20} sign="+" />
        <Weight x={254} y={130} size={20} sign="−" dark />
      </g>

      <g className="illo__stamp">
        <g transform="rotate(-6 150 24)">
          <rect x="102" y="12" width="96" height="24" fill="var(--paper)" stroke="var(--signal-ink)" strokeWidth="3" />
          <text x="150" y="28" textAnchor="middle" fontFamily="var(--f-data)" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="var(--signal-ink)">
            IT DEPENDS
          </text>
        </g>
      </g>
    </Illustration>
  )
}
