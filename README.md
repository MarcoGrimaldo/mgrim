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

The resume content (profile, work, education, skills, projects) and the blog posts are served by the REST API in the `mgrim-portal` repo, which runs on Supabase. This app calls it from the server only: `getResume()` in `src/data/resume.tsx` and `getPosts()` / `getPost()` in `src/data/blog.ts`. Resume edits appear on the site within an hour, without a redeploy.

# Blog

Posts are written in Markdown (GFM, code blocks, KaTeX math) from a private dashboard:

- `/admin/login` — sign in with a Supabase Auth user that is listed in the backend's `admins` table.
- `/admin` — every post with its status (draft, published, unpublished), views, search, filters and sorting; publish, unpublish, feature or delete from the list.
- `/admin/posts/new` and `/admin/posts/<id>` — the editor, with a live preview.

Published posts appear on `/blog`, on the home page (the four most recent), in the RSS feed at `/blog/rss.xml` and in `/sitemap.xml`. Changes made in the dashboard are visible on the site immediately.

| Branch    | Vercel environment | `PORTAL_API_URL` points at |
| --------- | ------------------ | -------------------------- |
| `main`    | Production         | production Supabase project |
| `staging` | Preview            | staging Supabase project    |

# License

Licensed under the MIT license: Based on [Portafolio](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
