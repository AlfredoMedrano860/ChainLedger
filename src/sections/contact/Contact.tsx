/**
 * @file Sección 08 · Contact.
 *
 * Autor: José Alfredo Medrano Saravia. Muestra los datos del curso, los autores y el
 * correo del grupo, según el esquema de la propuesta (nombres y universidad, curso,
 * profesora y un enlace de correo para preguntas y comentarios).
 */
import { ExternalLink } from '../../components/ExternalLink/ExternalLink'
import { Fields } from '../../components/Fields/Fields'
import { ArrowIcon } from '../../components/icons/Icons'
import { MailEnvelope } from '../../components/illustrations/MailEnvelope'
import { Section } from '../../components/Section/Section'
import { AUTHORS, PROJECT } from '../../data/site'
import { ContactForm } from './ContactForm'
import './contact.css'

/**
 * Sección de contacto en dos columnas:
 *  - Izquierda: invitación a escribir con la ilustración {@link MailEnvelope}, correo
 *    del grupo, ficha del curso y autores (con carné, secciones que escribió y
 *    LinkedIn si lo tiene).
 *  - Derecha: el formulario {@link ContactForm}.
 */
export function Contact() {
  return (
    <Section id="contact" title="Contact Us">
      <div className="contact">
        <div className="contact__info">
          <div className="contact__intro">
            <p className="contact__lede">
              Do you have a question about private blockchain, auditing, or inventory control? Do you want to share a comment
              about this site? Write to us. We are happy to answer.
            </p>
            <MailEnvelope className="contact__illo" />
          </div>

          <a className="contact__email" href={`mailto:${PROJECT.email}`}>
            <span className="label">Group email</span>
            <span className="contact__email-value">{PROJECT.email}</span>
            <ArrowIcon className="contact__email-arrow" />
          </a>

          <Fields
            className="contact__facts"
            items={[
              { label: 'University', value: PROJECT.university },
              { label: 'Course', value: PROJECT.course },
              { label: 'Professor', value: PROJECT.professor },
              { label: 'Delivery', value: PROJECT.delivery },
            ]}
          />

          <h3 className="contact__subtitle">Authors</h3>
          <ul className="contact__authors">
            {AUTHORS.map((a) => (
              <li key={a.id} className="author">
                <span className="label">Carné · {a.id}</span>
                <span className="author__name">{a.name}</span>
                <span className="author__wrote">Wrote: {a.wrote}</span>
                {a.linkedin && (
                  <ExternalLink className="author__link" href={a.linkedin} srLabel={`profile of ${a.name}`}>
                    LinkedIn
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
