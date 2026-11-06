/**
 * @file Conecta el lector de voz con los clics y el foco del teclado.
 */
import { useEffect } from 'react'
import { useA11y } from '../../lib/a11y'
import { accessibleName, readableFromClick, speakText, stopReading } from '../../lib/voiceReader'

/**
 * Mientras el lector de voz está activo:
 *  - si `clickToRead` está activo, lee el párrafo o título al que se le hace clic;
 *  - si `readFocus` está activo, lee el nombre del enlace o botón que recibe el foco
 *    al navegar con el teclado (Tab).
 *
 * Al apagar el lector, detiene cualquier lectura en curso. Se llama una sola vez,
 * dentro del panel de accesibilidad.
 */
export function useReaderListeners() {
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
