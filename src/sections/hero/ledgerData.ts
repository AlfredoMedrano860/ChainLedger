/**
 * @file Datos de la demostración del hero: un lote de inventario en tres movimientos.
 */
import type { LedgerBlock } from '../../lib/hash'

/** Los tres movimientos originales del lote CL-204, del almacén a la tienda. */
export const LEDGER_BLOCKS: LedgerBlock[] = [
  { index: 1, record: '120 boxes received', place: 'Central warehouse', time: '08:14' },
  { index: 2, record: '120 boxes loaded', place: 'Truck 07', time: '13:40' },
  { index: 3, record: '120 boxes on shelf', place: 'Store 12', time: '18:05' },
]

/** Número del bloque que se altera al pulsar "Change block 02". */
export const TAMPERED_INDEX = 2

/** Registro alterado: alguien cambia 120 cajas por 95 sin que nadie lo autorice. */
export const TAMPERED_RECORD = '95 boxes loaded'
