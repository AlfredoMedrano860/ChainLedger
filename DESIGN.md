# ChainLedger · Design system "Manifest"

Inspirado en etiquetas de envío, manifiestos de carga y formularios de auditoría:
lo que se usa de verdad para mover y revisar inventario. Nada decorativo que no tenga
una función de lectura.

## Principios

1. **Formulario, no tarjeta.** La información vive en celdas con una etiqueta pequeña
   arriba a la izquierda (como un campo de manifiesto). Sin sombras, sin esquinas redondeadas.
2. **Un solo color de señal.** Grafito sobre gris perla. El rojo tomate marca lo que
   importa: el estado, la acción principal o una alteración. Nunca de fondo grande.
3. **Reglas, no cajas.** Las secciones se separan con reglas: gruesa (3 px) para empezar
   un bloque, fina (1 px) entre filas.
4. **Datos reales.** Hashes, códigos de barras y números se generan; no son adorno.

## Color

Paleta de tres colores: gris perla de fondo, grafito para texto y bloques oscuros, y rojo tomate como única señal.

| Token           | Valor     | Uso                                                        |
| --------------- | --------- | ---------------------------------------------------------- |
| `--paper`       | `#e4e6ea` | Gris perla. Fondo de la página                             |
| `--paper-2`     | `#d3d6dc` | Celdas alternas, hover                                     |
| `--ink`         | `#2b2d33` | Grafito. Texto, reglas, botón principal y bloques oscuros  |
| `--ink-2`       | `#4a4d55` | Texto secundario                                           |
| `--ink-3`       | `#5a5d66` | Etiquetas de campo                                         |
| `--signal`      | `#f2412c` | Rojo tomate. Estado, alteración, hover de acción           |
| `--signal-ink`  | `#b8301f` | Rojo para texto chico sobre gris perla (4.8:1)             |
| `--signal-soft` | `#ff7a66` | Rojo para texto sobre grafito (5.4:1)                      |
| `--on-signal`   | `#16171b` | Texto sobre fondo rojo tomate (4.8:1)                      |
| `--ok`          | `#1a6b45` | Solo para "verificado"                                     |

El rojo tomate puro no llega a 4.5:1 ni con grafito ni con blanco, por eso existen
`--signal-ink`, `--signal-soft` y `--on-signal`: el rojo puro se usa en fondos,
bordes y subrayados, y las variantes cuando el rojo es texto o lleva texto encima.

## Tipografía

| Rol      | Familia                    | Uso                                              |
| -------- | -------------------------- | ------------------------------------------------ |
| Display  | Big Shoulders Display      | Títulos, números grandes. Siempre en mayúsculas. |
| Texto    | Archivo (ancho 100)        | Párrafos e interfaz.                             |
| Datos    | Martian Mono (ancho 87)    | Etiquetas de campo, hashes, horas, códigos.      |

Escala: `--t-mega` (nombre del sitio) · `--t-h1` · `--t-h2` · `--t-h3` · `--t-lead` ·
`--t-body` · `--t-small` · `--t-label` (mono, mayúsculas, 0.7rem).

## Componentes

- **Campo** (`.field`): etiqueta mono arriba + valor. Se agrupan en `.fields` con reglas finas.
- **Encabezado de sección** (`.sec-head`): número grande condensado + título + autor,
  sobre una regla gruesa.
- **Botón** (`.btn`): rectángulo grafito, flecha a la derecha. Hover: rojo tomate.
  Variante `.btn--line` con borde de 2 px.
- **Término** (`.term`): palabra del glosario con subrayado rojo grueso.
- **Código de barras** (`<Barcode>`): se genera desde un hash. Si el dato cambia, cambia.
- **Bloque** (`.block`): fila de manifiesto con número, registro, lugar, hashes y código de barras.

## Espaciado

Base de 8 px: `--s-1` 8 · `--s-2` 16 · `--s-3` 24 · `--s-4` 32 · `--s-6` 48 · `--s-8` 64 · `--s-12` 96.
