// Marca: dos eslabones cuadrados, como el sello de una caja de envío.
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="13" y="13" width="17" height="17" fill="var(--signal)" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  )
}
