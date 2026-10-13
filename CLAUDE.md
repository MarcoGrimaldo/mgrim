# CLAUDE.md

Personal portfolio for Marco Grimaldo (https://mgrim.dev), deployed on Vercel. Based on the dillionverma/portfolio template, extended with a "Notebook" section of interactive Project Euler write-ups.

## Commands

```bash
pnpm install
pnpm dev      # next dev, http://localhost:3000
pnpm build    # next build — the only real check; run it before finishing a change
pnpm lint     # next lint
```

- Both `pnpm-lock.yaml` and `package-lock.json` are committed. The README uses pnpm; if dependencies change, keep the lockfiles in sync.
- There is no ESLint config file, so `next lint` prompts interactively to create one. There are no tests. Use `pnpm build` (type check + compile) to validate.

## Stack

Next.js 14 App Router, React 18, TypeScript (strict), Tailwind CSS 3, shadcn/ui (`new-york` style, neutral base, CSS variables), Magic UI, Framer Motion, `next-themes`, KaTeX, Shiki.

Import alias: `@/*` → `src/*`.

## Layout

```
src/
  app/
    layout.tsx              root layout: metadata from DATA, ThemeProvider, TooltipProvider, Navbar dock
    page.tsx                home page ("use client"); renders every section from DATA
    globals.css             Tailwind layers, theme variables, KaTeX stylesheet import
    notebook/
      page.tsx              index of problems, from DATA.eulerProblems
      project-euler-N/
        page.tsx            one interactive write-up per problem
        code.js             the solution function (problems 4+)
  components/
    ui/                     shadcn primitives (+ MagicCardProblem)
    magicui/                Magic UI components (blur-fade, dock, globe, magic-card, ...)
    shiki-code-block.tsx    client-side, theme-aware code highlighting
    navbar.tsx, project-card.tsx, resume-card.tsx, hackathon-card.tsx, ...
  data/resume.tsx           DATA — single source of truth for all site content
  lib/
    utils.ts                cn()
    renderMath.ts           renderMath(expr, displayMode) → KaTeX HTML string
public/                     avatar, logos, project videos (.mov)
```

## Content lives in `src/data/resume.tsx`

All copy, links, and lists come from the `DATA` object (`as const`). Change content there, not in the components. It is a `.tsx` file because entries embed icon JSX.

Two keys have names that don't match what they render:

- `DATA.hackathons` — a leftover name from the template. It drives the home page's Project Euler timeline (newest first, including the in-progress problem with `dates: "Currently working on it..."`).
- `DATA.eulerProblems` — drives the `/notebook` index cards (oldest first in the data; the page reverses it).

`DATA.navbar` defines the dock links; `DATA.contact.social` entries with `navbar: true` also appear there.

## Adding a Project Euler problem

Take `src/app/notebook/project-euler-6/` as the reference.

1. Create `src/app/notebook/project-euler-N/code.js` exporting the solution function.
2. Create `page.tsx` beside it as a `"use client"` component with the same structure as the other problems: problem statement card, explanation card with formulas and the solution source, an interactive "try it" card with input validation and an upper bound on the input, then Previous/Next buttons.
   - The source shown on the page is a separate `codeSolution` template string passed to `<ShikiCodeBlock code={...} lang="javascript" />`. It is a hand-kept copy of `code.js`, so update both together.
   - Formulas: `renderMath(latex, displayMode)` plus `dangerouslySetInnerHTML`. Backslashes must be escaped in the string (`\\frac`, `\\cdots`).
3. Add a "Next Problem" link to problem N−1's page; the newest problem only has "Previous Problem".
4. In `src/data/resume.tsx`:
   - append an entry to `eulerProblems` (emoji-prefixed title, description, `link`);
   - in `hackathons`, mark the problem "Done!" and add the "My solution here" link, then add the next problem at the top as the in-progress entry.

## Conventions

- Add shadcn components with the CLI (config in `components.json`) so they land in `src/components/ui`.
- Dark mode is class-based via `next-themes` (default theme is light). Style both modes with `dark:` variants; `ShikiCodeBlock` pre-renders both themes and switches on `resolvedTheme`.
- Entrance animations use `BlurFade` / `BlurFadeText` on the home and notebook index pages, and `motion.div` on problem pages.
- Static assets are referenced by absolute path from `public/` (e.g. `/yop.png`, `/recorre1.mov`).
