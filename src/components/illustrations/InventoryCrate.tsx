/**
 * @file Ilustración de Development: caja isométrica del lote CL-204.
 */
import { Barcode } from '../Barcode/Barcode'
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/inventory-crate.svg'

/**
 * Caja de inventario en perspectiva isométrica, con cinta roja, una etiqueta con
 * código de barras en la cara derecha y un sello "VERIFIED" en la cara izquierda.
 * Es la misma caja del lote CL-204 del hero: cada movimiento de esa caja queda
 * guardado como un bloque.
 *
 * La caja, la cinta y la etiqueta están en la imagen; encima van el texto y el código
 * de barras de la etiqueta (generado con {@link Barcode}) y el sello, que se estampa
 * al llegar. Las caras laterales usan
 * `matrix(...)` para inclinar el texto y el sello en la misma perspectiva que la caja.
 */
export function InventoryCrate({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={220}
      height={220}
      className={className}
      alt="An inventory box labeled LOT CL-204 with a barcode and a VERIFIED stamp."
      caption="Every movement of a box becomes a block"
    >
      <g transform="matrix(1 -0.5 0 1 118 133)">
        <text x="16" y="27" fontFamily="var(--f-data)" fontSize="7" fontWeight="700" fill="var(--ink)">
          CL-204
        </text>
        <Barcode seed="CL-204" bars={14} x={16} y={32} width={38} height={18} fill="var(--ink)" />
      </g>

      <g className="illo__stamp">
        <g transform="matrix(1 0.5 0 1 48 98)">
          <g transform="rotate(-8 37 48)">
            <rect x="13" y="39" width="48" height="17" fill="none" stroke="var(--signal-ink)" strokeWidth="2.5" />
            <text x="37" y="51" textAnchor="middle" fontFamily="var(--f-data)" fontSize="7" fontWeight="700" letterSpacing="1" fill="var(--signal-ink)">
              VERIFIED
            </text>
          </g>
        </g>
      </g>
    </Illustration>
  )
}
