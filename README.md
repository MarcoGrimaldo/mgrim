<div align="center">
</div>

# Portfolio ![Deploy with Vercel](https://vercel.com/button)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MarcoGrimaldo/mgrim
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Point the app at the backend API:

   ```bash
   cp .env.example .env.local
   ```

   Set `PORTAL_API_URL` to the staging API, or to `http://127.0.0.1:54321/functions/v1/api` when running the [mgrim-portal](https://github.com/MarcoGrimaldo/mgrim-portal) stack locally.

5. Start the local Server:

   ```bash
   pnpm dev
   ```

# Content and environments

The resume content (profile, work, education, skills, projects) is served by the REST API in the `mgrim-portal` repo, which runs on Supabase. This app only calls `GET /resume` through `getResume()` in `src/data/resume.tsx`. Content edits appear on the site within an hour, without a redeploy.

| Branch    | Vercel environment | `PORTAL_API_URL` points at |
| --------- | ------------------ | -------------------------- |
| `main`    | Production         | production Supabase project |
| `staging` | Preview            | staging Supabase project    |

# License

Licensed under the MIT license: Based on [Portafolio](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
