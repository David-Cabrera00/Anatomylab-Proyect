# AnatomyLab — Visual Design Contract

Este documento define el contrato visual de AnatomyLab para futuras tareas de UI.
No implica que todos los componentes actuales ya cumplan estas reglas.

AnatomyLab es una aplicación desktop educativa de anatomía 3D para estudiantes
de Medicina y Enfermería. La dirección visual oficial es:

**Clinical + Scientific + Clean Minimal + Premium**

La interfaz debe sentirse como un atlas médico moderno, una herramienta
científica profesional y un workspace académico claro. No debe convertirse en
un dashboard SaaS genérico, portal administrativo hospitalario, aplicación
gaming o interfaz infantil. Se evitarán el glassmorphism excesivo, el
neumorphism, los colores neón, los gradientes AI morado/rosa y la acumulación de
tarjetas.

El modelo anatómico 3D es el protagonista visual.

## Visual Direction

- El tema principal es light mode.
- Las superficies son claras, sobrias y discretas.
- La jerarquía se construye principalmente con espacio, tipografía y contraste.
- El color se usa con moderación para indicar estado, selección y contexto.
- Los paneles no deben competir visualmente con el viewer.
- La estética debe ser académica, clínica y profesional.
- La inspiración conceptual puede incluir la claridad de Figma, la jerarquía de
  Linear, el refinamiento de Attio y atlas médicos digitales modernos, sin copiar
  literalmente ninguna interfaz.

## Colors

Los siguientes tokens existentes en `src/App.css` son la fuente visual oficial.
No se deben crear colores equivalentes con nombres alternativos sin una razón
documentada.

| Token | HEX | Uso |
|---|---:|---|
| `canvas` | `#f3f6f7` | Fondo principal de la aplicación |
| `canvas-muted` | `#eaf0f2` | Fondo secundario, estados suaves |
| `surface` | `#ffffff` | Paneles y superficies principales |
| `surface-raised` | `#fbfcfd` | Cards elevadas |
| `line` | `#d7e1e5` | Bordes y divisores |
| `line-strong` | `#82969e` | Bordes de controles secundarios |
| `ink` | `#1a2b32` | Texto principal |
| `ink-muted` | `#50636b` | Texto secundario |
| `ink-subtle` | `#65777e` | Texto auxiliar y captions |
| `accent` | `#176075` | Acción primaria y selección |
| `accent-hover` | `#104c5e` | Estado hover del accent |
| `accent-soft` | `#e8f2f5` | Fondo suave de selección |
| `success` | `#276f53` | Confirmación y progreso positivo |
| `success-soft` | `#e8f4ed` | Fondo de éxito |
| `warning` | `#8a5b18` | Avisos y modo estudio |
| `warning-soft` | `#fbf3e4` | Fondo de advertencia |
| `error` | `#9c4048` | Errores y acciones destructivas |
| `error-soft` | `#faecee` | Fondo de error |

Reglas:

- Estos tokens son la referencia oficial del producto.
- Se deben evitar clases `slate-*` directas cuando exista un token equivalente.
- Los colores de sistema son acentos de contexto, no fondos dominantes.
- Los colores anatómicos no pueden alterar materiales GLB, identidad, `anatomyId`
  u `originalName`.

### Anatomical system accents

| Sistema | Accent | HEX recomendado |
|---|---|---:|
| Cardiovascular | Rojo clínico discreto | `#B85C68` |
| Respiratorio | Azul/cian | `#2E8FA3` |
| Nervioso | Violeta | `#7357A6` |
| Esquelético | Azul grisáceo | `#607D8B` |
| Muscular | Terracota | `#B86F58` |
| Digestivo | Ámbar | `#B07A2A` |

Estos colores solo pueden utilizarse en indicadores pequeños, badges, iconos,
selecciones y estados activos relacionados con el sistema.

## Typography

Fuente oficial:

```text
Inter, system-ui, "Segoe UI", sans-serif
```

Escala oficial:

| Nivel | Tamaño | Line-height | Uso |
|---|---:|---:|---|
| Display | 28 px | 34 px | Bienvenida o título excepcional de página |
| Title | 22 px | 28 px | Título principal de vista o estructura |
| Heading | 18 px | 24 px | Secciones y paneles |
| Subheading | 16 px | 24 px | Subtítulos y agrupaciones |
| Body | 14 px | 22 px | Texto general y contenido educativo |
| Label | 13 px | 18 px | Labels y controles |
| Caption | 12 px | 16 px | Metadatos, ayudas y estados auxiliares |

Pesos permitidos: 400, 500, 600 y 700. El peso 700 se reserva para acciones
primarias, resultados o títulos importantes.

Reglas:

- No mezclar más de tres niveles tipográficos en una misma superficie.
- No usar arbitrariamente `text-3xl`, `text-2xl` o `text-xl` si existe un token
  equivalente.
- El contenido educativo largo debe usar Body, line-height amplio y un ancho
  legible (`max-w-prose` o equivalente).
- Los títulos anatómicos largos deben permitir wrapping.
- La jerarquía no debe depender únicamente del tamaño: usar también espacio,
  peso y contraste.

## Spacing

La unidad base es **4 px**.

Escala recomendada:

```text
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48
```

Usos orientativos:

- Header: 16–24 px de padding horizontal y 16 px de altura interna.
- Sidebar: 16 px de padding y 4–8 px entre items.
- Página: 24 px; 32 px en espacios amplios de desktop.
- Panel: 20–24 px.
- Card: 16–24 px.
- Formularios: 16–20 px entre campos y 8 px entre label e input.
- Toolbar: 8–12 px.
- Contenido educativo: 16–24 px entre secciones.

No introducir valores arbitrarios sin justificar su relación con la escala.

## Radius

| Token | Tamaño | Uso |
|---|---:|---|
| Small | 8 px | Botones, inputs y controles pequeños |
| Medium | 12 px | Cards, dropdowns y controles del viewer |
| Large | 16 px | Paneles principales, modals y superficies grandes |
| Full | 9999 px | Avatares, badges y chips |

No crear nuevos radios arbitrarios. Los tokens actuales equivalentes son
`rounded-ds-sm`, `rounded-ds-md` y `rounded-ds-lg`.

## Shadows

| Token | Valor | Uso |
|---|---|---|
| Raised | `0 1px 3px rgb(26 43 50 / 7%)` | Card elevada |
| Floating | `0 6px 18px rgb(26 43 50 / 10%)` | Toolbar, dropdown u overlay flotante |
| Modal | `0 16px 40px rgb(26 43 50 / 16%)` | Modal |

Reglas:

- Un panel fijo normalmente no necesita sombra.
- `Card` puede usar Raised.
- Toolbars y dropdowns flotantes usan Floating.
- Modals usan Modal.
- Evitar `shadow-lg` genérico si un token describe mejor la intención.

## Components

Los componentes oficiales son:

`Button`, `IconButton`, `Input / Field`, `SearchBar`, `Card`, `Panel`, `Badge`,
`EmptyState`, `InfoSection`, `SegmentedControl`, `Tabs`, `ProgressBar`,
`Tooltip`, `Dropdown`, `Modal`, `Toast / Error state`, `Loading state`,
`LanguageSwitcher`, `NavigationItem`, `SectionHeader` y `PageContainer`.

Las vistas no deben crear manualmente botones, inputs o cards si existe un
componente oficial equivalente.

### Button

- Default: secondary o primary según la acción.
- Hover: cambio de superficie/accent, no cambio brusco de layout.
- Active: superficie más intensa.
- Selected: `accent-soft` y `accent`.
- Focus: outline visible y consistente.
- Disabled: opacidad reducida y cursor no permitido.
- Loading: conservar el ancho y anunciar el estado.

### Input / Field

- Label asociado mediante `htmlFor`/`id`.
- Estados default, hover, focus, error, disabled y readonly.
- El focus debe usar accent o un outline equivalente.
- Los mensajes de error deben estar asociados accesiblemente.

### Card / Panel

- Card: superficie, borde y radius Medium/Large.
- Panel fijo: normalmente sin sombra.
- Panel flotante: Floating.
- Evitar tarjetas anidadas sin una razón de jerarquía.

### Estados compartidos

Todos los controles interactivos deben contemplar default, hover, active,
selected, focus y disabled. Los componentes con operación asíncrona deben
contemplar loading y error.

## App Layout

Las vistas independientes son:

- Login
- Register
- Home
- Anatomy
- Study
- Quiz
- Progress
- Profile
- Settings

Login y Register no usan `AppShell`. Las demás vistas sí.

El sidebar global contiene exclusivamente:

- Inicio
- Anatomía
- Estudio
- Quiz
- Progreso

Cuenta:

- Perfil
- Configuración

Los sistemas, capas y estructuras anatómicas pertenecen a `AnatomyView`, no a
la navegación global.

## Header

- Altura base: 64 px.
- Debe contener solo información necesaria para la vista actual.
- Puede contener AnatomyLab, título de vista, búsqueda contextual, selector ES/EN
  y perfil.
- La búsqueda no tiene que aparecer en todas las vistas.
- Evitar saturarlo con controles secundarios.
- Debe soportar textos más largos en inglés sin ancho rígido.

## Sidebar

- Ancho desktop base: 224 px.
- Contiene solo navegación global.
- Debe quedar preparado para una futura versión colapsable.
- Los items necesitan estado activo, hover, focus y disabled si aplica.
- No mezclar sistemas, capas ni estructuras anatómicas con navegación global.

## Home

Home debe tener como máximo cuatro áreas principales:

1. bienvenida;
2. búsqueda;
3. continuar estudiando y sistemas;
4. progreso resumido.

No debe convertirse en dashboard administrativo ni acumular tarjetas, gráficos,
historial completo, quiz o configuración.

## Anatomy Viewer

Anatomy es la pantalla principal del producto. El modelo 3D debe ocupar el
mayor porcentaje posible del espacio.

Layout conceptual:

- Izquierda: navegación anatómica contextual, sistemas, regiones, capas y
  estructuras cuando corresponda.
- Centro: viewer 3D dominante.
- Derecha: información de la estructura seleccionada.

El panel derecho puede contener nombre, sistema, región, descripción, función,
ubicación, relaciones y acciones directas como favorito, estudiar estructura y
Anatomy AI.

No puede contener navegación global de Quiz, Progress, History, Study o Profile.

La toolbar del viewer debe permanecer asociada al viewport 3D, visible para
todos los sistemas y no depender de la altura del panel derecho.

## Study

Study es una vista independiente. Debe priorizar:

- estructura actual;
- contexto anatómico;
- contenido educativo;
- anterior/siguiente;
- progreso de sesión;
- finalizar.

Study no debe mezclar Quiz.

## Quiz

Quiz es una vista independiente. Debe priorizar:

- configuración;
- pregunta;
- respuesta;
- feedback;
- progreso;
- puntuación;
- revisión final.

Quiz no se renderiza dentro de Anatomy.

## Progress

Progress incluye:

- progreso general;
- maestría por estructura;
- historial de quizzes.

Puede usar visualización simple de datos, pero debe evitar convertirse en un
dashboard excesivamente denso.

## Profile

Profile puede incluir:

- datos del usuario;
- favoritos;
- información personal futura.

Favorites debe poder navegar de vuelta a Anatomy y enfocar una estructura
mediante `changeSystem`/`focusStructure` cuando corresponda.

## Settings

Settings alojará preferencias futuras como idioma, apariencia, comportamiento de
la aplicación y cuenta. No se deben añadir opciones ficticias antes de existir
una necesidad funcional real.

## Accessibility

- Cumplir contraste mínimo WCAG AA.
- Mantener focus visible en todos los controles.
- Soportar navegación por teclado.
- Usar `aria-current`, `aria-selected` y `aria-pressed` cuando corresponda.
- Asociar labels con sus inputs.
- Hacer accesibles los mensajes de error y estados de carga.
- Mantener un mínimo de 40 px para controles principales.
- No depender únicamente del color para comunicar estado.
- Respetar `prefers-reduced-motion`.

## Internationalization

Idiomas soportados:

- Español (`es`)
- English (`en`)

Todo texto visible nuevo debe usar el sistema i18n. Se deben evitar strings
visibles hardcoded.

Los componentes deben soportar diferencias de longitud, wrapping, labels largos
y nombres anatómicos extensos. No usar anchos rígidos basados en un solo idioma.
Fechas, números y mensajes deben localizarse cuando corresponda.

## Anatomical System Colors

Los colores por sistema son únicamente acentos visuales. Nunca deben modificar:

- materiales GLB;
- identidad del modelo;
- `anatomyId`;
- `originalName`.

La identidad anatómica pertenece al dominio; el color solo comunica contexto de
UI.

## Anatomy Technical Rules

- No usar `object.name` como identidad canónica.
- Usar `anatomyOriginalName` para bindings técnicos.
- Preservar `anatomyId` estable.
- No alterar ni renombrar GLB.
- No romper `activeSystem`.
- No romper `activeLayer`.
- No perder la selección anatómica.
- Mantener `focusStructure` como mecanismo de foco.
- Mantener toolbar, leyenda y selector dentro de sus áreas correctas.
- No introducir lógica anatómica en componentes puramente visuales.

## Anti-patterns

Quedan prohibidos como dirección de diseño:

- navegación duplicada;
- sistemas anatómicos dentro del sidebar global;
- Quiz dentro de Anatomy;
- Progress dentro de Anatomy;
- tarjetas innecesarias o excesivamente anidadas;
- colores Slate directos si existe un token DS equivalente;
- botones HTML estilizados manualmente cuando `Button` es suficiente;
- inputs manuales cuando existe `Input`/`Field`;
- sombras excesivas;
- glassmorphism;
- neon;
- gradientes decorativos;
- textos visibles hardcoded;
- tamaños tipográficos arbitrarios;
- layouts que solo funcionan en español;
- cambios visuales que alteren la identidad anatómica o el viewer.

## Implementation Status Note

El código actual contiene componentes que ya anticipan este contrato, como
`Button`, `Card`, `Badge`, `InfoSection`, `SegmentedControl`, `AppShell`,
`AppHeader` y `AppSidebar`. También existen usos legacy de colores Slate,
botones manuales, cards manuales y textos sin i18n.

Las futuras tareas de UI deben migrar gradualmente esas inconsistencias sin
alterar `anatomyIndex`, los GLB, la identidad anatómica ni la lógica del viewer.
