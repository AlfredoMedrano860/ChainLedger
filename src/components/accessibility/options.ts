/**
 * @file Listas de opciones que muestra el panel de accesibilidad.
 */
import type { ColorMode, FontSize } from '../../lib/a11y'

/** Botones de tamaño de texto: valor, texto del botón y nombre que se anuncia. */
export const FONT_SIZES: { value: FontSize; label: string; name: string }[] = [
  { value: 'normal', label: 'A', name: 'Normal' },
  { value: 'large', label: 'A+', name: 'Large' },
  { value: 'xlarge', label: 'A++', name: 'Extra large' },
  { value: 'xxlarge', label: 'A+++', name: 'Largest' },
]

/** Filtros de color con su nombre visible. */
export const COLOR_MODES: { value: ColorMode; name: string }[] = [
  { value: 'normal', name: 'Natural' },
  { value: 'monochrome', name: 'Mono' },
  { value: 'low-saturation', name: 'Soft' },
  { value: 'high-saturation', name: 'Strong' },
  { value: 'warm', name: 'Warm' },
  { value: 'protanopia', name: 'Protanopia' },
  { value: 'deuteranopia', name: 'Deuteranopia' },
  { value: 'tritanopia', name: 'Tritanopia' },
]

/**
 * Matrices de color para corregir daltonismo (método "daltonize"): los colores que
 * una persona no distingue se pasan a canales que sí distingue.
 *
 * Se usan como filtros SVG con id `cl-{nombre}` (ver `ColorBlindFilters`), y el CSS
 * los aplica con `filter: url(#cl-protanopia)`.
 */
export const COLOR_BLIND_FILTERS: Record<string, string> = {
  protanopia: '1 0 0 0 0  .4789 .4769 .0442 0 0  .5973 -.6887 1.0914 0 0  0 0 0 1 0',
  deuteranopia: '1.4366 -.6314 .1948 0 0  0 1 0 0 0  -.1842 .1863 .9979 0 0  0 0 0 1 0',
  tritanopia: '.7412 -.4072 .666 0 0  .0751 .5852 .3397 0 0  0 0 1 0 0  0 0 0 1 0',
}
