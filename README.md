# Auto Vista

A starter template for building modern, responsive sites using Astro and Wix (Wix Vibe). Auto Vista includes prebuilt UI components, Tailwind CSS, Radix UI primitives, and integrations for Wix CMS and Members so you can jumpstart new projects quickly.

## Key features

- Astro-powered pages and fast static rendering
- Tailwind CSS for utility-first styling
- Radix UI primitives and a library of reusable components
- Wix integrations (CMS, Members) ready to connect
- TypeScript and linting setup
- Vitest for unit testing

## Prerequisites

- Node.js 18 or higher
- npm (or yarn/pnpm)
- A Wix account and site (for deployment/integrations)

## Quick start

1. Install dependencies

   ```bash
   npm run install-template
   ```

2. Create a .env file or pull environment variables

   ```bash
   npm run env
   ```

3. Start development server

   ```bash
   npm run dev
   ```

Visit http://localhost:4321 to preview the site locally.

## Project layout

- src/ — React components, pages, hooks, and styles
- integrations/ — Wix CMS and Members integration code
- public/ — Static assets
- eslint-rules/ — Custom ESLint rules

(See the repo folders for full structure and implementation details.)

## Available scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build locally
- `npm run release` — Release to Wix
- `npm run env` — Pull or setup environment variables
- `npm run check` — Type-check with Astro
- `npm run test:run` — Run tests
- `npm run install-template` — Install project dependencies

## Testing

Run unit tests with Vitest:

```bash
npm run test:run
```

## Deployment

This template can be deployed to Cloudflare Pages or integrated with your Wix site. Typical deployment steps:

1. Build the site

   ```bash
   npm run build
   ```

2. Follow your hosting provider's instructions (Cloudflare Pages or Wix) to publish the generated output.

## License

This project is provided under the MIT License. See LICENSE for details.

