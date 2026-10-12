# AnatomyLab AI

AnatomyLab AI es una aplicación de escritorio para estudiar anatomía humana mediante modelos 3D interactivos, fichas educativas, estudio guiado, quizzes y seguimiento del progreso.

El proyecto está diseñado con una arquitectura **local-first**: la aplicación continúa funcionando con SQLite local aunque el backend no esté disponible. Cuando existe una sesión conectada, los datos de aprendizaje se sincronizan con el backend y PostgreSQL.

## Funcionalidades

- Visor 3D interactivo con selección, resaltado, aislamiento, ocultamiento, transparencia, enfoque y restablecimiento.
- Seis sistemas anatómicos: cardiovascular, respiratorio, nervioso, esquelético, muscular y digestivo.
- Fichas educativas asociadas a identidades anatómicas estables.
- Búsqueda global por nombre, sistema, región, capa, lateralidad, palabras clave y `anatomyId`.
- Modo de estudio guiado para los seis sistemas.
- Quiz anatómico con historial, respuestas y estadísticas de maestría.
- Favoritos, preferencias, sesiones de estudio e historial local.
- Interfaz en español e inglés.
- Tema claro y oscuro.
- Autenticación con registro e inicio de sesión.
- Sincronización de progreso, favoritos, quizzes, sesiones y preferencias.
- Modo local de respaldo cuando no hay conexión con el backend.
- Tutor anatómico local preparado para conectarse posteriormente a un proveedor real de IA.

## Arquitectura

```text
anatomylab/
├── src/                  # Frontend React + TypeScript
│   ├── anatomy/          # Identidades estables y catálogos anatómicos
│   ├── components/       # Componentes de interfaz
│   ├── data/             # Fichas, guías y preguntas
│   ├── search/           # Índice de búsqueda global
│   ├── three/            # Visor 3D y bindings de modelos
│   ├── utils/            # SQLite, API y sincronización
│   └── views/            # Vistas principales de la aplicación
├── public/models/        # Modelos GLB de los seis sistemas
├── src-tauri/            # Shell de escritorio y comandos SQLite
├── backend/              # API NestJS + Prisma + PostgreSQL
└── scripts/              # Auditorías y validaciones anatómicas
```

### Identidades anatómicas

Cada estructura utiliza un `anatomyId` estable. Estos identificadores son la referencia para fichas, búsqueda, estudio, quiz, favoritos, progreso, SQLite y sincronización con el backend.

Los nombres internos de los nodos GLB se utilizan únicamente como bindings técnicos del visor y no como identidad persistente.

## Requisitos

- Node.js 20 o superior.
- npm.
- Docker Desktop para ejecutar PostgreSQL y el backend localmente.
- Rust y los requisitos de Tauri si se desea compilar la aplicación de escritorio.

## Ejecutar el frontend

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Esto inicia Vite en el puerto `1420`.

Para ejecutar la aplicación como escritorio con Tauri:

```bash
npm run tauri dev
```

El frontend funciona en modo local sin iniciar el backend. El progreso y las preferencias se almacenan en SQLite mediante Tauri.

## Ejecutar el backend

El backend se encuentra en [`backend/`](backend/README.md).

### 1. Instalar dependencias

```bash
npm run backend:install
```

### 2. Iniciar PostgreSQL

```bash
cd backend
docker compose up -d postgres
```

PostgreSQL queda disponible en `localhost:55432`. Dentro de la red de Docker, el servicio utiliza el puerto interno `5432`.

### 3. Configurar variables de entorno

En Windows:

```powershell
Copy-Item .env.example .env
```

En macOS/Linux:

```bash
cp .env.example .env
```

El archivo `.env` contiene valores locales y no debe subirse al repositorio. Las claves de proveedores externos deben mantenerse exclusivamente en el backend.

### 4. Preparar Prisma y la base de datos

Desde la raíz del proyecto:

```bash
npm run backend:prisma:generate
npm run backend:prisma:migrate
```

### 5. Iniciar la API

```bash
npm run backend:dev
```

La API queda disponible en `http://localhost:3000`.

Para conectar el frontend a otra URL, define:

```text
VITE_BACKEND_URL=http://localhost:3000/api
```

Si no se define, el cliente utiliza esa URL local por defecto.

## API disponible

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado de la API |
| `POST` | `/api/auth/register` | Crear una cuenta |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `POST` | `/api/sync` | Sincronizar datos del usuario |
| `POST` | `/api/tutor/ask` | Endpoint preparado para el tutor |

Las rutas protegidas requieren `Authorization: Bearer <accessToken>`.

La sincronización actual incluye progreso por sistema y `anatomyId`, favoritos, historial de quizzes y respuestas, sesiones de estudio y preferencias del usuario.

## Tutor de IA

La interfaz del tutor y el endpoint backend ya están preparados, pero la conexión con un proveedor real de IA queda pendiente de decisión.

Cuando se elija el proveedor, la clave debe configurarse únicamente en el backend mediante variables de entorno. Nunca se deben incluir claves de IA en React, Vite, Tauri ni en el repositorio.

## Scripts principales

```bash
npm run dev                 # Desarrollo web con Vite
npm run build               # Compilación de producción del frontend
npm run preview             # Vista previa del build
npm run tauri dev           # Aplicación de escritorio
npm run audit:anatomy      # Auditoría global de anatomía
npm run backend:install     # Instalar dependencias del backend
npm run backend:dev         # Ejecutar NestJS en desarrollo
npm run backend:build       # Compilar el backend
npm run backend:prisma:generate
npm run backend:prisma:migrate
npm --prefix backend run security:smoke # Pruebas de seguridad locales
```

Validaciones recomendadas antes de un commit:

```bash
npx tsc --noEmit
npm run build
npm run audit:anatomy
git diff --check
```

## Estado actual

La base funcional del producto está implementada y validada: visor 3D, contenido anatómico, estudio, quiz, persistencia local, autenticación, backend y sincronización.

El trabajo pendiente principal es seleccionar e integrar el proveedor real del tutor de IA, además de preparar la configuración de despliegue y endurecimiento para producción.

## Control de versiones y secretos

No subir al repositorio:

- `backend/.env`
- Claves API, contraseñas o tokens JWT.
- `node_modules/`
- `dist/` o `backend/dist/`
- Bases de datos locales y volúmenes de Docker.

Sí deben versionarse las migraciones de Prisma, los archivos `.env.example`, los `package-lock.json` y el código fuente necesario para reproducir el proyecto.
