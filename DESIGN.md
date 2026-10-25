# Roots Protein Bar — plan de diseño

Sitio de producción. Un recorrido vertical, no una plantilla de cafetería. La audacia está en un solo lugar: la línea de raíz. Todo lo demás es sobrio.

## Paleta

Valores estimados del local. TODO(dueña): ajustar si llega el manual o el logo oficial.

| Token | Hex | Uso |
| --- | --- | --- |
| `--savia` | `#1F3319` | Hero oscuro no: capítulos de lugar y footer |
| `--hoja` | `#4F6D26` | Verde del local. Capítulo de waffles. Borde de botón sobre avena |
| `--salvia` | `#CFDDB6` | Capítulos suaves |
| `--avena` | `#F4EEDD` | Lectura |
| `--madera` | `#9C6B3C` | Solo la raíz sobre fondos claros. Nunca texto |
| `--fresa` | `#C93A6E` | Solo fondo del botón de WhatsApp y el brote del carrito. Texto blanco |
| `--tinta` | `#22271C` | Texto sobre avena y salvia |
| `--raiz-clara` | `#CFDDB6` | Raíz sobre savia y hoja |

Contraste medido (texto normal, mínimo 4.5:1):

- tinta sobre avena 13.18, tinta sobre salvia 10.67, avena sobre savia 11.72, avena sobre hoja 5.11, blanco sobre fresa 4.87, hoja sobre avena 5.11.
- No se usa tinta sobre hoja (2.58), ni avena como texto sobre fresa (4.20), ni madera como texto (3.95 sobre avena).
- El naranja `#E07A2F` existe solo dentro del vaso del capítulo «Antes de entrenar».

Orden de fondos: hero avena, antes de entrenar salvia, después de entrenar avena, antojo hoja, etiqueta avena, rincón salvia, lugar y pedir savia, preguntas avena, footer savia.

## Tipografía

- Titulares: Young Serif 400, minúscula natural, tracking ligeramente negativo.
- Interfaz, precios y macros: Figtree 400, 500 y 700. Precios y macros con `tabular-nums`.
- Escala: cuerpo 1.0625rem / 1.6; pequeño nunca bajo 0.875rem; hero `clamp(3rem, 5.6vw, 7.5rem)` con interlineado 1.02; H2 `clamp(2rem, 4vw, 3.5rem)`.
- Medida máxima de párrafo: 62ch.

## Concepto de layout

La página de inicio es un camino. Una línea de 2.5px nace bajo el titular, baja por el margen izquierdo y suelta una rama corta con hoja en cada capítulo. Termina en un punto, en la dirección del local. El color de la línea sigue el fondo (`--madera` en claro, `--raiz-clara` en oscuro).

Los capítulos no comparten plantilla. El lado del texto y de la imagen cambia, los fondos cambian como salas del local, y el límite entre salas es una curva distinta cada vez (el espejo orgánico), no una onda repetida.

Las fotos y los sustitutos van en arco (arriba redondo, abajo recto). La foto del hero es la excepción: sale a sangre y se funde con `--avena`. Mientras no haya foto, el hero lleva un bodegón en SVG sobre una forma de salvia, con el mismo fundido.

### Hero, escritorio

```
+------------------------------------------------------+
| (R) roots    Inicio  Carta  Nosotros  Contacto  ig q c |
|                                                       |
|  Energía natural,                  foto o bodegón     |
|  raíces fuertes.                   fundido a avena    |
|  Texto corto.                                         |
|  [Pedir por WhatsApp] [Ver nuestra carta]             |
|  icono | icono | icono                                |
|  pin Santa Anita, Lima                                |
|  |                                                    |
+--|----------------------------------------------------+
```

### Hero, 360 px

La imagen ocupa unos 42svh arriba, con fundido hacia abajo. Titular y botones quedan en lo que resta de una pantalla de 740px.

### Capítulo (ejemplo, antojo)

```
+------------------------------------------------------+
|  (curva)  fondo hoja, trama de waffle muy suave      |
|  |                                                   |
|  |--o   Un waffle que también suma proteína          |
|        texto corto                                   |
|        fila de menú ................ 34 g    S/ 22   |
|        fila de menú ................ 40 g    S/ 24   |
|                              [arco con waffle]       |
+------------------------------------------------------+
```

### Carta

Menú impreso, no tarjetas. Bloques alternos avena y salvia (texto chico de precios se lee mejor en salas claras). Cada categoría abre con título, arco e ilustración y una mini etiqueta de macros. Cada producto es una fila: nombre, líder punteado, precio, macros, botón redondo.

## Principios

1. Una sola idea memorable: la raíz. Sin orbes, sin degradados decorativos, sin sombra idéntica en cada bloque.
2. El titular no pinta una palabra de otro color ni en cursiva.
3. Sin etiquetas en mayúsculas sobre los títulos, sin «A · B · C», sin flechas en los botones, sin numeración 01/02/03.
4. Cada capítulo dice una cosa. Poco texto, mucho aire, alineado a la izquierda.
5. Fresa no se reparte. El rosado del Pink Protein se queda en el botón de pedir.
6. Si falta un dato, el bloque desaparece. No hay corchetes ni texto de relleno.
7. Movimiento: el titular entra por líneas y la raíz del hero crece una vez (1.2s). El resto de la raíz se dibuja con el scroll. El modal sube en el celular. Al agregar, brota una hoja en el carrito. Nada de fade-up por sección.

## Qué cambió al contrastar el plan con el brief

- El header, al hacer scroll, no es siempre una barra de avena. Sobre savia y hoja esa barra clara con texto claro fallaría, y el texto oscuro sobre un velo demasiado transparente también. La barra sigue al capítulo: vidrio de avena con tinta, o vidrio de savia con avena. Sobre el hero sigue transparente, con un velo corto arriba de la foto para que los íconos de la derecha se lean.
- La carta no usa las salas oscuras. Una lista larga de precios sobre hoja baja de 5.11 y cansa. Los bloques de la carta se quedan en avena y salvia. Las salas oscuras viven en el recorrido de inicio.
- La etiqueta de macros es una etiqueta de verdad (filetes gruesos y finos, números grandes), no cuatro tarjetas de estadística.
- La raíz solo recorre el inicio. En la carta y en contacto sería empapelado.
- El año del footer es 2026, escrito como constante. `new Date()` en el servidor rompe el prerender de Next.js 16 con `cacheComponents`.
- No se publica `openingHoursSpecification` en el JSON-LD: el horario de `site.ts` está sin confirmar (Instagram y TikTok no coinciden) y no hay un esquema horario estructurado. En la página sí se muestra el texto de `site.hours`.
- «Cómo llegar» usa la búsqueda por dirección del brief, no el enlace corto de Maps, que sigue como TODO.
- Los dos frappés del capítulo de recuperación (Sublime y Brownie) son una elección provisional, sin llamarlos estrella.
