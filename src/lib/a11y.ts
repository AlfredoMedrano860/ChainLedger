import { useSyncExternalStore } from 'react'

// Preferencias de accesibilidad (une las opciones de Savia y Noctivulp).
// Se guardan en este navegador y se aplican como clases/atributos en <html>.

export type FontSize = 'normal' | 'large' | 'xlarge' | 'xxlarge'
export type ColorMode =
  | 'normal'
  | 'monochrome'
  | 'low-saturation'
  | 'high-saturation'
  | 'warm'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'

export interface A11ySettings {
  fontSize: FontSize
  colorMode: ColorMode
  highContrast: boolean
  highlightLinks: boolean
  dyslexiaFont: boolean
  textSpacing: boolean
  shortLines: boolean
  alignLeft: boolean
  bigCursor: boolean
  readingGuide: boolean
  readingMask: boolean
  highlightHeadings: boolean
  strongFocus: boolean
  stopAnimations: boolean
  hideDecorations: boolean
  voiceReader: boolean
  clickToRead: boolean
  readFocus: boolean
}

export type BoolSetting = { [K in keyof A11ySettings]: A11ySettings[K] extends boolean ? K : never }[keyof A11ySettings]

export const DEFAULTS: A11ySettings = {
  fontSize: 'normal',
  colorMode: 'normal',
  highContrast: false,
  highlightLinks: false,
  dyslexiaFont: false,
  textSpacing: false,
  shortLines: false,
  alignLeft: false,
  bigCursor: false,
  readingGuide: false,
  readingMask: false,
  highlightHeadings: false,
  strongFocus: false,
  stopAnimations: false,
  hideDecorations: false,
  voiceReader: false,
  clickToRead: true,
  readFocus: true,
}

const KEY = 'chainledger:a11y'
const FONT_SIZES: FontSize[] = ['normal', 'large', 'xlarge', 'xxlarge']
const COLOR_MODES: ColorMode[] = ['normal', 'monochrome', 'low-saturation', 'high-saturation', 'warm', 'protanopia', 'deuteranopia', 'tritanopia']

// Clase en <html> para cada ajuste booleano visual.
const CLASSES: Partial<Record<BoolSetting, string>> = {
  highContrast: 'a11y-contrast',
  highlightLinks: 'a11y-links',
  dyslexiaFont: 'a11y-dyslexia',
  textSpacing: 'a11y-spacing',
  shortLines: 'a11y-short-lines',
  alignLeft: 'a11y-align-left',
  bigCursor: 'a11y-big-cursor',
  highlightHeadings: 'a11y-headings',
  strongFocus: 'a11y-focus',
  stopAnimations: 'a11y-reduce-motion',
  hideDecorations: 'a11y-hide-decor',
}

function load(): A11ySettings {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    if (typeof raw !== 'object' || raw === null) return { ...DEFAULTS }
    const saved = raw as Partial<A11ySettings>
    const out = { ...DEFAULTS }
    for (const key of Object.keys(DEFAULTS) as (keyof A11ySettings)[]) {
      if (typeof DEFAULTS[key] === 'boolean' && typeof saved[key] === 'boolean') (out[key] as boolean) = saved[key] as boolean
    }
    if (FONT_SIZES.includes(saved.fontSize as FontSize)) out.fontSize = saved.fontSize as FontSize
    if (COLOR_MODES.includes(saved.colorMode as ColorMode)) out.colorMode = saved.colorMode as ColorMode
    return out
  } catch {
    return { ...DEFAULTS }
  }
}

function apply(s: A11ySettings) {
  const html = document.documentElement
  html.dataset.a11yFont = s.fontSize
  html.dataset.a11yColor = s.colorMode
  for (const [key, cls] of Object.entries(CLASSES) as [BoolSetting, string][]) html.classList.toggle(cls, s[key])
}

let state: A11ySettings = typeof window === 'undefined' ? { ...DEFAULTS } : load()
const listeners = new Set<() => void>()
if (typeof window !== 'undefined') apply(state)

function commit(next: A11ySettings) {
  state = next
  apply(state)
  try {
    if (JSON.stringify(state) === JSON.stringify(DEFAULTS)) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // sin almacenamiento (modo privado): los cambios duran solo esta visita
  }
  listeners.forEach((l) => l())
}

export const updateA11y = (patch: Partial<A11ySettings>) => commit({ ...state, ...patch })
export const resetA11y = () => commit({ ...DEFAULTS })

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useA11y() {
  return useSyncExternalStore(subscribe, () => state)
}

export function prefersReducedMotion() {
  return state.stopAnimations || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
