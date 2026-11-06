/**
 * @file Botón flotante y panel de accesibilidad ("Form A-11").
 *
 * Reúne las opciones de accesibilidad en cuatro grupos: lectura en voz alta, texto,
 * color y enfoque. Cada cambio se guarda con `lib/a11y.ts` y se ve al instante.
 *
 * Accesibilidad del propio panel:
 *  - Escape lo cierra y devuelve el foco al botón que lo abrió.
 *  - Tab no sale del panel mientras está abierto.
 *  - Un clic fuera del panel lo cierra.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULTS, resetA11y, updateA11y, useA11y } from '../../lib/a11y'
import { readerSupported, readPage, readSelection, stopReading, useSpeaking } from '../../lib/voiceReader'
import { AccessibilityIcon, CloseIcon } from '../icons/Icons'
import { COLOR_MODES, FONT_SIZES } from './options'
import { ColorBlindFilters, ReadingGuide, ReadingMask } from './ReadingAids'
import { SettingRow } from './SettingRow'
import { useReaderListeners } from './useReaderListeners'
import '../FloatingButton/floating-button.css'
import './accessibility-panel.css'
import './accessibility-effects.css'

/**
 * Cuenta cuántas opciones son distintas de los valores iniciales.
 *
 * @param settings - Preferencias actuales.
 * @returns Número de opciones cambiadas.
 */
function countChanges(settings: typeof DEFAULTS) {
  return (Object.keys(DEFAULTS) as (keyof typeof DEFAULTS)[]).filter((k) => settings[k] !== DEFAULTS[k]).length
}

/**
 * Componente completo de accesibilidad: filtros de color, guía y máscara de lectura,
 * el panel y su botón flotante. Se monta una sola vez, en `App`.
 */
export function AccessibilityPanel() {
  const settings = useA11y()
  const speaking = useSpeaking()
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const root = useRef<HTMLDivElement>(null)
  const fab = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  useReaderListeners()

  const close = useCallback(() => {
    setOpen(false)
    fab.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !root.current) return
      const items = root.current.querySelectorAll<HTMLElement>('.a11y-panel button:not(:disabled)')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, close])

  /**
   * Enciende el lector si estaba apagado y ejecuta una acción de lectura.
   *
   * @param action - `readPage`, o una función que lea la selección.
   */
  const startReading = (action: () => void) => {
    if (!settings.voiceReader) updateA11y({ voiceReader: true })
    setNotice('')
    action()
  }

  const readerStatus = !readerSupported ? 'Not available in this browser' : speaking ? 'Reading…' : settings.voiceReader ? 'Ready' : 'Off'
  const readerOff = !readerSupported || !settings.voiceReader
  const changes = countChanges(settings)

  return (
    <>
      <ColorBlindFilters />
      {settings.readingGuide && <ReadingGuide />}
      {settings.readingMask && <ReadingMask />}

      <div ref={root} className="a11y" data-a11y-ui="">
        {open && <div className="a11y-scrim" aria-hidden="true" onClick={close} />}

        <aside id="a11y-panel" className="a11y-panel" role="dialog" aria-modal={open} aria-labelledby="a11y-title" hidden={!open}>
          <header className="a11y-panel__head">
            <div>
              <span className="label">Form A-11 · Reading settings</span>
              <h2 id="a11y-title" className="a11y-panel__title">
                Accessibility
              </h2>
            </div>
            <button ref={closeBtn} type="button" className="a11y-panel__close" onClick={close} aria-label="Close accessibility settings">
              <CloseIcon />
            </button>
          </header>

          <div className="a11y-panel__body">
            <section className="a11y-group" aria-labelledby="a11y-g1">
              <h3 id="a11y-g1" className="a11y-group__title">
                <span>01</span> Read aloud
              </h3>
              <SettingRow label="Voice reader" setting="voiceReader" hint={readerStatus} disabled={!readerSupported} />
              <div className="a11y-cmds">
                <button type="button" disabled={!readerSupported} onClick={() => startReading(readPage)}>
                  Read page
                </button>
                <button
                  type="button"
                  disabled={!readerSupported}
                  onClick={() => startReading(() => !readSelection() && setNotice('Select some text first.'))}
                >
                  Read selection
                </button>
                <button type="button" disabled={!speaking} onClick={stopReading}>
                  Stop
                </button>
              </div>
              {notice && (
                <p className="a11y-notice" role="status">
                  {notice}
                </p>
              )}
              <SettingRow label="Read text when I click it" setting="clickToRead" disabled={readerOff} />
              <SettingRow label="Read controls on keyboard focus" setting="readFocus" disabled={readerOff} />
            </section>

            <section className="a11y-group" aria-labelledby="a11y-g2">
              <h3 id="a11y-g2" className="a11y-group__title">
                <span>02</span> Text
              </h3>
              <div className="a11y-field">
                <span className="a11y-row__label" id="a11y-size">
                  Text size
                </span>
                <div className="a11y-sizes" role="radiogroup" aria-labelledby="a11y-size">
                  {FONT_SIZES.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      role="radio"
                      aria-checked={settings.fontSize === f.value}
                      aria-label={f.name}
                      onClick={() => updateA11y({ fontSize: f.value })}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <SettingRow label="Dyslexia-friendly font" setting="dyslexiaFont" hint="Uses OpenDyslexic." />
              <SettingRow label="More space between letters and lines" setting="textSpacing" />
              <SettingRow label="Shorter lines" setting="shortLines" hint="Makes long paragraphs narrower." />
              <SettingRow label="Align text to the left" setting="alignLeft" />
            </section>

            <section className="a11y-group" aria-labelledby="a11y-g3">
              <h3 id="a11y-g3" className="a11y-group__title">
                <span>03</span> Color
              </h3>
              <SettingRow label="High contrast" setting="highContrast" />
              <SettingRow label="Highlight links" setting="highlightLinks" />
              <div className="a11y-field a11y-field--stack">
                <span className="a11y-row__label" id="a11y-color">
                  Color filter
                </span>
                <div className="a11y-colors" role="radiogroup" aria-labelledby="a11y-color">
                  {COLOR_MODES.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      role="radio"
                      aria-checked={settings.colorMode === m.value}
                      className={`a11y-color a11y-color--${m.value}`}
                      onClick={() => updateA11y({ colorMode: m.value })}
                    >
                      <span className="a11y-color__swatch" aria-hidden="true" />
                      {m.name}
                    </button>
                  ))}
                </div>
                <span className="a11y-row__hint">Color-blind filters are a visual aid, not a diagnostic tool.</span>
              </div>
            </section>

            <section className="a11y-group" aria-labelledby="a11y-g4">
              <h3 id="a11y-g4" className="a11y-group__title">
                <span>04</span> Focus
              </h3>
              <SettingRow label="Big cursor" setting="bigCursor" />
              <SettingRow label="Reading guide" setting="readingGuide" hint="A line under the text you are reading." />
              <SettingRow label="Reading mask" setting="readingMask" hint="Darkens the screen except the part you read." />
              <SettingRow label="Highlight headings" setting="highlightHeadings" />
              <SettingRow label="Strong keyboard focus" setting="strongFocus" />
              <SettingRow label="Stop animations" setting="stopAnimations" />
              <SettingRow label="Hide decorations" setting="hideDecorations" hint="Hides barcodes and big outline numbers." />
            </section>
          </div>

          <footer className="a11y-panel__foot">
            <span className="label">{changes ? `${changes} change${changes > 1 ? 's' : ''} saved on this device` : 'Default settings'}</span>
            <button type="button" className="a11y-reset" onClick={resetA11y} disabled={!changes}>
              Reset
            </button>
          </footer>
        </aside>

        <button
          ref={fab}
          type="button"
          className="fab fab--a11y"
          aria-label="Accessibility settings"
          aria-expanded={open}
          aria-controls="a11y-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <AccessibilityIcon />
        </button>
      </div>
    </>
  )
}
