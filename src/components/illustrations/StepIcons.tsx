/**
 * @file Íconos de los cuatro pasos del diagrama de Development.
 *
 * Mismo trazo que el resto del sistema (2.5 px, puntas cuadradas) y un detalle en
 * rojo de señal. Son decorativos: el nombre del paso va en el texto.
 */
import type { ReactNode } from 'react'

/** Pasos que tienen ícono. */
export type StepIconName = 'record' | 'link' | 'copy' | 'check'

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }

/** Dibujo de cada ícono (contenido del SVG de 48×48). */
const ICONS: Record<StepIconName, ReactNode> = {
  record: (
    <>
      <rect x="10" y="9" width="28" height="34" {...STROKE} />
      <rect x="18" y="5" width="12" height="8" fill="var(--signal)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 22h16M16 29h16M16 36h9" {...STROKE} />
    </>
  ),
  link: (
    <>
      <rect x="4" y="12" width="24" height="14" {...STROKE} />
      <rect x="20" y="22" width="24" height="14" fill="var(--signal)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 22v4h8" {...STROKE} />
    </>
  ),
  copy: (
    <>
      <rect x="5" y="5" width="22" height="22" {...STROKE} />
      <rect x="13" y="13" width="22" height="22" fill="var(--paper)" stroke="currentColor" strokeWidth="2.5" />
      <rect x="21" y="21" width="22" height="22" fill="var(--signal)" stroke="currentColor" strokeWidth="2.5" />
    </>
  ),
  check: (
    <>
      <circle cx="20" cy="20" r="13" {...STROKE} />
      <path d="m30 30 12 12" {...STROKE} strokeWidth={3.5} />
      <path d="m14 20 4.5 4.5L27 16" fill="none" stroke="var(--signal-ink)" strokeWidth="3" strokeLinecap="square" />
    </>
  ),
}

/**
 * Ícono de un paso del diagrama.
 *
 * @param props.name - Paso: `record`, `link`, `copy` o `check`.
 * @param props.className - Clase para darle tamaño.
 */
export function StepIcon({ name, className }: { name: StepIconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}
