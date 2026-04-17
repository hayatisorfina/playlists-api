# Playlists API

NestJS API for managing playlists and their media items for a digital signage workflow.

## What This Service Does

This service exposes CRUD endpoints for:

- playlists
- media items
- attaching newly created media to a playlist
- removing media from a playlist and deleting the media record

The backend uses:

- NestJS for the application framework
- Sequelize with `sequelize-typescript` for ORM
- MySQL as the database
- class-validator for request validation

## Project Structure

The codebase is intentionally small and organized by feature.

```text
src/
  app.module.ts                  Root module and database configuration
  main.ts                        App bootstrap, validation, and CORS

  playlist/
    dto/                         Request DTOs for playlist create/update
    entities/                    Sequelize models for playlists and join table
    playlist.controller.ts       Playlist HTTP routes
    playlist.service.ts          Playlist business logic
    playlist.module.ts           Playlist module wiring

  media/
    dto/                         Request DTOs for media create/update
    entities/                    Sequelize model for media items
    media.controller.ts          Media HTTP routes
    media.service.ts             Media business logic
    media.module.ts              Media module wiring

test/
  app.e2e-spec.ts                Basic e2e test scaffold
```

## Domain Model

### Playlist

- `name`
- `description`
- `createdAt`

### Media Item

- `title`
- `durationSeconds`
- `url`

### Relationship

- A playlist can contain many media items.
- A media item can belong to many playlists.
- The join table is `playlist_media`.

## Architecture Decisions

### Feature-based module structure

The code is grouped by feature. `playlist` and `media` each have their own controller, service, DTOs, and entities.

Why:

- related code stays in one place
- it is easier to understand who owns each feature
- it is easier to grow the project later

### NestJS for API structure

NestJS helps keep the API organized. Controllers handle HTTP requests, services handle business logic, and modules connect the parts together.

Why:

- routing and business logic are separated clearly
- services can be injected easily
- it works well for a small API that may become bigger later

### Sequelize with auto-loaded models

The project uses `sequelize-typescript` for database models and connects them through Nest's Sequelize module.

Why:

- the data model is small and fits a relational database
- decorators make the entities easy to read
- `autoLoadModels: true` means less setup during early development

Tradeoff:

- this is convenient, but larger systems may prefer more explicit model registration

### `synchronize: true` for local development speed

The database connection currently uses `synchronize: true`.

Why:

- development is faster while the schema is still changing
- a new team member can start the project with less setup work

Tradeoff:

- this is useful for development, but it is not the best choice for production
- in production, database migrations are usually safer

### Playlist owns the add/remove media workflow

The main frontend flow adds media from the playlist page, so the playlist module controls this process.

Current behavior:

- `POST /playlist/:id/media` creates a media record first, then attaches it to the playlist
- `DELETE /playlist/:id/media/:mediaId` removes the playlist relation and then deletes the media record

Why:

- it matches the frontend user flow
- playlist-related changes stay inside the playlist module
- the frontend needs fewer API calls

Tradeoff:

- part of the media lifecycle now depends on playlist operations
- if media becomes more reusable across many playlists later, this design may need to change

### Global validation at the application boundary

Validation is enabled once in `main.ts` with Nest's global `ValidationPipe`.

Why:

- DTOs define the allowed input in one place
- invalid requests are rejected in a consistent way
- controllers need less repeated parsing code

### Open CORS during early integration

CORS is currently enabled for all origins.

Why:

- it makes frontend integration easier during early development
- it avoids extra setup while local clients are still changing

Tradeoff:

- this is very open and should usually be restricted before production

## Key API Routes

### Playlist routes

- `POST /playlist`
- `GET /playlist`
- `GET /playlist/:id`
- `PATCH /playlist/:id`
- `DELETE /playlist/:id`
- `POST /playlist/:id/media`
- `DELETE /playlist/:id/media/:mediaId`

`POST /playlist/:id/media` accepts media fields in the request body, creates the media item, and then attaches it to the playlist.

### Media routes

- `POST /media`
- `GET /media`
- `GET /media/:id`
- `PATCH /media/:id`
- `DELETE /media/:id`

## Local Setup

### 1. Prerequisites

Install the following first:

- Node.js 20+
- npm
- MySQL 8+ or a compatible local MySQL instance

### 2. Install dependencies

From the project root:

```bash
npm install
```

### 3. Create the database

Create a local MySQL database named `playlist`, or choose another name and use that in your environment variables.

Example:

```sql
CREATE DATABASE playlist;
```

### 4. Configure environment variables

This project reads database and port values from `process.env`.

Current variables used by the app:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

Recommended local values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=playlist
PORT=3005
```

Important:
The app does not currently load `.env` automatically through Nest `ConfigModule` or `dotenv`. Set these variables in your shell, IDE run configuration, or terminal session before starting the server.

PowerShell example:

```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_USER="root"
$env:DB_PASSWORD=""
$env:DB_NAME="playlist"
$env:PORT="3005"
```

### 5. Start the API in development mode

```bash
npm run start:dev
```

The API will start on `http://localhost:3005` unless `PORT` is overridden.

### 6. Verify the app is running

Call a simple endpoint such as:

```bash
curl http://localhost:3005/playlist
```

If the database connection is valid, you should get a JSON response.

## Development Notes

- Validation is enabled globally in [src/main.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/main.ts:5).
- Unknown request fields are rejected because `forbidNonWhitelisted` is enabled.
- CORS is open to all origins right now.
- Sequelize `synchronize: true` is enabled in [src/app.module.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/app.module.ts:8), so local schema changes may be applied automatically at startup.

## Useful Commands

```bash
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run lint
```

## Where To Start As A New Team Member

If you are joining the project, read the code in this order:

1. [src/main.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/main.ts:1) to understand app bootstrap and global middleware.
2. [src/app.module.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/app.module.ts:1) to understand database setup and feature modules.
3. [src/playlist/playlist.controller.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/playlist/playlist.controller.ts:1) and [src/playlist/playlist.service.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/playlist/playlist.service.ts:1) for the main business flow.
4. [src/media/media.controller.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/media/media.controller.ts:1) and [src/media/media.service.ts](/abs/path/c:/Users/Barcove/Code/playlists-api/src/media/media.service.ts:1) for media-specific operations.
5. The DTOs and entity files under `src/playlist` and `src/media` for validation and data shape details.
