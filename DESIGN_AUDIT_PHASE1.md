# AnatomyLab — Auditoría visual Fase 1

Fecha: 2026-11-06  
Alcance: Login, Home, Study, Quiz y Progress en viewport de escritorio.

## Resumen

La interfaz ya tiene una identidad visual reconocible: fondo frío, acentos anatómicos, navegación lateral estable, tipografía editorial y tarjetas con bordes sutiles. No hace falta rediseñar la aplicación; la prioridad es unificar patrones y mejorar la jerarquía en estados de poco contenido.

## Hallazgos priorizados

### P0 — Corregir antes del siguiente release visual

1. **Login con contenido principal fuera del primer viewport.** El hero ocupa casi toda la altura y el formulario queda por debajo en una ventana de escritorio estándar. Esto retrasa la acción principal y puede parecer una pantalla incompleta.
2. **Estado vacío de Home demasiado dominante.** El bloque “Aún no hay progreso registrado” ocupa mucho espacio y compite con la entrada a los sistemas anatómicos. Debe comunicar el estado sin desplazar el contenido principal.

### P1 — Siguiente fase de implementación

3. **Búsqueda inconsistente entre vistas.** Home usa una búsqueda dentro del hero; Study, Quiz y Progress muestran una búsqueda persistente en el header. Conviene definir un único patrón global y una variante contextual.
4. **Densidad desigual.** Study empieza con una tarjeta alta y un área inferior muy vacía; Progress muestra una tarjeta de resumen muy vertical. Hay que establecer una escala común de alturas, padding y separación.
5. **Jerarquía de acciones secundaria.** En Quiz, las evaluaciones aparecen como tarjetas similares y la acción de entrada queda reducida a una flecha. Debe reforzarse el estado interactivo y el foco visual.
6. **Estados iniciales poco expresivos.** Progreso 0%, ausencia de sesiones y ausencia de respuestas podrían usar una composición más orientada a la siguiente acción.

### P2 — Pulido posterior

7. **Consistencia de microcopy.** Revisar títulos como “AnatomyLab AI”, “AnatomyLab” y etiquetas de sección para que el nivel de marca sea uniforme.
8. **Responsive y accesibilidad.** Validar que el sidebar, el header y los textos largos mantengan contraste, focus visible y no generen desbordamientos en ES/EN.
9. **Motion y feedback.** Añadir transiciones breves y consistentes para selección de navegación, apertura de sistemas, cambios de tema y estados de progreso.

## Lo que funciona bien

- La navegación lateral mantiene orientación y estado activo con claridad.
- El lenguaje visual científico/editorial está presente sin sobrecargar la pantalla.
- Los acentos por sistema ayudan a identificar Cardiovascular, Respiratorio y otros sistemas.
- Home, Study y Progress comparten una estructura de encabezado reconocible.
- El tema claro tiene buen contraste general y una paleta contenida.

## Decisiones para la Fase 2

1. Consolidar tokens y componentes antes de retocar cada vista individual.
2. Definir variantes de `Card`, `Button`, `Badge`, `ProgressBar` y `EmptyState`.
3. Resolver primero Login y Home, porque son las entradas con mayor impacto.
4. Mantener intactas la identidad anatómica, el índice, los modelos GLB y la lógica del visor.

## Criterio de salida de la Fase 1

La auditoría queda cerrada cuando cada inconsistencia visual importante tiene una prioridad, una decisión de diseño y una vista objetivo para la implementación. Este documento cubre ese criterio y sirve como backlog de la Fase 2.
