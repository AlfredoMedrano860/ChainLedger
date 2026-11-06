/**
 * @file Enlace que abre otro sitio en una pestaña nueva.
 */
import type { ReactNode } from 'react'
import { ArrowIcon } from '../icons/Icons'

/** Props de {@link ExternalLink}. */
interface ExternalLinkProps {
  /** Dirección del otro sitio. */
  href: string
  /** Texto visible del enlace. */
  children: ReactNode
  /**
   * Texto extra solo para lectores de pantalla, para que el enlace se entienda fuera
   * de contexto. Siempre se le agrega "(opens in a new tab)".
   */
  srLabel?: string
  /** Clase del enlace. */
  className?: string
  /** Clase de la flecha ↗. */
  arrowClassName?: string
}

/**
 * Enlace con `target="_blank"` y `rel="noopener noreferrer"`, una flecha ↗ al final y
 * un aviso para lectores de pantalla de que se abre en otra pestaña. Se usa para los
 * perfiles de LinkedIn en Contact y en el footer.
 *
 * @example
 * <ExternalLink href={author.linkedin} srLabel={`profile of ${author.name}`}>LinkedIn</ExternalLink>
 */
export function ExternalLink({ href, children, srLabel, className, arrowClassName }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {srLabel ? `${srLabel} ` : ''}(opens in a new tab)</span>
      <ArrowIcon direction="up-right" className={arrowClassName} />
    </a>
  )
}
