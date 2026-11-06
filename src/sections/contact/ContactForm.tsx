/**
 * @file Formulario de preguntas que abre la app de correo con el mensaje ya escrito.
 */
import { useId, useState, type FormEvent } from 'react'
import { ArrowIcon } from '../../components/icons/Icons'
import { PROJECT } from '../../data/site'

/**
 * Arma un enlace `mailto:` con asunto y cuerpo.
 *
 * @param name - Nombre de quien escribe.
 * @param email - Correo de quien escribe (va en el cuerpo para poder responderle).
 * @param message - Pregunta o comentario.
 * @returns Enlace listo para abrir la app de correo.
 */
function buildMailto(name: string, email: string, message: string) {
  const subject = `${PROJECT.name} question from ${name}`
  const body = `${message}\n\n—\n${name}\n${email}`
  return `mailto:${PROJECT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Formulario con nombre, correo y mensaje. El sitio no tiene servidor, así que al
 * enviarlo se abre la app de correo de la persona con el mensaje listo para mandar a
 * `PROJECT.email` (definido en `data/site.ts`).
 *
 * Los campos son obligatorios y el navegador valida el formato del correo antes de
 * enviar. Después de enviar se muestra un aviso por si la app de correo no se abrió.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false)
  const id = useId()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    window.location.href = buildMailto(name, email, message)
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} aria-labelledby={`${id}-title`}>
      <div className="contact-form__head">
        <span className="label">Form C-08 · Questions</span>
        <h3 id={`${id}-title`} className="contact-form__title">
          Send us a question
        </h3>
      </div>

      <div className="contact-form__field">
        <label className="label" htmlFor={`${id}-name`}>
          Full name
        </label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required />
      </div>
      <div className="contact-form__field">
        <label className="label" htmlFor={`${id}-email`}>
          Your email
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
      </div>
      <div className="contact-form__field">
        <label className="label" htmlFor={`${id}-message`}>
          Message
        </label>
        <textarea id={`${id}-message`} name="message" rows={5} required />
      </div>

      <button type="submit" className="btn contact-form__submit">
        Send message
        <ArrowIcon />
      </button>

      <p className="contact-form__note" role="status">
        {sent ? (
          <>
            Your email app should open now. If it does not, write to <a href={`mailto:${PROJECT.email}`}>{PROJECT.email}</a>.
          </>
        ) : (
          'This opens your email app with the message ready to send.'
        )}
      </p>
    </form>
  )
}
