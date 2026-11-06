/**
 * @file Fila de una opción sí/no del panel de accesibilidad.
 */
import { updateA11y, useA11y, type BoolSetting } from '../../lib/a11y'

/** Props de {@link SettingRow}. */
interface SettingRowProps {
  /** Nombre de la opción que se muestra. */
  label: string
  /** Opción de `A11ySettings` que controla esta fila. */
  setting: BoolSetting
  /** Texto de ayuda debajo del nombre (opcional). */
  hint?: string
  /** Desactiva la fila, por ejemplo si el lector de voz está apagado. */
  disabled?: boolean
}

/**
 * Interruptor de una opción. Toda la fila es el botón (más fácil de tocar) y a la
 * derecha muestra un sello ON/OFF. Usa `role="switch"` y `aria-checked` para que los
 * lectores de pantalla lo anuncien como interruptor.
 *
 * @example
 * <SettingRow label="High contrast" setting="highContrast" />
 */
export function SettingRow({ label, setting, hint, disabled = false }: SettingRowProps) {
  const settings = useA11y()
  const on = settings[setting]

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={`a11y-row ${on ? 'is-on' : ''}`}
      onClick={() => updateA11y({ [setting]: !on })}
    >
      <span className="a11y-row__text">
        <span className="a11y-row__label">{label}</span>
        {hint && <span className="a11y-row__hint">{hint}</span>}
      </span>
      <span className="a11y-row__state" aria-hidden="true">
        {on ? 'On' : 'Off'}
      </span>
    </button>
  )
}
