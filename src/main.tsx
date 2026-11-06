/**
 * @file Punto de entrada: carga los estilos base y monta la aplicación en `#root`.
 *
 * Los estilos de cada sección y componente se importan dentro de su propio archivo,
 * así que aquí solo va el CSS global.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
