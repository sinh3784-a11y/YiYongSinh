# Agent Guide — `typescript-web`

Personal developer portfolio SPA (React 19 + TypeScript 6 strict + Vite 8).
This file is the map for AI agents: what the project is, how to run it, the
conventions to follow, and where the traps are. Read it before editing anything.

The prose README is for humans. This file is for you.

---

## 1. What This Project Is

A single-scroll portfolio site for **Yi YongSinh** ("YS"), backend developer
and full-stack learner. Static content, no router, no API layer, no state
library, no test suite. Two runtime dependencies (react, react-dom). Light and
dark theme.

| # | Component | Section id |
|---|-----------|------------|
| 1 | `Navbar` | — (sticky bar) |
| 2 | `Hero` | `#home` |
| 3 | `About` | `#about` |
| 4 | `Skills` | `#skills` |
| 5 | `Now` | `#now` |
| 6 | `Experience` | `#experience` |
| 7 | `Projects` | `#projects` |
| 8 | `Recognition` | `#recognition` |
| 9 | `Contact` | `#contact` |
| 10 | `Footer` | — |

`App.tsx` also renders an `aria-hidden` aurora backdrop and a skip link to
`#main`, and `<main id="main">` wraps sections 2–9.

Shared building blocks, not sections: `SectionHeading`, `CodeSnippet`, `Icon`,
`Reveal`, `CountUp`, `CopyEmail`, `ThemeToggle`, `Words`.

---

## 2. Commands

```bash
npm run dev       # vite
npm run build     # tsc -b && vite build   <- the only thing that catches type errors
npm run lint      # oxlint
npm run preview   # vite preview
```
**Baseline (clean tree): `tsc` 0 errors, `oxlint` 0 warnings.**

The `Footer` `react/purity` warning and the `useTheme`
`react/set-state-in-effect` warning are both fixed. If you see a warning, you
caused it. There is no `test`, `format`, or `typecheck` script. Do not claim
otherwise.

`react/set-state-in-effect` is enabled by default in oxlint's react plugin, so
any hook that calls `setState` synchronously in an effect will fail the lint.
The fix is never to disable the rule — see trap 19.

---

## 3. Verifying your work

There is no test runner, so verify like this:

```bash
npm run build && npx oxlint --format=default .
```

For a real runtime smoke test without a browser, render the tree in Node —
this catches undefined property access and bad hooks that `tsc` will not:

```bash
cat > src/__smoke.tsx <<'EOF'
import { writeFileSync } from "node:fs"
import { renderToString } from "react-dom/server"
import App from "./App"
writeFileSync(".smoke/out.html", renderToString(<App />))
EOF
npx vite build --ssr src/__smoke.tsx --outDir .smoke --logLevel warn && node .smoke/__smoke.js
grep -c 'undefined\|NaN\|\[object Object\]' .smoke/out.html   # expect 0
rm -rf src/__smoke.tsx .smoke
```

Note `.smoke/` must be **inside the project** — building to `/tmp` leaves
`react-dom` unresolvable at runtime.

Use `grep -o … | wc -l`, not `grep -c`, for any per-element count. `renderToString`
emits the whole page on **one line**, so `grep -c` returns 1 and looks like a
failure.

For CSS/JSX drift (this class of bug has bitten this repo before), diff the
class names in `src/**/*.tsx` against the selectors in `src/index.css` and
confirm nothing is orphaned in either direction. Expect false positives for
classes assembled in code — `reveal`, `stagger`, `icon`, `nav-link*`,
`nav-links*`, `navbar*`, `section-heading-center`, and the `tok-*` set are all
built by a ternary or a lookup, so grep will not see them. Also expect the
section modifier classes (`section now`, `section about`, `section skills`,
`section experience`, `section projects`, `section recognition`) to show up as
"in tsx, not in css" — they are unused scoping hooks, not a typo. Everything
else in that list is a real bug.

Five assertions worth adding to the smoke test whenever you touch motion or
markup, since `tsc` and the browser-less render both stay silent about them:

```bash
# 1. the reveal must NOT be armed in server HTML, or the page is blank without JS
grep -c 'data-reveal-armed' .smoke/out.html        # expect 0

# 2. a list wrapped in a Reveal div keeps no list semantics — assert the tag
grep -oE '<[a-z]+[^>]*class="stagger timeline"' .smoke/out.html   # expect <ol

# 3. count-up stats must ship their real value, not a zero, for crawlers/no-JS
grep -o 'class="stat-value"[^<]*<span>[0-9]*</span>' .smoke/out.html

# 4. skill meters must be sized from data on the server
grep -o 'style="--level:' .smoke/out.html | wc -l   # expect one per skill, 20

# 5. every <li> needs a real list parent somewhere above it
#    (see trap 8 — this has now bitten three lists, not one)
```

Assertion 2 generalises: run it over **every** `stagger` wrapper, not just the
timeline.

```bash
grep -oE '<[a-z]+[^>]*class="stagger[^"]*"' .smoke/out.html
# each line must be a <ul> or <ol> if its children are <li>
```

---

## 4. Tech Stack

| Package | Installed |
|---|---|
| react / react-dom | 19.3.0 |
| typescript | 6.0.3 |
| vite | 8.3.1 (Rolldown + Lightning CSS) |
| @vitejs/plugin-react | 6.1.1 (Oxc transform) |
| oxlint | 1.86.0 |

Nothing else. **Check `package.json` before using a library.** Do not add a
dependency without asking. There is deliberately no `clsx`, no icon package, no
date library, no test runner.

---

## 5. Layout

```
├── index.html              shell: meta, OG, JSON-LD Person, theme-color,
│                           and the inline pre-paint theme script, #root
├── vite.config.ts          plugins: [react()] only. No aliases.
├── tsconfig.json           solution file, references app + node
├── tsconfig.app.json       strict: true, verbatimModuleSyntax,
│                           erasableSyntaxOnly, noUnusedLocals/Parameters,
│                           noEmit, jsx: react-jsx
├── src/
│   ├── main.tsx            createRoot + StrictMode, imports index.css
│   ├── App.tsx             aurora backdrop, skip link, navbar, sections,
│   │                       footer
│   ├── index.css           ~2630 lines — the entire stylesheet. Theme
│   │                       tokens live in `:root` and the light overrides in
│   │                       `:root[data-theme="light"]`. All motion lives in
│   │                       one MOTION block at the bottom, one numbered group
│   │                       per effect (13 groups).
│   ├── data/               profile, skills, projects, experience, about, now,
│   │                       recognition, navigation
│   ├── types/              profile, skill, project, experience, navigation, css
│   ├── hooks/
│   │   ├── useScrollSpy.ts      useScrollSpy + useScrolled
│   │   ├── useInView.ts         one-shot scroll reveal (ref-driven)
│   │   ├── useScrollProgress.ts reading bar (ref-driven, rAF)
│   │   ├── useParallax.ts       hero drift + fade (ref-driven, rAF)
│   │   ├── useTilt.ts           cursor tilt + glow (writes CSS vars)
│   │   ├── useMagnetic.ts       cursor pull on buttons (writes CSS vars)
│   │   ├── useCountUp.ts        number count-up (rAF, writes textContent)
│   │   └── useTheme.ts          light/dark (useSyncExternalStore)
│   └── components/         19 files, flat
└── public/favicon.svg      YS monogram
```

No `assets/`, no `context/`, no `pages/`, no test directories. The previous
template leftovers (`App.css`, `src/assets/*`, `public/icons.svg`) were deleted.

### The reveal contract

`Reveal` wraps a section; `useInView` arms it by setting
`data-reveal-armed="hidden"` from JS and deletes that attribute once the element
intersects. The hidden state only exists in CSS **under that attribute**, so
no-JS, a JS error, a missing `IntersectionObserver`, and
`prefers-reduced-motion: reduce` all leave the page readable. Both hooks are
ref-driven and never call `setState`. See `README.md` → *Motion* before editing
anything in this area.

### The theme contract

`<html data-theme>` is the single source of truth, and it is written **before
first paint** by a four-line inline script in `index.html` (localStorage, then
`prefers-color-scheme`, then dark on error). `src/index.css` keys off
`:root[data-theme="light"]`, so no component knows which theme is active.

`useTheme` reads that attribute back through `useSyncExternalStore` rather than
`useState`. Do not "simplify" it back — see trap 19.

---

## 6. The Rule That Matters Most

**All content lives in `src/data/`. Never hardcode copy in a component.**

`src/data/profile.ts` is the single source of personal truth — name, role,
bio, email, location, socials, resume URL, Formspree ID, plus the hero, contact
and footer copy. Several files there still contain **placeholder values marked
`<-- REPLACE`** (`you@example.com`, `your-handle`). Do not "fix"
those by inventing real-looking values, and do not remove the markers. The user
fills them in.

Three data files hold placeholder *copy* instead of placeholder values, with no
markers at all, so they read as finished: `experience.ts`, `now.ts` and
`recognition.ts`. Treat all of it as scaffolding.

The same strings are duplicated in `index.html` (title, meta description, OG
tags, JSON-LD, `theme-color`) because crawlers do not execute React. **If you
change a value in `profile.ts`, say so — `index.html` may also need updating.**
It is a known, intentional duplication, not an oversight.

Adding a section means: data in `src/data/`, component in `src/components/`,
register in `App.tsx`, add an anchor in `navigation.ts`, and style it in
`index.css`.

---

## 7. Conventions

**Components**
- `function Name() { ... }` then `export default Name` on the last line.
  Never an arrow component, never a named export — one default export per file.
- File name matches the component name, PascalCase.
- Props typed by a local `interface XxxProps`, destructured in the signature.
- `interface` over `type`. No enums/namespaces (`erasableSyntaxOnly`).
- `import type` for type-only imports (`verbatimModuleSyntax`).
- `.map()` always gets a `key`. State is `useState` only — no context, no
  reducer, no store.
- Exactly three components are stateful: `Navbar`, `Contact`, `CopyEmail`.

**State**
- `useState` for anything a visitor did.
- `useSyncExternalStore` for state that already lives outside React — that is
  currently only the theme, whose store is `<html data-theme>`.
- Never `setState` in an effect to mirror something already in the DOM. See
  trap 19.

**Styles**
- One global file. No CSS Modules, no CSS-in-JS, no Tailwind, no preprocessor.
- Tokens first: colours, radii, spacing, easing, `--container`, `--nav-height`
  all live in `:root`. The light theme overrides them in
  `:root[data-theme="light"]`. Reach for a token before writing a raw hex.
- **Any new colour needs a light-theme value too**, or it is a dark-theme hex
  reused on a white background. That is how the first light-mode pass went
  wrong, and the fix was tokenising the leftovers.
- Kebab-case classes mirroring components. Conditional classes are plain
  ternaries — there is no `clsx`.
- The only `style` props allowed are the four custom properties in trap 18.
- If you add a motion effect, it goes in the numbered MOTION block at the bottom
  with the other groups, not next to the component.

**Formatting**
No formatter is configured. The convention is **2-space indent, double quotes,
no semicolons** — use that. Do not reformat files you are not otherwise changing.

---

## 8. Traps

**Functional**
1. `navigation.ts` links and the `<section id>`s are coupled. A nav entry
   without a matching section is silently skipped by the scroll-spy; a section
   without a nav entry is unreachable from the navbar. Keep both in sync.
2. `useScrollSpy` keys its effect off `ids.join("|")` so an inline
   `.map()` array does not resubscribe every render. If you change that,
   you reintroduce a scroll-listener leak. Pass a module-level array —
   `navIds` exists for exactly this.
3. `Footer` reads the year at **module scope**. Moving `new Date()` back into
   the component body brings back the `react/purity` lint warning and breaks
   pure rendering.
4. `CodeSnippet` runs a small regex tokenizer. The alternation order matters —
   comments, then strings, then keywords, then numbers. Reordering lets a digit
   inside a string highlight as a number.
5. The contact form is inert until `formspreeId` stops matching `/^YOUR_/`. That
   guard is what stops it firing a doomed request; keep it.
6. `Icon` splits filled brand marks from stroked UI glyphs and picks a branch with
   an `in` check plus an explicit type guard. A bare `in` narrowing will not
   satisfy `tsc` on the negative branch.
7. Grid children need `min-width: 0` (see `.hero-content`, `.project-content`) or
   long strings push their track wider than intended.
8. `Reveal` renders a **`div`** by default. Wrapping a list in it orphans the
   `li`/`article` children and quietly breaks the list semantics —
   `renderToString` will not warn you. Pass `as` when the wrapper is a list:
   `<Reveal stagger as="ol" className="timeline">`. This has now happened
   **three times** — `timeline`, `now-list` and `recognition-grid` all shipped
   as `div` wrappers around `<li>` children. Any new list gets `as` from the
   start, and assertion 5 in §3 catches it.
9. The reveal animates **`translate`**, not `transform`, on purpose. Hover
   effects use `transform`; the two properties compose, so they can have
   different durations. Moving the reveal onto `transform` puts a single
   `transition` list in charge of both and every hover animates at the reveal's
   0.7s. Entrances go on `translate`, hovers go on `transform`.
10. `useInView` and `useScrollProgress` must stay ref-driven. Neither calls
    `setState` from a scroll or observer callback. Adding state here re-renders
    the whole tree on every frame and undoes the point of the hooks.
11. `useInView` arms the hidden state by **setting an attribute from JS**, never
    by shipping `opacity: 0` in CSS. The attribute only exists after hydration,
    which is what keeps the page readable with no JS, on a JS error, or when
    `IntersectionObserver` is missing. Do not "simplify" this into a static rule.
12. Same inversion applies to the skill meter: `scaleX(1)` is the base state and
    `scaleX(0)` only applies under `[data-reveal-armed="hidden"]`. Default it to
    empty and a JS failure leaves twenty blank bars.
13. **Entrances use `translate`, hovers use `transform`.** Separate properties,
    they compose. Merge them onto `transform` and one transition list clobbers
    the other — the symptom is cards that "feel broken" on hover rather than an
    error.
14. **Never set `transform` on an element running a filled animation.** The hero
    entrance uses `animation-fill-mode: both`, so it wins over `transform`
    permanently. This is why the hero fade is on `.code-card` and not on
    `.hero-visual`, and why the parallax moved to `translate`.
15. `CountUp` renders the **final** number in the markup and only rewrites it to
    `0` after hydrating. Rendering `0` server-side would show visitors and
    crawlers a zero. Check `grep 'class="stat-value"'` against the SSR output if
    you touch it.
16. `SkillGroupCard` exists so each panel can own a tilt ref. A hook cannot be
    called from a `.map()` callback — do not inline it back into the list.
17. `useTilt` writes CSS custom properties and never `transform`. The tilt, the
    `--tilt-lift` hover and the reveal all share one `transform` chain, and only
    CSS can compose them. It also bails without `(hover: hover) and
    (pointer: fine)`; on touch there is no `pointerleave` to reset it.
18. There are exactly **four** sanctioned `style` props in the project, and all
    four are CSS custom properties that cannot be expressed any other way. React
    types `style` as `CSSProperties`, which rejects `--var` keys, so each one is
    declared as a separate `const xStyle: CSSVars` — inline the object and
    `tsc` will fail you into casting it.

    | Property | Where | Why |
    |---|---|---|
    | `--level` | `Skills.tsx` | meter width comes from `skill.level`; CSS cannot read a custom property out of a `data-` attribute |
    | `--marquee-count` | `Hero.tsx` | marquee duration is `count × 3.4s`; the loop length is data |
    | `--word-delay` | `Words.tsx` | base delay for the headline stagger |
    | `--i` | `Words.tsx` | per-word index, drives `animation-delay: calc(...)` |

    Anything else with a `style` prop is a mistake. Use a class, a `data-`
    attribute, or a hook that writes to the DOM directly.
19. **`useTheme` must not use `useState`.** The theme lives on
    `<html data-theme>`, written before first paint by the inline script in
    `index.html`. A `useState` initializer would have to read the DOM (which does
    not exist during SSR), and seeding it client-side makes hydration compare the
    server's `null` against a real theme and report a mismatch. That is why it is
    `useSyncExternalStore` with `getServerSnapshot` returning `null`, which is
    also what keeps `react/set-state-in-effect` quiet. Reverting to
    `useState` + `setTheme` in a mount effect reintroduces that warning.
20. **The theme has two sources of truth that must not drift.** `THEME_COLOR` in
    `useTheme.ts`, the two `content` values in the inline script in `index.html`,
    and `--bg` in `src/index.css` are the same two hex values in three places.
    They tint the mobile address bar, so they have to agree.
21. **A dark-theme hex reused in the light theme is the default failure mode of
    this codebase now.** Light mode is one `[data-theme="light"]` block that
    re-declares the tokens; anything hardcoded instead of tokenised silently
    keeps its dark value on white. Tokenise first.
22. `useMagnetic` writes `--magnetic-x` / `--magnetic-y` and never `transform`,
    for the same reason `useTilt` does — the pull, the hover lift, the focus ring
    and the entrance animation all need to be in one `transform` chain, and only
    CSS can build it. It also bails on touch: a magnet with no `pointerleave` to
    release it is worse than no magnet.
23. **Never use `document.documentElement`'s box as a viewport proxy.** Its
    `getBoundingClientRect().height` is the whole *document* (~9900px here), not
    the window. `useParallax` did exactly that and divided the hero's viewport
    position by the page height, so on load it computed "already 95% scrolled
    past", set `--parallax-fade: 0.84`, and painted the entire hero — text, name,
    buttons, code card — at `opacity: 0.37`. Measured, every hero element sat
    between **1.6:1 and 2.4:1** contrast. Use `window.innerHeight`, or an
    explicit `root` element the caller really means.
24. `CopyEmail`'s fallback path is deliberate. `navigator.clipboard` needs a
    secure context and is simply absent on plain http, so instead of a button
    that silently does nothing, it selects the address on screen and says so. Do
    not "simplify" it to a no-op or remove the `role="status"` region.

**Measuring contrast on this site**
`tsc`, `oxlint` and `renderToString` all pass while the page is illegible, so
contrast has to be checked against what is actually painted. Two traps in that:

- Contrast is against the **rendered** background, not `--bg`. `body` lays down
  two `radial-gradient`s on top of `--bg`, and the aurora blobs drift, so the
  local backdrop moves. Tokens verified against `--bg` alone can measure lower
  than you think — that is why light `--text-subtle` moved from `#646c80`
  (4.48:1 rendered) to `#5f6679` (4.89:1 rendered).
- Never take the background as a region's **most common colour**. The hero name
  is large enough that its glyphs outnumber the backdrop pixels, so the mode
  comes back as the ink and every measurement inverts. Sample a known-empty
  point on the page instead.

`firefox --headless --screenshot` works for this, but note it renders
**`prefers-color-scheme: light`** by default, and it captures at load — mid
entrance-animation — so settle the animation first or you will measure a fade.

**Do not reintroduce**
- No CSS Modules / CSS-in-JS / `clsx`. One stylesheet is the design.
- No `style` props, with one documented exception: the `--level` custom property
  on skill meters, which cannot be expressed any other way.
- No `dangerouslySetInnerHTML`. The tokenizer emits React nodes precisely so the
  hero code card never needs it.
- No `setState` in a scroll, pointer or observer callback. Every hook here is
  ref-driven and writes to the DOM directly; a render per frame undoes all of it.
- No `setState` in an effect to mirror external state. That is what
  `useSyncExternalStore` is for.
- No dead CSS. Every selector should be reachable from a component.
- Do not disable an oxlint rule to make a warning go away. Fix the code.

---

## 9. Open Tasks

Content — all of these need real values from the user. Do not invent them.

- [ ] Replace every `<-- REPLACE` placeholder in `src/data/profile.ts`
- [ ] Replace the placeholder copy in `src/data/experience.ts`
- [ ] Replace the placeholder copy in `src/data/now.ts`
- [ ] Replace the placeholder copy in `src/data/recognition.ts`
- [ ] Create a Formspree form and paste the ID into `profile.ts`
- [ ] Point `index.html` meta/OG/JSON-LD at the real domain and handles
- [ ] Add `githubUrl` / `demoUrl` to `src/data/projects.ts`
- [ ] Set `resumeUrl` if a hosted PDF exists
- [ ] Set a `base` in `vite.config.ts` and pick a deploy target
- [ ] Consider adding a resume PDF under `public/`

Housekeeping, doable without the user:

- [x] Fix the `useTheme` `set-state-in-effect` warning (§3, trap 19)
- [x] Fix the orphaned `<li>` in `Now` and `Recognition` (trap 8)
- [x] Refresh this guide and the README against the current tree
