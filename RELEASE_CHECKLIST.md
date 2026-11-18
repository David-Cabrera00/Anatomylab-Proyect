# AnatomyLab v0.1.1 — estado de release

Fecha de preparación: 2026-11-18.

## Verificado

- [x] Versión `0.1.1` alineada en npm, Cargo y Tauri.
- [x] Frontend y backend compilan; auditoría de anatomía pasa para los seis sistemas.
- [x] API de producción responde `GET /api/health`.
- [x] Registro, inicio de sesión, rechazo de credenciales inválidas y sincronización funcionan contra Render y Supabase.
- [x] Progreso, favorito, quiz, estudio y preferencia quedan persistidos en Supabase; se eliminó la cuenta aislada de prueba.
- [x] Tutor remoto y fallback local responden.
- [x] App de escritorio abre en modo local; visor 3D, selección anatómica, Study, Quiz, Progress, Settings, cambio de idioma y tema se revisaron visualmente.
- [x] El repositorio solo incluye `.env` de frontend con la URL pública de la API; no incluye la base SQLite ni el `.env` privado del backend.
- [x] `git diff --check` pasa.

## Pendiente antes de publicar

- [ ] Desplegar el cambio de CORS de `backend/src/main.ts` en Render. El backend actual refleja `https://example.org` como origen permitido. La prueba `npm --prefix backend run release:smoke` exige que lo rechace y permita `http://tauri.localhost`.
- [ ] Repetir el smoke test tras el despliegue.
- [ ] Probar el instalador en un perfil o equipo limpio y comprobar persistencia local al reiniciar. La ejecución en este equipo usa la base SQLite existente del perfil de Windows.
- [ ] Revisar la matriz visual final en ventana estrecha, tema oscuro y claro, ES/EN, y navegación por teclado con el binario reconstruido.
- [ ] Revisar 5 avisos `high` del árbol frontend (Vite y dependencias de build) y 9 `high` + 2 `moderate` del backend (CLI, schematics y Prisma). `npm audit fix` aplicó las actualizaciones no disruptivas; no se usó `--force`.
- [ ] Archivar instaladores Windows con SHA-256 y fecha.
- [ ] Crear tag `v0.1.1` solo después de cumplir los puntos anteriores: el tag activa la publicación automática en GitHub Actions para Windows, macOS y Linux.

## Cambios de esta versión

- Se pulieron jerarquía, espaciado y navegación de Home, visor de anatomía y paneles laterales.
- Se corrigió la disposición de acciones en el panel de información para evitar textos cortados.
- Se localizaron al inglés los títulos y descripciones de evaluaciones de los seis sistemas.
- Se restringieron los orígenes CORS por defecto a la app Tauri y al servidor local de desarrollo.
- Se añadió una prueba de release reproducible para API, base de datos, tutor y CORS.
