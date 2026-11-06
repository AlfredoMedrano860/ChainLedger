# ChainLedger · Design system "Manifest"

Inspirado en etiquetas de envío, manifiestos de carga y formularios de auditoría:
lo que se usa de verdad para mover y revisar inventario. Nada decorativo que no tenga
una función de lectura.

## Principios

1. **Formulario, no tarjeta.** La información vive en celdas con una etiqueta pequeña
   arriba a la izquierda (como un campo de manifiesto). Sin sombras, sin esquinas redondeadas.
2. **Un solo color de señal.** Negro sobre papel. El naranja de seguridad marca lo que
   importa: el estado, la acción principal o una alteración. Nunca de fondo grande.
3. **Reglas, no cajas.** Las secciones se separan con reglas: gruesa (3 px) para empezar
   un bloque, fina (1 px) entre filas.
4. **Datos reales.** Hashes, códigos de barras y números se generan; no son adorno.

## Color

| Token           | Valor     | Uso                                        |
| --------------- | --------- | ------------------------------------------ |
| `--paper`       | `#dfe6d2` | Fondo: verde pálido de papel contable      |
| `--paper-2`     | `#ced8bf` | Celdas alternas, hover                     |
| `--ink`         | `#141414` | Texto, reglas, botón principal             |
| `--ink-2`       | `#3d3d3a` | Texto secundario                           |
| `--ink-3`       | `#77756d` | Etiquetas de campo                         |
| `--signal`      | `#ff4b12` | Estado, alteración, hover de acción        |
| `--signal-ink`  | `#c2330a` | Naranja sobre papel cuando es texto chico  |
| `--ok`          | `#1d7a4e` | Solo para "verificado"                     |

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
- **Botón** (`.btn`): rectángulo negro, flecha a la derecha. Hover: naranja.
  Variante `.btn--line` con borde de 2 px.
- **Término** (`.term`): palabra del glosario con subrayado naranja grueso.
- **Código de barras** (`<Barcode>`): se genera desde un hash. Si el dato cambia, cambia.
- **Bloque** (`.block`): fila de manifiesto con número, registro, lugar, hashes y código de barras.

## Espaciado

Base de 8 px: `--s-1` 8 · `--s-2` 16 · `--s-3` 24 · `--s-4` 32 · `--s-6` 48 · `--s-8` 64 · `--s-12` 96.
