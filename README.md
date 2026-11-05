# Quiz Crafter

A full-stack quiz application built with React, TypeScript, and Express. The project uses a modern component-based frontend and a typed server-side application structure.

## Technology

- **Frontend:** React 19, Vite, TypeScript
- **Backend:** Node.js, Express
- **Data layer:** PostgreSQL tooling with Drizzle ORM
- **UI:** Radix UI, Tailwind CSS, Lucide
- **Forms & validation:** React Hook Form, Zod
- **Charts:** Recharts

## Getting started

### Requirements
- Node.js
- PostgreSQL
- npm

### Install dependencies
```bash
npm install
```

Configure the environment variables required by the application and database before starting the server.

### Run locally
```bash
npm run dev
```

### Check and build
```bash
npm run check
npm run build
npm start
```

To apply database schema changes, configure the database connection and run:

```bash
npm run db:push
```

## Development

The codebase is organized around a React client and an Express server. TypeScript is used across the application to keep application contracts explicit.

## Security

Do not commit API keys, database credentials, session secrets, or production environment files. Use local environment configuration and your deployment platform's secret manager.

## License

MIT
