# AnatomyLab v0.1.0 — Checklist de Release Candidate

Objetivo: validar el ejecutable y los servicios desplegados antes de distribuir la versión `v0.1.0`.

## 1. Producción

- [ ] API desplegada en Render responde `GET /api/health`.
- [ ] Frontend apunta a la URL de producción correcta mediante `VITE_BACKEND_URL`.
- [ ] Supabase acepta conexiones desde el backend desplegado.
- [ ] CORS permite únicamente los orígenes necesarios.
- [ ] `JWT_SECRET` y claves del proveedor IA existen solo en Render.
- [ ] Los logs no exponen tokens, contraseñas ni claves.

## 2. Cuenta y sincronización

- [ ] Registrar una cuenta nueva.
- [ ] Iniciar sesión con credenciales válidas.
- [ ] Rechazar credenciales inválidas sin filtrar información sensible.
- [ ] Crear progreso, favoritos, sesión de estudio y resultado de quiz.
- [ ] Confirmar que los datos aparecen después de cerrar y abrir la aplicación.
- [ ] Confirmar sincronización al cambiar entre modo local y sesión conectada.

## 3. Tutor IA

- [ ] Abrir el tutor desde una estructura anatómica.
- [ ] Enviar una pregunta contextualizada.
- [ ] Confirmar respuesta del proveedor remoto.
- [ ] Confirmar fallback local si el proveedor remoto falla.
- [ ] Confirmar que nunca se envía una clave al cliente.

## 4. Ejecutable `.exe`

- [ ] Instalar o ejecutar en una máquina limpia.
- [ ] Abrir la aplicación sin backend disponible.
- [ ] Confirmar persistencia local SQLite.
- [ ] Conectar con producción y confirmar sincronización.
- [ ] Cambiar tema e idioma.
- [ ] Probar visor 3D, Study, Quiz, Progress, Profile y Settings.
- [ ] Cerrar y reabrir sin perder preferencias ni progreso local.
- [ ] Verificar que no se distribuyen `.env`, claves ni bases locales.

## 5. Calidad visual

- [ ] Revisar Login, Home, Anatomy, Study, Quiz y Progress en tema claro.
- [ ] Repetir en tema oscuro.
- [ ] Repetir en español e inglés.
- [ ] Revisar ventana estrecha y textos largos.
- [ ] Navegar controles principales solo con teclado.
- [ ] Confirmar focus visible y contraste suficiente.

## 6. Cierre de versión

- [ ] Ejecutar `npm run build`.
- [ ] Ejecutar `npm run audit:anatomy`.
- [ ] Ejecutar `git diff --check`.
- [ ] Actualizar changelog/notas de versión.
- [ ] Crear tag `v0.1.0`.
- [ ] Archivar el `.exe` final con checksum y fecha de compilación.
