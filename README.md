# Histhack Platform Prototype

NestJS-based prototype for a video sharing platform prepared for the Histhack contest. The stack includes PostgreSQL (Prisma), BullMQ for background processing, AWS S3-compatible storage, and both REST and GraphQL APIs.

## Getting started

```bash
npm install
npx prisma generate
npm run start:dev
```

Environment variables:

- `DATABASE_URL` – PostgreSQL connection string
- `JWT_SECRET` – secret used to sign JWT tokens
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET` – storage credentials
- `AWS_S3_ENDPOINT` – optional custom S3 endpoint (e.g. MinIO)
- `AWS_S3_PUBLIC_URL_BASE` – optional public base URL for generated asset links
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` – BullMQ connection

## Modules and responsibilities

- **Auth** – registration and login endpoints issuing JWT tokens
- **Users** – user lookup API
- **Videos** – REST and GraphQL queries for listing and fetching video details
- **Uploads** – orchestrates S3 uploads and enqueues FFmpeg transcoding
- **Moderation** – automatic keyword-based checks, manual review workflow, and abuse reports
- **Queue** – BullMQ queue + worker simulating FFmpeg transcoding and thumbnail generation

## Database schema (Prisma)

Models implemented: `User`, `Video`, `Tag`, `VideoTag`, `View`, `Like`, `Report` with supporting enums for user roles, video status, and report status.
