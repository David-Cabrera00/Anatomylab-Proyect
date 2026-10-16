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

El endpoint del tutor recibe `system`, `anatomyId`, `question` y, para un proveedor de IA, el contexto educativo validado (`structureName`, `description`, `function`, `location` y `relationships`).

### Proveedores de IA y orden de fallback

La arquitectura del tutor sigue el orden jerárquico de resolución:
1. **OmniRoute**: Proveedor principal local si `AI_PROVIDER=omniroute`.
2. **OpenRouter**: Fallback externo si OmniRoute falla; también puede seleccionarse directamente con `AI_PROVIDER=openrouter`.
3. **Tutor local**: Fallback seguro si el proveedor remoto no responde.

Ollama no forma parte de esta cadena del tutor.

#### Configuración de OmniRoute (`AI_PROVIDER=omniroute`)

```text
OMNIROUTE_BASE_URL=http://127.0.0.1:20128/v1
OMNIROUTE_API_KEY=tu-api-key-aqui
OMNIROUTE_MODEL=nvidia/nemotron-3.5-super-v1:free
OMNIROUTE_TIMEOUT_MS=30000
```

#### Configuración de OpenRouter (`AI_PROVIDER=openrouter`)

```text
OPENROUTER_API_KEY=tu-api-key-aqui
OPENROUTER_MODEL=nvidia/nemotron-3-ultra:free
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_TIMEOUT_MS=30000
```

Si un proveedor falla, el endpoint pasa automáticamente al siguiente nivel de fallback y registra un error técnico resumido sin exponer credenciales ni stack traces. La clave `OPENROUTER_API_KEY` permanece protegida en el backend y nunca se envía al cliente.

La aplicación de escritorio continúa usando SQLite local-first; este servicio se añadirá como capa de sincronización y tutor remoto.
