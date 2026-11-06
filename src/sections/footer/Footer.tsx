/**
 * @file Footer del sitio.
 */
import { Barcode } from '../../components/Barcode/Barcode'
import { ExternalLink } from '../../components/ExternalLink/ExternalLink'
import { Fields } from '../../components/Fields/Fields'
import { LogoMark } from '../../components/Logo/LogoMark'
import { AUTHORS, PROJECT, SECTIONS, pad2 } from '../../data/site'
import { shortHash } from '../../lib/hash'
import './footer.css'

/** Hash fijo del sitio (nombre + curso + fecha) para el código de barras decorativo. */
const SITE_HASH = shortHash(`${PROJECT.name}|${PROJECT.course}|${PROJECT.date}`)

/**
 * Footer en fondo grafito con:
 *  - la marca grande y una descripción del sitio;
 *  - enlaces a las 8 secciones;
 *  - datos del proyecto (curso, profesora y fecha);
 *  - autores con su carné (con enlace a LinkedIn si lo tienen en data/site.ts);
 *  - un código de barras del sitio y la línea de créditos.
 *
 * Todos los datos salen de `data/site.ts`.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="footer__brand" aria-label={`${PROJECT.name}, go to the top`}>
            <LogoMark className="footer__mark" />
            {PROJECT.name}
          </a>
          <p className="footer__about">
            A student microsite about private blockchain for auditing and inventory control, made for the course {PROJECT.course}{' '}
            at the {PROJECT.university}.
          </p>
        </div>

        <div className="footer__grid">
          <nav className="footer__cell" aria-label="Footer">
            <h2 className="label">Sections</h2>
            <ul className="footer__links">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span>{pad2(i + 1)}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__cell">
            <h2 className="label">Project</h2>
            <Fields
              className="footer__facts"
              ruled={false}
              items={[
                { label: 'Course', value: PROJECT.course },
                { label: 'Professor', value: PROJECT.professor },
                { label: 'Date', value: PROJECT.date },
              ]}
            />
          </div>

          <div className="footer__cell">
            <h2 className="label">Authors</h2>
            <ul className="footer__authors">
              {AUTHORS.map((a) => (
                <li key={a.id}>
                  {a.linkedin ? (
                    <ExternalLink
                      className="footer__author footer__author--link"
                      arrowClassName="footer__external"
                      href={a.linkedin}
                      srLabel="on LinkedIn"
                    >
                      {a.name}
                    </ExternalLink>
                  ) : (
                    <span className="footer__author">{a.name}</span>
                  )}
                  <span className="label">{a.id}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__cell footer__tag">
            <Barcode value={SITE_HASH} className="footer__barcode" />
            <span className="footer__hash">{SITE_HASH}</span>
          </div>
        </div>

        <p className="footer__base">
          © {PROJECT.year} {AUTHORS.map((a) => a.name).join(' & ')} · {PROJECT.university}
        </p>
      </div>
    </footer>
  )
}
