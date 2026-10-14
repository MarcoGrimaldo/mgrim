# CLAUDE.md

Personal portfolio for Marco Grimaldo (https://mgrim.dev), deployed on Vercel. Based on the dillionverma/portfolio template, extended with a blog that is written from a private dashboard at `/admin`.

## Commands

```bash
pnpm install
pnpm dev      # next dev, http://localhost:3000
pnpm build    # next build — the only real check; run it before finishing a change
pnpm lint     # next lint
```

- Both `pnpm-lock.yaml` and `package-lock.json` are committed. The README uses pnpm; if dependencies change, keep the lockfiles in sync.
- `pnpm build` and `pnpm dev` need `PORTAL_API_URL` in `.env.local` (see `.env.example`); every page fetches its content from that API at build time. To try a backend change that is not deployed yet, run the `mgrim-portal` stack locally and override it: `PORTAL_API_URL=http://127.0.0.1:54321/functions/v1/api pnpm dev`.
- Next caches the API response in `.next/cache/fetch-cache` for an hour. If a local build shows stale content after a backend change, delete that folder and rebuild.
- There is no ESLint config file, so `next lint` prompts interactively to create one. There are no tests. Use `pnpm build` (type check + compile) to validate.

## Stack

Next.js 14 App Router, React 18, TypeScript (strict), Tailwind CSS 3, shadcn/ui (`new-york` style, neutral base, CSS variables), Magic UI, Framer Motion, `next-themes`, react-markdown (GFM, `remark-math` + KaTeX), Shiki.

Import alias: `@/*` → `src/*`.

## Layout

```
src/
  middleware.ts             guards /admin/*: redirects to the login page, renews the session
  app/
    layout.tsx              root layout: generateMetadata from getResume(), ThemeProvider, TooltipProvider, Navbar dock
    page.tsx                home page (async server component); resume sections from getResume(), recent posts from getPosts()
    globals.css             Tailwind layers, theme variables, KaTeX stylesheet import
    sitemap.ts              home, /blog and every published post
    blog/
      page.tsx              index of published posts (search and tag filter in BlogList)
      [slug]/page.tsx       one post, statically generated, with its metadata
      rss.xml/route.ts      RSS feed
      actions.ts            recordView(): server action behind the view counter
    admin/
      login/page.tsx        the sign-in form
      page.tsx              dashboard: every post, any status
      posts/new, posts/[id] the post editor
      logout/route.ts       clears the session cookies
      actions.ts            server actions: login, savePost, deletePost
  components/
    ui/                     shadcn primitives
    magicui/                Magic UI components (blur-fade, dock, globe, magic-card, ...)
    admin/                  login form, posts dashboard, post editor, status badge (client components)
    post-content.tsx        renders a post's Markdown; shared by the post page and the editor preview
    post-card.tsx, blog-list.tsx, view-tracker.tsx
    shiki-code-block.tsx    client-side, theme-aware code highlighting
    navbar.tsx, project-card.tsx, resume-card.tsx, ...
  data/
    resume.tsx              getResume() — fetches the resume content from the mgrim-portal API; NAVBAR dock links
    blog.ts                 getPosts(), getPost(slug), the post types, POSTS_TAG
  lib/
    utils.ts                cn()
    portal.ts               portalUrl(path) → URL on the mgrim-portal API
    session.ts              names and options of the admin session cookies
    admin.ts                adminFetch(): calls /admin endpoints with the session's token
public/                     avatar, logos, project videos (.mov)
```

## Content lives in the mgrim-portal backend

Copy, links, and lists are not in this repo. They are stored in Supabase and served by the REST API in the separate `mgrim-portal` repo. `getResume()` in `src/data/resume.tsx` fetches `GET {PORTAL_API_URL}/resume` (server-side, revalidated hourly) and returns the object the pages render. `PORTAL_API_URL` is required: without it `pnpm build` fails. See `.env.example`.

To change content, edit the rows in the Supabase dashboard, or add a migration in `mgrim-portal` when the change should reach every environment. Do not hardcode content in components.

Icons arrive from the API as keys of the `Icons` map in `src/components/icons.tsx` (`"globe"`, `"github"`, `"nextjs"`); `getResume()` turns them into components. A new icon needs an entry in that map.

`NAVBAR` in `src/data/resume.tsx` defines the dock links; `contact.social` entries with `navbar: true` also appear there.

## Environments and releases

This repo is only the UI. The backend is the separate `mgrim-portal` repo (https://github.com/MarcoGrimaldo/mgrim-portal, usually checked out at `../mgrim-portal`): Supabase migrations plus a public, read-only REST API. The UI holds no Supabase client and no keys; it only needs the API's base URL.

| Git branch | Vercel environment        | `PORTAL_API_URL`                                             |
| ---------- | ------------------------- | ------------------------------------------------------------ |
| `main`     | Production (mgrim.dev)    | `https://chzulbecjriscqyitqkj.supabase.co/functions/v1/api`  |
| `staging`  | Preview                   | `https://kwtghytfaspwuctqgixu.supabase.co/functions/v1/api`  |

- Work on a branch off `staging`, open a PR into `staging`, then release with a PR from `staging` into `main`. The Preview variable applies to PR branches too, so PR previews build against the staging API.
- When a change needs new backend data or fields, deploy the backend first (the `mgrim-portal` branch of the same name), then merge here. A build against an API that lacks the data fails or renders without it.
- The fetch runs on the server (at build, then at most hourly), never in the browser, so the request does not appear in the browser's Network tab. To confirm it, look at the `api` function's invocations in the Supabase dashboard.
- Vercel preview deployments sit behind Vercel login; mgrim.dev is public.
- A content edit in Supabase reaches the site within an hour. To see it sooner, redeploy in Vercel without the build cache.

## Blog

Posts live in the `posts` table of the backend and are written in Markdown from the dashboard, not in this repo.

- Public pages read `GET /posts` and `GET /posts/:slug` through `src/data/blog.ts`. Only published posts are returned. The fetches are cached for an hour under the cache tag `POSTS_TAG`.
- A post is `draft` (never published), `published` (on the site) or `unpublished` (taken down, kept in the dashboard). `publishedAt` is set the first time a post is published and kept afterwards.
- The home page shows the four most recent posts and hides the section while there are none. `/blog` lists all of them, featured ones first.
- Post bodies render through `PostContent`: GFM, fenced code blocks highlighted by `ShikiCodeBlock`, and `$inline$` / `$$block$$` math through KaTeX. The editor preview uses the same component, so a change there affects both.
- `/notebook` and the old Project Euler URLs redirect to `/blog` (`next.config.mjs`).

### Admin dashboard

`/admin/login` is the only way in; nothing on the site links to it. Everything under `/admin` is excluded from indexing.

- Signing in posts the email and password to the API (`POST /auth/login`), which checks them with Supabase Auth and only accepts users listed in the backend's `admins` table. The UI still holds no Supabase client and no keys.
- The returned access and refresh tokens are stored in httpOnly cookies scoped to `/admin` (`src/lib/session.ts`). The access cookie expires a minute before its token; `src/middleware.ts` then exchanges the refresh token for a new session before the page or action runs. Cookies cannot be set while a server component renders, which is why the renewal is in the middleware.
- Pages and actions call the API's `/admin/*` endpoints through `adminFetch()` with the token as a bearer. The API and the database's row level security decide what the user may do; the middleware only handles navigation.
- Every write goes through `mutate()` in `src/app/admin/actions.ts`, which calls `revalidateTag(POSTS_TAG)`: publishing, editing or unpublishing shows on the public pages immediately, without waiting for the hourly revalidation.
- `/admin/logout` is a route handler reached with a plain `<a>`. Do not link to it with `<Link>`: prefetching it would sign the user out.
- To give someone access: create the user in the Supabase dashboard (Authentication), then add its id to `admins` (see the `mgrim-portal` CLAUDE.md). This is per environment.

## Conventions

- Add shadcn components with the CLI (config in `components.json`) so they land in `src/components/ui`.
- Dark mode is class-based via `next-themes` (default theme is light). Style both modes with `dark:` variants; `ShikiCodeBlock` pre-renders both themes and switches on `resolvedTheme`.
- Entrance animations use `BlurFade` / `BlurFadeText`.
- Static assets are referenced by absolute path from `public/` (e.g. `/yop.png`, `/recorre1.mov`).
