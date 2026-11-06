/**
 * @file Lector de voz con la voz del navegador (Web Speech API).
 *
 * Lee la página, un texto seleccionado o un bloque suelto, y resalta en pantalla el
 * fragmento que se está leyendo con la clase `a11y-reading`. Solo hay una lectura a la
 * vez: empezar otra detiene la anterior.
 *
 * Funciona en los navegadores que tienen `speechSynthesis` (Chrome, Edge, Safari y
 * Firefox en escritorio). Si no existe, `readerSupported` es `false` y el panel de
 * accesibilidad desactiva las opciones del lector.
 */
import { useSyncExternalStore } from 'react'

/** Elementos que se consideran texto legible. */
const READABLE = 'h1, h2, h3, h4, p, li, dt, dd, blockquote, figcaption'

/** Clase que marca el fragmento que se está leyendo. */
const HIGHLIGHT = 'a11y-reading'

/** `true` si el navegador puede leer en voz alta. */
export const readerSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

let speaking = false
let current: Element | null = null
let session = 0
const listeners = new Set<() => void>()

/**
 * Actualiza si se está leyendo y avisa a los componentes suscritos.
 *
 * @param value - Nuevo estado.
 */
function setSpeaking(value: boolean) {
  if (speaking === value) return
  speaking = value
  listeners.forEach((l) => l())
}

/**
 * Mueve el resaltado al elemento que se está leyendo.
 *
 * @param el - Elemento a resaltar, o `null` para quitar el resaltado.
 */
function highlight(el: Element | null) {
  current?.classList.remove(HIGHLIGHT)
  current = el
  el?.classList.add(HIGHLIGHT)
}

/**
 * Junta los espacios repetidos y quita los de los extremos.
 *
 * @param text - Texto original.
 * @returns Texto limpio.
 */
const clean = (text: string) => text.replace(/\s+/g, ' ').trim()

/**
 * Indica si un elemento no se debe leer: está oculto, es solo para lectores de
 * pantalla o forma parte de los controles de accesibilidad.
 *
 * @param el - Elemento a revisar.
 * @returns `true` si se debe saltar.
 */
function isHidden(el: Element) {
  if (el.closest('[aria-hidden="true"], [inert], [data-a11y-ui], .sr-only')) return true
  const rect = el.getBoundingClientRect()
  return rect.width === 0 && rect.height === 0
}

/** Detiene cualquier lectura en curso. */
export function stopReading() {
  session++
  if (readerSupported) window.speechSynthesis.cancel()
  highlight(null)
  setSpeaking(false)
}

/**
 * Lee una lista de fragmentos en orden. Cada fragmento se resalta mientras se lee y,
 * si está fuera de la pantalla, se desplaza hasta él.
 *
 * @param parts - Fragmentos con su elemento (para resaltar) y su texto.
 */
function speak(parts: { el: Element | null; text: string }[]) {
  stopReading()
  if (!readerSupported || !parts.length) return
  const id = session
  const next = (i: number) => {
    if (id !== session) return
    const part = parts[i]
    if (!part) {
      highlight(null)
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(part.text)
    utterance.lang = 'en-US'
    utterance.onstart = () => {
      if (id !== session) return
      highlight(part.el)
      const rect = part.el?.getBoundingClientRect()
      if (rect && (rect.top < 0 || rect.bottom > window.innerHeight)) part.el?.scrollIntoView({ block: 'center' })
    }
    utterance.onend = () => next(i + 1)
    utterance.onerror = () => next(i + 1)
    window.speechSynthesis.speak(utterance)
  }
  setSpeaking(true)
  next(0)
}

/**
 * Lee un texto suelto.
 *
 * @param text - Texto a leer.
 * @param el - Elemento a resaltar mientras se lee (opcional).
 */
export function speakText(text: string, el: Element | null = null) {
  const value = clean(text)
  if (value) speak([{ el, text: value }])
}

/** Lee la página desde lo que se ve en pantalla hasta el final, incluido el footer. */
export function readPage() {
  const root = document.getElementById('main') ?? document.body
  const all = Array.from(root.querySelectorAll(READABLE)).concat(Array.from(document.querySelectorAll(`footer :is(${READABLE})`)))
  const parts = all
    .filter((el) => !isHidden(el) && !el.querySelector(READABLE) && el.getBoundingClientRect().bottom > 0)
    .map((el) => ({ el, text: clean((el as HTMLElement).innerText) }))
    .filter((p) => p.text)
  speak(parts)
}

/**
 * Lee el texto que la persona tiene seleccionado.
 *
 * @returns `false` si no hay nada seleccionado.
 */
export function readSelection(): boolean {
  const text = window.getSelection()?.toString() ?? ''
  if (!clean(text)) return false
  speakText(text)
  return true
}

/**
 * Busca el bloque de texto donde se hizo clic. Ignora enlaces, botones y campos.
 *
 * @param target - Elemento donde ocurrió el clic.
 * @returns El bloque legible más cercano, o `null`.
 */
export function readableFromClick(target: EventTarget | null) {
  const el = target instanceof Element ? target : null
  if (!el || el.closest('a, button, input, textarea, select, [data-a11y-ui]')) return null
  const block = el.closest(READABLE)
  return block && !isHidden(block) ? block : null
}

/**
 * Obtiene el nombre que se anuncia para un control (su `aria-label`, su texto o su `title`).
 *
 * @param el - Control que recibió el foco.
 * @returns Nombre a leer.
 */
export function accessibleName(el: HTMLElement) {
  return clean(el.getAttribute('aria-label') ?? (el.innerText || el.getAttribute('title') || ''))
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

/**
 * Hook de React que indica si el lector está hablando en este momento.
 *
 * @returns `true` mientras hay una lectura en curso.
 */
export function useSpeaking() {
  return useSyncExternalStore(subscribe, () => speaking)
}
