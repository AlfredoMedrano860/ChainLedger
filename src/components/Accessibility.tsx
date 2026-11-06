import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULTS, resetA11y, updateA11y, useA11y, type BoolSetting, type ColorMode, type FontSize } from '../lib/a11y'
import {
  accessibleName,
  readableFromClick,
  readerSupported,
  readPage,
  readSelection,
  speakText,
  stopReading,
  useSpeaking,
} from '../lib/voiceReader'

const FONT_SIZES: { value: FontSize; label: string; name: string }[] = [
  { value: 'normal', label: 'A', name: 'Normal' },
  { value: 'large', label: 'A+', name: 'Large' },
  { value: 'xlarge', label: 'A++', name: 'Extra large' },
  { value: 'xxlarge', label: 'A+++', name: 'Largest' },
]

const COLOR_MODES: { value: ColorMode; name: string }[] = [
  { value: 'normal', name: 'Natural' },
  { value: 'monochrome', name: 'Mono' },
  { value: 'low-saturation', name: 'Soft' },
  { value: 'high-saturation', name: 'Strong' },
  { value: 'warm', name: 'Warm' },
  { value: 'protanopia', name: 'Protanopia' },
  { value: 'deuteranopia', name: 'Deuteranopia' },
  { value: 'tritanopia', name: 'Tritanopia' },
]

// Corrección para daltonismo (daltonize).
const COLOR_BLIND_FILTERS: Record<string, string> = {
  protanopia: '1 0 0 0 0  .4789 .4769 .0442 0 0  .5973 -.6887 1.0914 0 0  0 0 0 1 0',
  deuteranopia: '1.4366 -.6314 .1948 0 0  0 1 0 0 0  -.1842 .1863 .9979 0 0  0 0 0 1 0',
  tritanopia: '.7412 -.4072 .666 0 0  .0751 .5852 .3397 0 0  0 0 1 0 0  0 0 0 1 0',
}

export function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="4.4" r="2.2" fill="currentColor" />
      <path
        d="M4.5 8.6 12 10l7.5-1.4M12 10v4.8m0 0-3.4 6M12 14.8l3.4 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

// Fila de formulario: toda la fila es el interruptor.
function Row({ label, setting, hint, disabled = false }: { label: string; setting: BoolSetting; hint?: string; disabled?: boolean }) {
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

// Sigue la altura del puntero o del elemento con foco y la deja en --guide-y.
function useGuideY() {
  const layer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = layer.current
    if (!el) return
    const set = (y: number) => el.style.setProperty('--guide-y', `${y}px`)
    set(window.innerHeight / 2)
    const onMove = (e: PointerEvent) => set(e.clientY)
    const onFocus = (e: FocusEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('[data-a11y-ui]')) return
      const r = e.target.getBoundingClientRect()
      set(r.top + r.height / 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    window.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('focusin', onFocus)
    }
  }, [])
  return layer
}

function ReadingGuide() {
  const layer = useGuideY()
  return (
    <div ref={layer} className="reading-guide" aria-hidden="true" data-a11y-ui="">
      <span />
    </div>
  )
}

function ReadingMask() {
  const layer = useGuideY()
  return (
    <div ref={layer} className="reading-mask" aria-hidden="true" data-a11y-ui="">
      <span className="reading-mask__top" />
      <span className="reading-mask__window" />
      <span className="reading-mask__bottom" />
    </div>
  )
}

// Con el lector encendido: lee el bloque al que se hace clic y lo que recibe foco con el teclado.
function useReaderListeners() {
  const { voiceReader, clickToRead, readFocus } = useA11y()

  useEffect(() => {
    if (!voiceReader || !clickToRead) return
    const onClick = (e: MouseEvent) => {
      const block = readableFromClick(e.target)
      if (block) speakText((block as HTMLElement).innerText, block)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [voiceReader, clickToRead])

  useEffect(() => {
    if (!voiceReader || !readFocus) return
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null
      if (!el?.matches?.(':focus-visible') || el.closest('[data-a11y-ui]')) return
      const name = accessibleName(el)
      if (name) speakText(name)
    }
    document.addEventListener('focusin', onFocus)
    return () => document.removeEventListener('focusin', onFocus)
  }, [voiceReader, readFocus])

  useEffect(() => {
    if (!voiceReader) stopReading()
  }, [voiceReader])
}

export function Accessibility() {
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

  // Escape cierra, Tab queda dentro del panel y un clic afuera lo cierra.
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

  const startReading = (action: () => void) => {
    if (!settings.voiceReader) updateA11y({ voiceReader: true })
    setNotice('')
    action()
  }

  const status = !readerSupported ? 'Not available in this browser' : speaking ? 'Reading…' : settings.voiceReader ? 'Ready' : 'Off'
  const readerOff = !readerSupported || !settings.voiceReader
  const changed = Object.keys(DEFAULTS).filter((k) => settings[k as keyof typeof DEFAULTS] !== DEFAULTS[k as keyof typeof DEFAULTS]).length

  return (
    <>
      <svg className="a11y-filters" aria-hidden="true" focusable="false">
        {Object.entries(COLOR_BLIND_FILTERS).map(([id, values]) => (
          <filter key={id} id={`cl-${id}`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={values} />
          </filter>
        ))}
      </svg>
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
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </button>
          </header>

          <div className="a11y-panel__body">
            <section className="a11y-group" aria-labelledby="a11y-g1">
              <h3 id="a11y-g1" className="a11y-group__title">
                <span>01</span> Read aloud
              </h3>
              <Row label="Voice reader" setting="voiceReader" hint={status} disabled={!readerSupported} />
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
              <Row label="Read text when I click it" setting="clickToRead" disabled={readerOff} />
              <Row label="Read controls on keyboard focus" setting="readFocus" disabled={readerOff} />
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
              <Row label="Dyslexia-friendly font" setting="dyslexiaFont" hint="Uses OpenDyslexic." />
              <Row label="More space between letters and lines" setting="textSpacing" />
              <Row label="Shorter lines" setting="shortLines" hint="Makes long paragraphs narrower." />
              <Row label="Align text to the left" setting="alignLeft" />
            </section>

            <section className="a11y-group" aria-labelledby="a11y-g3">
              <h3 id="a11y-g3" className="a11y-group__title">
                <span>03</span> Color
              </h3>
              <Row label="High contrast" setting="highContrast" />
              <Row label="Highlight links" setting="highlightLinks" />
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
              <Row label="Big cursor" setting="bigCursor" />
              <Row label="Reading guide" setting="readingGuide" hint="A line under the text you are reading." />
              <Row label="Reading mask" setting="readingMask" hint="Darkens the screen except the part you read." />
              <Row label="Highlight headings" setting="highlightHeadings" />
              <Row label="Strong keyboard focus" setting="strongFocus" />
              <Row label="Stop animations" setting="stopAnimations" />
              <Row label="Hide decorations" setting="hideDecorations" hint="Hides barcodes and big outline numbers." />
            </section>
          </div>

          <footer className="a11y-panel__foot">
            <span className="label">{changed ? `${changed} change${changed > 1 ? 's' : ''} saved on this device` : 'Default settings'}</span>
            <button type="button" className="a11y-reset" onClick={resetA11y} disabled={!changed}>
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
