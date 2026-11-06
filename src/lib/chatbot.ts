/**
 * @file Motor de respuestas del chatbot Blocky (sin IA y sin servidor).
 *
 * Busca en `data/chatKnowledge.ts` la entrada que mejor coincide con la pregunta:
 * cada palabra clave encontrada suma tantos puntos como palabras tenga, así una frase
 * como "private blockchain" (2 puntos) le gana a "blockchain" (1 punto).
 */
import { CHAT_KNOWLEDGE, type ChatEntry } from '../data/chatKnowledge'

/** Respuesta cuando ninguna entrada coincide. */
export const FALLBACK_ANSWER =
  "I'm not sure about that one. I can answer questions about blockchain, hashes, private vs. public blockchain, auditing, inventory, and the Walmart case."

/**
 * Pasa el texto a minúsculas, quita tildes y signos, y deja un espacio al inicio y al
 * final para poder buscar palabras completas.
 *
 * @param text - Pregunta original.
 * @returns Texto normalizado, por ejemplo ` what is a hash `.
 */
function normalize(text: string) {
  const clean = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return ` ${clean} `
}

/**
 * Calcula qué tan bien coincide una entrada con la pregunta.
 *
 * @param question - Pregunta ya normalizada.
 * @param entry - Entrada de la base de conocimiento.
 * @returns Puntos (0 si no coincide ninguna palabra clave).
 */
function score(question: string, entry: ChatEntry) {
  return entry.keywords.reduce((total, keyword) => {
    const k = normalize(keyword)
    return question.includes(k) ? total + k.trim().split(' ').length : total
  }, 0)
}

/**
 * Busca la mejor respuesta para una pregunta.
 *
 * @param question - Lo que escribió la persona.
 * @returns La entrada que mejor coincide, o `null` si ninguna coincide.
 */
export function findAnswer(question: string): ChatEntry | null {
  const q = normalize(question)
  let best: ChatEntry | null = null
  let bestScore = 0
  for (const entry of CHAT_KNOWLEDGE) {
    const s = score(q, entry)
    if (s > bestScore) {
      best = entry
      bestScore = s
    }
  }
  return best
}
