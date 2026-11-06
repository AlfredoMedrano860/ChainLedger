/**
 * @file Configuración de Vite (servidor de desarrollo y compilación).
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    // Las imágenes SVG de las ilustraciones se publican como archivos aparte (con caché
    // y carga diferida) en lugar de incrustarse en el JavaScript, aunque pesen poco.
    assetsInlineLimit: (file) => (file.endsWith('.svg') ? false : undefined),
  },
})
