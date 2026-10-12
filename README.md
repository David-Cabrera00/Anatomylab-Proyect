# AnatomyLab AI

Aplicación de escritorio para estudiar anatomía humana con modelos 3D, fichas educativas, estudio guiado, quiz y progreso local.

## Aplicación local

```text
npm install
npm run dev
```

La aplicación usa Tauri + React + TypeScript y mantiene el progreso local en SQLite. El visor 3D y el estudio siguen funcionando sin conexión al backend.

## Backend

El backend modular está en [`backend/`](backend/README.md) y utiliza NestJS, Prisma y PostgreSQL. Incluye la base para autenticación, sincronización y tutor IA.

```text
cd backend
docker compose up -d postgres
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run start:dev
```

La API expone inicialmente:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/sync`
- `POST /api/tutor/ask`

Para conectar el cliente, define `VITE_BACKEND_URL` apuntando a la API. No se deben colocar claves de proveedores de IA en el frontend.
