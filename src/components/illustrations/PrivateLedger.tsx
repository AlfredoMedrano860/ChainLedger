/**
 * @file Ilustración de la introducción: moneda vs. libro contable privado.
 */
import { Illustration } from './Illustration'
import art from '../../assets/illustrations/private-ledger.svg'

/**
 * Una moneda (el dinero digital que todos asocian con blockchain) queda detrás de un
 * libro contable cerrado con candado y un sello "PRIVATE". En las páginas del libro,
 * tres registros están conectados en orden, como los bloques de una cadena.
 *
 * Resume la idea de la introducción: blockchain no es solo dinero digital, también
 * sirve para que una empresa guarde sus propios registros.
 *
 * La moneda, el libro y el candado están en la imagen; encima van los textos, los
 * tres registros (aparecen uno tras otro) y el sello.
 */
export function PrivateLedger({ className }: { className?: string }) {
  return (
    <Illustration
      src={art}
      width={320}
      height={240}
      className={className}
      alt="A coin behind a closed record book with a padlock and a PRIVATE stamp. Inside the book, three records are connected in order."
      caption="Not only digital money"
    >
      <text x="90" y="127" textAnchor="middle" fontFamily="var(--f-display)" fontWeight="900" fontSize="58" fill="var(--ink)">
        $
      </text>
      <text x="230" y="58" textAnchor="middle" fontFamily="var(--f-data)" fontSize="9" fontWeight="600" fill="var(--ink)">
        LEDGER
      </text>

      <g className="illo__chain">
        <rect x="182" y="78" width="28" height="22" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="182" y="118" width="28" height="22" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="182" y="158" width="28" height="22" fill="var(--signal)" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M196 100v18M196 140v18" stroke="var(--ink)" strokeWidth="2.5" />
      </g>

      <g className="illo__stamp">
        <g transform="rotate(-10 222 200)">
          <rect x="178" y="188" width="88" height="26" fill="var(--paper)" stroke="var(--signal-ink)" strokeWidth="3" />
          <text x="222" y="206" textAnchor="middle" fontFamily="var(--f-data)" fontSize="12" fontWeight="700" letterSpacing="2" fill="var(--signal-ink)">
            PRIVATE
          </text>
        </g>
      </g>
    </Illustration>
  )
}
