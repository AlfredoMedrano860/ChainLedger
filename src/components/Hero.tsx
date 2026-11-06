import { LedgerChain } from './LedgerChain'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" className="hero__mega">
          ChainLedger
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__sub">
              <span>Private blockchain for corporate</span> <span>auditing and inventory</span>
            </p>
            <p className="hero__lead">
              A simple guide to how companies use a private blockchain to keep their records safe, easy to check, and impossible to
              change in secret.
            </p>
            <p className="hero__for">
              <span className="label">For</span>
              Students of technology and business, and young workers who like new technologies.
            </p>
            <div className="hero__actions">
              <a href="#introduction" className="btn btn--down">
                Start reading
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                  <path d="M12 4v16m-7-7 7 7 7-7" />
                </svg>
              </a>
              <a href="#glossary" className="btn btn--line">
                Glossary
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <LedgerChain />
        </div>
      </div>
    </section>
  )
}
