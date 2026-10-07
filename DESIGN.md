# AnatomyLab — Visual Design Contract

Este documento define el contrato visual de AnatomyLab para futuras tareas de UI.
No implica que todos los componentes actuales ya cumplan estas reglas.

AnatomyLab es una aplicación desktop educativa de anatomía 3D para estudiantes
de Medicina y Enfermería. La dirección visual oficial es:

**Fluent-inspired Scientific Spatial Interface**

Esta dirección combina conceptualmente:

- Fluent 2 inspired para estructura desktop, navegación, estados, accesibilidad
  y controles.
- Scientific Editorial para jerarquía, tipografía, composición académica y
  presentación anatómica.
- Spatial UI para el workspace 3D, profundidad visual y controles contextuales
  alrededor del modelo.
- Glassmorphism únicamente como recurso puntual en controles flotantes del
  viewer.

Fluent es una referencia conceptual, no una dependencia ni una copia literal.
No se debe introducir Microsoft Fluent UI.

La interfaz debe sentirse como un atlas anatómico digital moderno, software
científico premium, aplicación educativa universitaria, workspace 3D
profesional y producto tecnológico serio.

Debe transmitir precisión, claridad, exploración, profundidad, conocimiento y
confianza académica.

No debe convertirse en un portal universitario administrativo, portal
hospitalario, SaaS genérico, dashboard empresarial, aplicación gaming,
interfaz futurista exagerada ni plantilla de login estándar. Se evitarán el
glassmorphism excesivo, el neumorphism, los colores neón, los gradientes AI
morados/rosas y la acumulación de tarjetas.

El modelo anatómico 3D es el protagonista visual.

## Visual Direction

- El tema principal es light mode.
- Las superficies son claras, sobrias y discretas.
- La jerarquía se construye principalmente con espacio, tipografía y contraste.
- El color se usa con moderación para indicar estado, selección y contexto.
- Los paneles no deben competir visualmente con el viewer.
- La estética debe ser académica, clínica y profesional.
- La composición debe tener titulares claros, bloques respirados, alineación
  consistente, labels técnicos discretos y una jerarquía fuerte entre título,
  metadata y contenido.
- El contenido anatómico debe sentirse más cercano a un atlas moderno que a un
  dashboard.
- Se permiten ocasionalmente overlines, metadata, numeración, indicadores
  científicos pequeños y separadores finos, siempre con moderación.
- La claridad de Figma, la jerarquía de Linear, el refinamiento de Attio y los
  atlas médicos digitales son referencias conceptuales, no interfaces para
  copiar.

## Fluent-inspired Foundation

La base de interacción toma Fluent 2 como referencia conceptual:

- navegación desktop clara;
- componentes con estados definidos;
- jerarquía mediante superficies;
- bordes suaves;
- hover, focus y selected perceptibles;
- iconografía outline consistente;
- buen comportamiento con teclado;
- layouts adaptables.

La implementación sigue usando React, Tailwind y los componentes propios de
AnatomyLab. No se añade Microsoft Fluent UI ni otra dependencia equivalente.

## Scientific Editorial

Las vistas deben tratar el contenido como una publicación científica digital:

- títulos con personalidad y propósito;
- composición con espacio negativo;
- metadata pequeña y legible;
- alineación estable entre columnas y secciones;
- pocas superficies, con jerarquía clara;
- contenido educativo presentado como material de estudio, no como métricas de
  un dashboard empresarial.

## Spatial UI

Anatomy Viewer es un workspace espacial. El modelo 3D es la capa principal y
los controles viven alrededor de él como instrumentos contextuales:

- toolbar flotante;
- selector de capas;
- selector de sistemas;
- tooltip de estructura;
- panel informativo;
- popovers y controles pequeños.

Estos elementos pueden tener profundidad visual, pero no deben competir con el
modelo anatómico ni reducirlo a una zona secundaria.

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

Componentes espaciales y editoriales que deben prepararse para futuras
extracciones:

- `NavigationItem` con icono, label y estado activo;
- `ContextSidebar` para navegación anatómica contextual;
- `FloatingToolbar` para acciones del viewer;
- `GlassPopover` para popovers flotantes sutiles;
- `AnatomySystemItem` para sistemas dentro de Anatomy;
- `MetadataLabel` para información técnica breve;
- `PageHeader` y `SectionHeader` para jerarquía editorial;
- `Field`/`Input`, `Tabs` y `Tooltip` para controles consistentes.

## Component Depth

La profundidad visual se organiza en niveles explícitos:

| Nivel | Nombre | Superficie y uso |
|---:|---|---|
| 0 | Canvas | Fondo de la aplicación |
| 1 | Surface / fixed panel | Sidebar, header y paneles fijos |
| 2 | Raised card | Card o bloque elevado con separación leve |
| 3 | Floating / glass control | Toolbar, popover y control contextual |
| 4 | Modal | Interrupción temporal de máxima prioridad |

Cada nivel debe definir superficie, borde, sombra y radius. No improvisar
profundidad por componente.

## Glass Usage

Glassmorphism se permite únicamente en:

- toolbar flotante del viewer;
- selector contextual de capas;
- controles flotantes pequeños;
- popovers;
- dropdowns sobre el modelo.

Debe ser sutil y accesible:

- fondo blanco translúcido entre 80% y 90%;
- blur moderado de 12–16 px;
- borde fino;
- sombra Floating;
- contraste AA para texto y controles.

No usar glass como sistema principal ni en sidebar, header principal,
formularios, Home completa, Progress, Profile o Login completo.

## Motion

Duraciones oficiales:

- hover: 120–160 ms;
- selección: 160–200 ms;
- panels y popovers: 180–240 ms.

Usar principalmente cambios de opacity, transform pequeño, background y border.
Evitar rebotes, zoom exagerado y animación decorativa continua. Respetar
`prefers-reduced-motion`.

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
- Debe evolucionar hacia una navegación tipo workspace.
- Cada item debe poder contener icono outline, label y estado activo.
- El estado activo debe usar un acento lateral o indicador teal, superficie
  suave y texto fuerte; evitar grandes bloques negros.
- Debe quedar preparado para una futura versión colapsable.
- Los items necesitan estado activo, hover, focus y disabled si aplica.
- No mezclar sistemas, capas ni estructuras anatómicas con navegación global.

La navegación global es:

- Inicio
- Anatomía
- Estudio
- Quiz
- Progreso

Cuenta:

- Perfil
- Configuración

La iconografía oficial debe ser outline, de geometría simple, con trazos
consistentes y tamaño base de 18–20 px. Se prefiere Lucide si se incorpora en
el futuro. No usar emojis ni mezclar arbitrariamente iconos filled y outline.

## Home

Home debe tener como máximo cuatro áreas principales:

1. bienvenida;
2. búsqueda;
3. continuar estudiando y sistemas;
4. progreso resumido.

No debe convertirse en dashboard administrativo ni acumular tarjetas, gráficos,
historial completo, quiz o configuración.

Los seis sistemas pueden diferenciarse mediante accent de sistema, icono,
microestado y acción de entrada. No convertirlos en una cuadrícula genérica de
cards idénticas.

## Login / Register

Login y Register no deben verse como una card genérica centrada.

En desktop deben usar una composición editorial de dos zonas:

- zona visual: branding, headline, visual anatómico o composición relacionada
  con anatomía 3D y como máximo tres beneficios;
- zona de formulario: limpia, compacta y enfocada.

La zona visual debe comunicar producto de anatomía 3D, no portal institucional.
Si todavía no existe un render anatómico adecuado, se reserva una zona visual
preparada para un asset futuro. Una composición abstracta puede ser temporal,
pero no debe convertirse en círculos tecnológicos genéricos como identidad
permanente.

## Anatomy Viewer

Anatomy es la pantalla principal del producto. El modelo 3D debe ocupar el
mayor porcentaje posible del espacio, aproximadamente 65–75% del área útil.

Layout conceptual:

- Izquierda: navegación anatómica contextual, sistemas, regiones, capas y
  estructuras cuando corresponda.
- Centro: viewer 3D dominante.
- Derecha: información de la estructura seleccionada.

La navegación contextual debe ser compacta y puede incluir sistemas, regiones,
capas y estructuras. No pertenece al sidebar global.

El viewer debe tener fondo neutro, espacio negativo suficiente y controles
contextuales discretos. El panel derecho debe permanecer controlado y limitarse
a estructura, metadata, contenido educativo y acciones directas.

El panel derecho puede contener nombre, sistema, región, descripción, función,
ubicación, relaciones y acciones directas como favorito, estudiar estructura y
Anatomy AI.

No puede contener navegación global de Quiz, Progress, History, Study o Profile.

La toolbar del viewer debe ser flotante, usar glass sutil cuando corresponda,
permanecer asociada al viewport 3D, visible para todos los sistemas y no
depender de la altura del panel derecho ni romper el resize.

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

Pueden aparecer en iconos, líneas laterales, pequeños indicadores, chips,
progreso y estados hover/selected relacionados con el sistema. Nunca deben
usarse como grandes fondos saturados.

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
- card centrada genérica para Auth;
- círculos abstractos tecnológicos sin relación anatómica como visual principal;
- portal institucional o login con apariencia de portal universitario;
- badges decorativos sin función;
- exceso de microtexto técnico;
- grandes bloques negros para selección;
- sidebar únicamente textual cuando exista iconografía disponible;
- grids de cards idénticas para todo;
- tarjetas innecesarias o excesivamente anidadas;
- colores Slate directos si existe un token DS equivalente;
- botones HTML estilizados manualmente cuando `Button` es suficiente;
- inputs manuales cuando existe `Input`/`Field`;
- sombras excesivas;
- glassmorphism;
- glass aplicado a toda la aplicación;
- blur excesivo;
- colores saturados dominantes;
- neon;
- gradientes decorativos;
- textos visibles hardcoded;
- tamaños tipográficos arbitrarios;
- layouts que solo funcionan en español;
- layouts donde el 3D quede pequeño;
- cambios visuales que alteren la identidad anatómica o el viewer.

## Design Review Criteria

Antes de aprobar una pantalla, revisar:

1. ¿Tiene una jerarquía visual clara?
2. ¿Se reconoce como AnatomyLab sin leer el nombre?
3. ¿La anatomía es protagonista cuando corresponde?
4. ¿Existe suficiente espacio negativo?
5. ¿Hay navegación duplicada?
6. ¿Se usaron componentes oficiales?
7. ¿Se respetan los tokens?
8. ¿ES/EN funciona sin romper el layout?
9. ¿Focus y contraste son accesibles?
10. ¿La pantalla parece diseñada o simplemente estilizada?
11. ¿Se siente científica y moderna sin parecer institucional?
12. ¿Hay algún elemento decorativo que no aporte función o identidad?

## Implementation Status Note

El código actual contiene componentes que ya anticipan este contrato, como
`Button`, `Card`, `Badge`, `InfoSection`, `SegmentedControl`, `AppShell`,
`AppHeader` y `AppSidebar`. También existen usos legacy de colores Slate,
botones manuales, cards manuales y textos sin i18n.

Las futuras tareas de UI deben migrar gradualmente esas inconsistencias sin
alterar `anatomyIndex`, los GLB, la identidad anatómica ni la lógica del viewer.
