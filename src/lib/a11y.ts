/**
 * @file Estado global de las preferencias de accesibilidad.
 *
 * Guarda las opciones del panel de accesibilidad, las aplica en `<html>` como clases
 * y atributos, y las recuerda en `localStorage` para la próxima visita.
 *
 * Cómo se usa:
 *  - En un componente: `const settings = useA11y()` para leer las opciones.
 *  - Para cambiarlas: `updateA11y({ highContrast: true })` o `resetA11y()`.
 *  - Los efectos visuales están en `components/accessibility/accessibility-effects.css`.
 *
 * Para agregar una opción nueva: añádela a `A11ySettings` y a `DEFAULTS`; si es visual,
 * agrégale una clase en `CLASSES` y su regla en el CSS de efectos.
 */
import { useSyncExternalStore } from 'react'

/** Tamaños de texto disponibles. */
export type FontSize = 'normal' | 'large' | 'xlarge' | 'xxlarge'

/** Filtros de color disponibles (los tres últimos corrigen daltonismo). */
export type ColorMode =
  | 'normal'
  | 'monochrome'
  | 'low-saturation'
  | 'high-saturation'
  | 'warm'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'

/** Todas las preferencias de accesibilidad. */
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
  /** Activa el lector de voz. */
  voiceReader: boolean
  /** Con el lector activo, lee el párrafo al que se le hace clic. */
  clickToRead: boolean
  /** Con el lector activo, lee el nombre del control que recibe el foco del teclado. */
  readFocus: boolean
}

/** Nombre de cualquier opción que sea de tipo sí/no. */
export type BoolSetting = { [K in keyof A11ySettings]: A11ySettings[K] extends boolean ? K : never }[keyof A11ySettings]

/** Valores iniciales (todo apagado, salvo las dos opciones del lector que dependen de él). */
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

const STORAGE_KEY = 'chainledger:a11y'
const FONT_SIZES: FontSize[] = ['normal', 'large', 'xlarge', 'xxlarge']
const COLOR_MODES: ColorMode[] = ['normal', 'monochrome', 'low-saturation', 'high-saturation', 'warm', 'protanopia', 'deuteranopia', 'tritanopia']

/** Clase que se pone en `<html>` para cada opción visual de tipo sí/no. */
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

/**
 * Lee las preferencias guardadas y descarta cualquier valor que no sea válido.
 *
 * @returns Preferencias listas para usar (los valores por defecto si no hay nada guardado).
 */
function load(): A11ySettings {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
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

/**
 * Aplica las preferencias en `<html>` para que el CSS de efectos las use.
 *
 * @param s - Preferencias a aplicar.
 */
function apply(s: A11ySettings) {
  const html = document.documentElement
  html.dataset.a11yFont = s.fontSize
  html.dataset.a11yColor = s.colorMode
  for (const [key, cls] of Object.entries(CLASSES) as [BoolSetting, string][]) html.classList.toggle(cls, s[key])
}

let state: A11ySettings = typeof window === 'undefined' ? { ...DEFAULTS } : load()
const listeners = new Set<() => void>()
if (typeof window !== 'undefined') apply(state)

/**
 * Reemplaza el estado, lo aplica, lo guarda y avisa a los componentes suscritos.
 * Si el navegador no permite guardar (modo privado), los cambios duran solo esta visita.
 *
 * @param next - Estado nuevo.
 */
function commit(next: A11ySettings) {
  state = next
  apply(state)
  try {
    if (JSON.stringify(state) === JSON.stringify(DEFAULTS)) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Sin almacenamiento disponible: se sigue funcionando sin guardar.
  }
  listeners.forEach((l) => l())
}

/**
 * Cambia una o varias preferencias.
 *
 * @param patch - Solo las opciones que cambian, por ejemplo `{ fontSize: 'large' }`.
 */
export const updateA11y = (patch: Partial<A11ySettings>) => commit({ ...state, ...patch })

/** Vuelve todas las preferencias a sus valores iniciales. */
export const resetA11y = () => commit({ ...DEFAULTS })

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

/**
 * Hook de React que devuelve las preferencias actuales y vuelve a renderizar el
 * componente cada vez que cambian.
 *
 * @returns Preferencias de accesibilidad.
 */
export function useA11y() {
  return useSyncExternalStore(subscribe, () => state)
}

/**
 * Indica si hay que evitar animaciones, ya sea por la opción del panel o por la
 * configuración del sistema operativo.
 *
 * @returns `true` si se deben reducir las animaciones.
 */
export function prefersReducedMotion() {
  return state.stopAnimations || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
