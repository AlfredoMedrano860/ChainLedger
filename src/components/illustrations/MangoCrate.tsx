/**
 * @file Ilustración de Example: caja de mangos rastreada.
 */
import { Barcode } from '../Barcode/Barcode'
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/mango-crate.png'

/**
 * Una caja de mangos con una etiqueta colgando y una lupa que la revisa: la búsqueda
 * del caso de Walmart. En la etiqueta van el lote y un código de barras (generado con
 * {@link Barcode}); al entrar en pantalla se estampa "TRACED · 2.2 S", el tiempo que
 * tardó la búsqueda con blockchain.
 *
 * La caja, los mangos, la etiqueta y la lupa están en la imagen PNG; encima van el
 * texto, el código de barras y el sello.
 */
export function MangoCrate({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={280}
      height={220}
      className={className}
      alt="A box of mangoes with a tag labeled LOT MG-2016 and a magnifying glass. A stamp says TRACED 2.2 S."
      caption="From the store to the farm"
    >
      <text x="190" y="173" fontFamily="var(--f-data)" fontSize="8" fontWeight="700" fill="var(--ink)">
        LOT MG-2016
      </text>
      <Barcode seed="MG-2016" bars={16} x={190} y={179} width={58} height={17} fill="var(--ink)" />

      <g className="illo__stamp">
        <g transform="rotate(-8 96 158)">
          <rect x="36" y="146" width="120" height="24" fill="var(--paper)" stroke="var(--signal-ink)" strokeWidth="3" />
          <text x="96" y="162" textAnchor="middle" fontFamily="var(--f-data)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--signal-ink)">
            TRACED · 2.2 S
          </text>
        </g>
      </g>
    </Illustration>
  )
}
