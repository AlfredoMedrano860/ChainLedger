/**
 * @file Chatbot "Ask Blocky": botón flotante con la mascota y panel de conversación.
 *
 * Responde con la base de conocimiento de `data/chatKnowledge.ts` (sin IA y sin
 * servidor, ver `lib/chatbot.ts`). Cada respuesta puede traer un enlace a la sección
 * donde se explica más.
 */
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { SUGGESTIONS, type ChatLink } from '../../data/chatKnowledge'
import { FALLBACK_ANSWER, findAnswer } from '../../lib/chatbot'
import { ArrowIcon, CloseIcon } from '../icons/Icons'
import { Mascot, type MascotMood } from './Mascot'
import './chatbot.css'

/** Un mensaje de la conversación. */
interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  link?: ChatLink
}

/** Primer mensaje de Blocky al abrir el chat. */
const WELCOME = "Hi! I'm Blocky. Ask me about blockchain, auditing, or inventory, or pick a question below."

/** Tiempo que Blocky "piensa" antes de responder, en milisegundos. */
const THINK_MS = 550

/** Clave para recordar que la persona ya abrió el chat (y no volver a mostrar el globo). */
const SEEN_KEY = 'chainledger:chat-seen'

/**
 * Lee si la persona ya abrió el chat antes. Si el navegador no permite guardar, se
 * asume que no.
 *
 * @returns `true` si ya lo abrió.
 */
function wasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Botón flotante (abajo a la izquierda) con Blocky y un globo "Ask me!" la primera vez.
 * Con el panel abierto, el botón muestra una X en lugar de Blocky, para que no haya dos
 * mascotas a la vista (la del encabezado del panel es la que cambia de expresión).
 * Al pulsarlo se abre el panel de chat:
 *  - Escape lo cierra y devuelve el foco al botón.
 *  - Los mensajes nuevos se anuncian a lectores de pantalla (`aria-live`).
 *  - Las preguntas sugeridas se envían con un clic.
 *  - En celular, tocar un enlace de una respuesta cierra el panel para ver la sección.
 */
export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(wasSeen)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: WELCOME }])
  const [input, setInput] = useState('')
  const [mood, setMood] = useState<MascotMood>('idle')
  const [thinking, setThinking] = useState(false)
  const nextId = useRef(1)
  const listRef = useRef<HTMLOListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const timer = useRef(0)
  const id = useId()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, thinking])

  const toggle = () => {
    setOpen((o) => !o)
    if (!seen) {
      setSeen(true)
      try {
        localStorage.setItem(SEEN_KEY, '1')
      } catch {
        // Sin almacenamiento: el globo volverá a aparecer en la próxima visita.
      }
    }
  }

  /**
   * Agrega la pregunta a la conversación y, después de una pausa corta, la respuesta.
   *
   * @param question - Texto de la pregunta.
   */
  const ask = (question: string) => {
    const text = question.trim()
    if (!text || thinking) return
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', text }])
    setInput('')
    setThinking(true)
    setMood('thinking')
    timer.current = window.setTimeout(() => {
      const entry = findAnswer(text)
      setMessages((m) => [
        ...m,
        entry
          ? { id: nextId.current++, from: 'bot', text: entry.answer, link: entry.link }
          : { id: nextId.current++, from: 'bot', text: FALLBACK_ANSWER },
      ])
      setThinking(false)
      setMood(entry ? 'happy' : 'confused')
    }, THINK_MS)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  const onLinkClick = () => {
    if (window.matchMedia('(max-width: 560px)').matches) setOpen(false)
  }

  return (
    <div className="chat">
      {open && (
        <section className="chat__panel" role="dialog" aria-labelledby={`${id}-title`}>
          <header className="chat__head">
            <Mascot mood={mood} className="chat__head-mascot" />
            <div>
              <span className="label">Help desk · Block 00</span>
              <h2 id={`${id}-title`} className="chat__title">
                Ask Blocky
              </h2>
            </div>
            <button type="button" className="chat__close" onClick={toggle} aria-label="Close chat">
              <CloseIcon />
            </button>
          </header>

          <ol ref={listRef} className="chat__messages" aria-live="polite" aria-label="Conversation">
            {messages.map((m) => (
              <li key={m.id} className={`chat__msg chat__msg--${m.from}`}>
                <span className="sr-only">{m.from === 'bot' ? 'Blocky says:' : 'You said:'}</span>
                <p>{m.text}</p>
                {m.link && (
                  <a className="chat__link" href={m.link.href} onClick={onLinkClick}>
                    {m.link.label}
                    <ArrowIcon />
                  </a>
                )}
              </li>
            ))}
            {thinking && (
              <li className="chat__msg chat__msg--bot chat__typing" aria-label="Blocky is typing">
                <span />
                <span />
                <span />
              </li>
            )}
          </ol>

          <div className="chat__suggestions" role="group" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => ask(s)} disabled={thinking}>
                {s}
              </button>
            ))}
          </div>

          <form className="chat__form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor={`${id}-input`}>
              Your question
            </label>
            <input
              ref={inputRef}
              id={`${id}-input`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              autoComplete="off"
              maxLength={200}
            />
            <button type="submit" disabled={!input.trim() || thinking} aria-label="Send question">
              <ArrowIcon />
            </button>
          </form>
        </section>
      )}

      {!open && !seen && (
        <p className="chat__bubble" aria-hidden="true">
          Questions? Ask me!
        </p>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={`chat__launcher ${open ? 'is-open' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close chat with Blocky' : 'Open chat with Blocky, the blockchain helper'}
      >
        {open ? (
          <span className="chat__launcher-close">
            <CloseIcon />
          </span>
        ) : (
          <Mascot />
        )}
      </button>
    </div>
  )
}
