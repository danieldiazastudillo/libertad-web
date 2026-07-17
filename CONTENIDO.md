# Guía de Edición de Contenidos

*Para mantener el sitio de la Resp∴ Log∴ Abnegación N°48 sin necesidad de conocimientos técnicos*

---

## Introducción

El sitio web está diseñado para que cualquier miembro de la logia pueda actualizar el contenido sin tocar código. Todo lo que necesitas hacer es editar tres archivos de texto simples. No requiere programación: solo abrir, buscar, cambiar y guardar.

---

## Los Tres Archivos

### 1. Calendario de Actividades
**Archivo:** `src/content/events/events.yaml`

Este archivo contiene los eventos que aparecen bajo "Actividades Conmemorativas". Cada evento se ve así:

```yaml
- id: nombre-unico-sin-espacios
  order: 1
  day: "13"
  month: "Oct"
  title: "Tenida Solemne Conmemorativa"
  info: "Club Libertad, Viña del Mar · 21:00 horas"
```

**Para añadir un evento nuevo:**
1. Copia uno de los bloques completos (desde `- id:` hasta la última línea)
2. Pégalo debajo de los eventos existentes
3. Cambia los valores:
   - `id`: un nombre único sin espacios ni acentos (usa guiones: `tenida-octubre-13`)
   - `order`: un número que decide en qué posición aparece (1 = primero, 2 = segundo, etc.)
   - `day`: el día del mes ("13", "24", etc.)
   - `month`: abreviatura del mes ("Oct", "Nov", "Dic", etc.)
   - `title`: el nombre del evento
   - `info`: lugar, hora y detalles

**El campo `order` es el que decide el orden en que aparecen los eventos en el sitio** (no la posición en el archivo). Si añades un evento entre dos existentes, dale un número intermedio (por ejemplo `order: 2` a uno nuevo entre el `1` y el `3`), o simplemente renumera todos si prefieres mantenerlos en orden entero.

---

### 2. Textos Cortos del Sitio
**Archivo:** `src/content/site.yaml`

Este archivo contiene todos los textos breves del sitio: el título principal, subtítulos, la lista de agenda, información de las logias participantes, etiquetas del formulario RSVP, pie de página, enlaces del menú, y textos de la invitación imprimible.

Cada sección tiene un nombre. Por ejemplo:

```yaml
hero:
  title: "110 Años de Abnegación"
  tagline: "1913 – 2023"
  intro: "Un siglo de historia en la logia masónica..."
```

```yaml
agenda:
  items:
    - "Acto de apertura"
    - "Conferencia conmemorativa"
    - "Ágape fraternal"
```

**Para cambiar un texto:**
1. Abre el archivo
2. Busca el bloque que quieres editar (por ejemplo, `hero` o `agenda`)
3. Encuentra el campo con el texto que necesitas cambiar
4. Modifica lo que está entre las comillas, conservando las comillas y el símbolo `:`

**Para añadir un nuevo elemento a una lista** (como `agenda.items`):
1. Copia una línea entera: `    - "Texto del ítem"`
2. Pégala en la línea siguiente
3. Cambia solo el texto entre comillas

**No cambies los nombres de las secciones ni la estructura** (los guiones, espacios, y dos puntos). Solo el contenido entre comillas.

---

### 3. Sección "Historia"
**Archivo:** `src/content/historia/historia.md`

Este archivo contiene los párrafos más largos de la sección Historia. La estructura es simple:

```markdown
---
eyebrow: "Trasfondo"
heading: "Nuestra Historia"
---

Aquí va el primer párrafo, con el texto que quieras escribir.

Este es un segundo párrafo. Solo deja una línea en blanco entre párrafos.

Y así con los que necesites.
```

**Para editar:**
- **Las líneas entre los guiones** (`---`): cambia solo lo que está entre comillas en `eyebrow` y `heading`. No toques `---` ni los nombres de los campos.
- **Después de los guiones**: escribe o edita párrafos libremente. Deja una línea en blanco entre párrafos.

**Para añadir un párrafo nuevo:**
1. Colócate al final del archivo
2. Deja una línea en blanco
3. Escribe tu párrafo

No necesitas marcas especiales ni formatos complicados.

---

## Reglas Generales

- **Caracteres acentuados y símbolos masónicos** (∴, °): mantenlos exactamente como los encuentras.
- **Comillas alrededor de textos**: no las quites. Son obligatorias en los archivos YAML.
- **Nombres de campos** (izquierda del `:`): no los cambies. Por ejemplo, no cambies `title:` a `titulo:`.
- **Espacios al inicio de líneas**: respétalos. La indentación (espacios en blanco) es importante para que el sistema entienda la estructura.
- **Después de guardar**: el sitio se actualiza automáticamente en pocos minutos una vez que se publican los cambios.

---

## Preguntas Frecuentes

**¿Qué pasa si cometo un error?**  
Los cambios se pueden deshacer. Si algo se ve roto en el sitio, contacta al encargado técnico con una descripción del cambio que hiciste.

**¿Puedo cambiar el diseño o los colores?**  
No. Solo edita contenido (texto, eventos, fechas). El diseño está protegido en código.

**¿Dónde veo mis cambios?**  
Después de guardar y que se publiquen (1-2 minutos), verás los cambios en `https://danieldiazastudillo.github.io/libertad-web/`.

---

*Gracias por mantener viva la memoria de la Resp∴ Log∴ Abnegación N°48.*
