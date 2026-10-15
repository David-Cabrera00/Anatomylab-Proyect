# AnatomyLab Backend

Backend modular de AnatomyLab construido con NestJS, TypeScript, Prisma y PostgreSQL.

## Módulos previstos

- `auth`: registro, inicio de sesión y sesiones.
- `users`: perfil y preferencias.
- `sync`: sincronización de progreso, favoritos, quiz e historial.
- `anatomy`: consulta de fichas por `anatomyId` estable.
- `tutor`: proveedor de IA con la clave protegida en el servidor.

## Inicio local

1. Copiar `.env.example` como `.env`.
2. Ejecutar `docker compose up -d postgres` para levantar PostgreSQL local.
3. Ejecutar `npm install` dentro de `backend/`.
4. Ejecutar `npm run prisma:generate`.
5. Ejecutar `npm run prisma:migrate -- --name init`.
6. Ejecutar `npm run start:dev`.

Desde Windows, PostgreSQL queda publicado en `localhost:55432`; dentro de Docker la API usa `postgres:5432`.

Endpoints iniciales:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/sync` (Bearer token)
- `POST /api/tutor/ask` (Bearer token)

El endpoint del tutor recibe `system`, `anatomyId`, `question` y, para un proveedor de IA, el contexto educativo validado (`structureName`, `description`, `function`, `location` y `relationships`). Con `AI_PROVIDER=ollama`, el backend usa el modelo local configurado mediante `OLLAMA_MODEL` y solo se conecta a una dirección local.

La configuración local de Ollama es:

```text
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3:latest
OLLAMA_TIMEOUT_MS=30000
```

Si Ollama no está disponible, el endpoint devuelve un fallback controlado y el backend registra únicamente un error técnico resumido. No se exponen stack traces al cliente ni se guarda la respuesta generada en SQLite.

La aplicación de escritorio continúa usando SQLite local-first; este servicio se añadirá como capa de sincronización y tutor remoto.
