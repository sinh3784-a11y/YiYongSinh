# Yi YongSinh — Portfolio

A single-page personal portfolio for **Yi YongSinh**, backend developer and
full-stack learner. One scroll, light and dark, no framework beyond React.

Built with **React 19 · TypeScript 6 (strict) · Vite 8 · Oxlint**. Two runtime
dependencies, zero component libraries, one global stylesheet.

---

## Quick start

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

| Script            | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Vite dev server with hot module replacement                 |
| `npm run build`   | `tsc -b` then `vite build` → type-check and bundle to `dist/` |
| `npm run lint`    | Oxlint over the whole project                               |
| `npm run preview` | Serve the contents of `dist/` as it will be deployed        |

There is no `test`, `format` or `typecheck` script. `npm run build` is the only
command that catches type errors, so run it before you call anything done.

Current baseline: **0 TypeScript errors, 0 lint warnings.**

---

## Editing the site

Almost nothing on this page is hardcoded. **Start here:**

```
src/data/profile.ts    your name, bio, email, socials, Formspree ID, hero copy
src/data/skills.ts     every skill, grouped by category
src/data/projects.ts   every project, its highlights and links
src/data/experience.ts the journey timeline
src/data/about.ts      the about-section narrative, facts, principles, stats
src/data/now.ts        the "what I'm doing now" rows
src/data/recognition.ts courses, certificates, community, awards
src/data/navigation.ts the navbar links
```

Edit those files and the page updates. You should not need to touch a component
to change a word of copy, add a project, or swap a social link.

### Placeholders to replace

`src/data/profile.ts` is the only file with placeholder *values*, and each one is
marked `<-- REPLACE`:

- `email` — currently `you@example.com`
- `socials[].href` — currently `your-handle` for GitHub, LinkedIn and X
- `resumeUrl` — `undefined`; set it to a hosted PDF and a **Résumé** button
  appears in the hero automatically

Three more files hold placeholder *copy* rather than placeholder values, and they
have no markers: `experience.ts` (the timeline narrative), `now.ts`, and
`recognition.ts`. All of it is plausible-sounding scaffolding, so it reads as
finished until you look closely. Replace it, or delete the section and drop it
from `src/App.tsx` and `src/data/navigation.ts`.

The same values appear in two more places, which are static because they are read
by crawlers rather than by React:

- `index.html` — `<title>`, the meta description, the Open Graph tags, the
  `theme-color` meta, and the JSON-LD `Person` block

That duplication is deliberate. **If you change a value in `profile.ts`, check
`index.html` too.**

### Project links

`src/data/projects.ts` entries accept optional `githubUrl` and `demoUrl`. While
they are absent the link buttons do not render at all, so you can leave them off
until the repositories are public.

---

## Making the contact form work

The form validates, shows per-field errors and a loading state, but has no
delivery endpoint until you configure one.

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form ID out of the endpoint they give you:
   `https://formspree.io/f/xjvqzkwl` → `xjvqzkwl`
3. Paste it into `formspreeId` in `src/data/profile.ts` and save.

Until then the form renders a notice and refuses to submit rather than firing a
request that cannot succeed.

---

## Architecture

```
index.html                  static shell: meta tags, JSON-LD, #root
vite.config.ts              plugins: [react()] and nothing else
tsconfig.json               solution file, references the two configs below
tsconfig.app.json           strict, verbatimModuleSyntax, jsx: react-jsx
tsconfig.node.json          types for vite.config.ts

src/
├── main.tsx                createRoot + StrictMode
├── App.tsx                 aurora backdrop, skip link, navbar, sections, footer
├── index.css               the entire stylesheet
├── data/                   all content — see "Editing the site"
├── types/                  one file per domain, plus css.ts for CSSVars
├── hooks/
│   ├── useScrollSpy.ts     active-section tracking + scroll position
│   ├── useInView.ts        one-shot scroll reveal
│   ├── useScrollProgress.ts reading-progress bar
│   ├── useParallax.ts      scroll-linked drift + fade
│   ├── useTilt.ts          cursor-tracked tilt + glow
│   ├── useMagnetic.ts      cursor pull on buttons
│   ├── useCountUp.ts       count a number up on entry
│   └── useTheme.ts         light/dark, via useSyncExternalStore
└── components/
    ├── Navbar.tsx          sticky bar, scroll-spy, progress, mobile menu
    ├── Hero.tsx            intro, CTAs, socials, code card
    ├── About.tsx           long-form narrative + fact list + stat row
    ├── Skills.tsx          skill groups by category, with meters
    ├── Now.tsx             what I am building / learning / reading
    ├── Experience.tsx      timeline
    ├── Projects.tsx        project list
    ├── ProjectCard.tsx     one project
    ├── Recognition.tsx     courses, certificates, awards
    ├── Contact.tsx         validated Formspree form
    ├── Footer.tsx          nav, socials, copyright
    ├── Reveal.tsx          scroll-reveal wrapper
    ├── CountUp.tsx         a number that animates from zero
    ├── CopyEmail.tsx       copy-to-clipboard with an honest fallback
    ├── ThemeToggle.tsx     light/dark switch
    ├── Words.tsx           word-by-word headline reveal
    ├── SectionHeading.tsx  the shared label + h2 + p block
    ├── CodeSnippet.tsx     tiny JS tokenizer for the hero code card
    └── Icon.tsx            inline SVG icon set
```

Components are pure: props in, JSX out. The only stateful components are
`Navbar` (menu open), `Contact` (form values, errors, status) and `CopyEmail`
(clipboard outcome). Scroll position is tracked by `useScrollSpy`, which returns
the id of the section currently at the top of the viewport and writes it back as
`aria-current`.

### Section order

`Navbar → Hero → About → Skills → Now → Experience → Projects → Recognition →
Contact → Footer`

The navbar links come from `src/data/navigation.ts`. Adding a link there is not
enough — the matching `<section id="...">` has to exist too, or the scroll-spy
silently skips it.

---

## Light and dark

The theme is decided **before first paint** by a four-line inline script in
`index.html`, which reads `localStorage` and falls back to
`prefers-color-scheme`. It writes `data-theme` on `<html>` and the stylesheet
switches on `:root[data-theme="light"]`, so no component ever knows which theme
is active. Without that script the page renders dark and then snaps to light
once React mounts — a visible flash on every load for anyone whose system
prefers light.

`useTheme` (`src/hooks/useTheme.ts`) is the React side, and it is deliberately
**not** `useState`:

- The initial value would have to come from the DOM, which does not exist during
  SSR, and seeding it on the client instead means hydration compares the server's
  `null` against a real theme and reports a mismatch.
- So the hook uses `useSyncExternalStore`, with `<html data-theme>` as the store:
  `getServerSnapshot` returns `null` while hydrating, then React re-renders from
  the DOM. No effect, no `setState` after mount, no flash. `ThemeToggle` renders
  `disabled` while `theme` is `null`.

Until the visitor presses the toggle, the page keeps following the OS: the hook
subscribes to `prefers-color-scheme` once, and a system change is only applied
when `localStorage` holds no preference of the visitor's own. Pressing the toggle
persists the choice and stops the following.

`THEME_COLOR` in `useTheme.ts`, the two `content` values in the inline script, and
`--bg` in `src/index.css` are the same two hex values in three places — they tint
the mobile address bar, so they have to agree.

---

## Motion

Animation lives in one block at the bottom of `src/index.css`, under a
`MOTION` banner comment, with one numbered group per effect. Two hooks feed it.

**`useInView`** (`src/hooks/useInView.ts`) — one-shot scroll reveal. It returns a
ref and does not re-render. On mount it sets `data-reveal-armed="hidden"` on the
element and removes it the first time the element intersects. That attribute is
the entire contract:

```css
.reveal[data-reveal-armed="hidden"] {
  opacity: 0;
  translate: 0 var(--reveal-shift);
}
```

**Arming from JS rather than shipping `opacity: 0` in CSS is the important
part.** Content is invisible by default only if the attribute is present, and the
attribute only exists after React hydrates. So no-JS, a JS error, a missing
`IntersectionObserver`, or `prefers-reduced-motion: reduce` all leave the page
fully readable. The hook also skips arming entirely under reduced motion.

Wrap a section in `<Reveal>` for a single fade, or `<Reveal stagger>` to cascade
its direct children:

```tsx
<Reveal>
  <SectionHeading ... />
</Reveal>

<Reveal stagger className="skills-groups">
  {groups.map((group) => (
    <article key={group.title} className="skill-group">...</article>
  ))}
</Reveal>
```

`stagger` uses `:nth-child()` `transition-delay` steps capped by
`--stagger-max`, so a 9-item list doesn't take 720ms to finish arriving.

**Two gotchas worth knowing before you add a wrapper:**

- `stagger` targets **direct children** (`> *`). Extra markup between the wrapper
  and the items breaks the cascade.
- `Reveal` renders a `div` by default. If the thing you're wrapping is a list,
  pass `as` so the semantics survive — `<Reveal stagger as="ol" className="timeline">`.
  A `div` wrapper would orphan the `li` children. Both `Now` and `Recognition`
  hit this once already; if you add a third list, pass `as` from the start.

**`useScrollProgress`** (`src/hooks/useScrollProgress.ts`) — writes the navbar
reading bar. It takes a ref, throttles with `requestAnimationFrame`, and sets
`transform: scaleX()` imperatively on `element.style`. It's a CSS variable-free,
one-property write, and it is deliberately outside React's render path so
scrolling never triggers a re-render — which is also why it is not one of the
four JSX `style` props.

**`useTilt`** (`src/hooks/useTilt.ts`) — the cursor-tracked 3D lean on skill and
project cards, plus a glow that follows the pointer. On every `pointermove` it
writes four custom properties (`--tilt-rx`, `--tilt-ry`, `--glow-x`, `--glow-y`)
and CSS composes the actual `transform`. It bails on touch
(`hover: hover and pointer: fine`), because a tilt that never gets a `pointerleave`
is worse than no tilt at all.

**`useParallax`** (`src/hooks/useParallax.ts`) — hero drift and fade. Writes
`--parallax-y` and `--parallax-fade` per layer, so the text and the code card
move at different rates from one implementation.

The fade is measured against `window.innerHeight`. That sounds like a detail and
is not: it used to divide by `document.documentElement.getBoundingClientRect().height`,
which is the height of the whole *document* (~9900px here), not the window. On
load the hero therefore read as "already 95% scrolled past", and CSS painted the
entire hero — name, copy, buttons, code card — at `opacity: 0.37`, for a measured
contrast of 1.6–2.4:1 against the page. `tsc`, oxlint and `renderToString` were
all perfectly happy with it.

**`useCountUp`** (`src/hooks/useCountUp.ts`) — the numbers above the About
narrative. `requestAnimationFrame` plus a direct `textContent` write, so a 1.6s
count costs zero renders. Only rendered for real browsers; see below.

**`useMagnetic`** (`src/hooks/useMagnetic.ts`) — pulls a button toward the cursor,
like a physical button sticking to a finger. It writes `--magnetic-x` and
`--magnetic-y` and lets CSS fold them into a `translate`, for the same reason
`useTilt` does: the pull has to coexist with the hover lift, the focus ring and
the entrance animation, and only the stylesheet can put all of them in one
`transform` chain. Inert on touch — a magnet nothing can ever "leave" is worse
than no magnet.

**`useTheme`** (`src/hooks/useTheme.ts`) — see [Light and dark](#light-and-dark).

### The three property rules

Most of the weirdness in the motion block comes from three rules that are easier
to state than to rediscover:

1. **Entrances animate `translate`. Hovers animate `transform`.** They are
   separate properties that compose, so a card can be sliding into place at 0.7s
   *and* lifting on hover at `--base` without one transition clobbering the
   other. Putting both on `transform` means one wins and half the card feels
   broken.
2. **Never put `transform` on something that runs a filled animation.** The hero
   entrance uses `animation-fill-mode: both`, which keeps overriding `transform`
   forever. That is why the parallax moves `translate` and the hero fade lives on
   `.code-card` rather than on `.hero-visual`, whose opacity is pinned by its own
   animation.
3. **Animated state defaults to the *finished* appearance.** The skill meter is
   `scaleX(1)` by default and only collapses to `0` while its parent is armed;
   the parallax variables default to `0px`. A default of "not yet animated" means
   anyone whose JS fails sees a page of empty bars and a missing hero.

### The four inline styles in the project

Every `style` prop in here is a CSS custom property carrying a value that CSS
cannot get any other way — data from `src/data/`, or an index. Nothing is styled
inline with a real CSS property.

| Property | Where | Carries |
| --- | --- | --- |
| `--level` | `Skills.tsx` | meter width, from `skill.level` |
| `--marquee-count` | `Hero.tsx` | tech-marquee loop length, so the duration tracks the data |
| `--word-delay` | `Words.tsx` | base delay for the headline stagger |
| `--i` | `Words.tsx` | per-word index, feeding `animation-delay: calc(...)` |

The skill meter is the clearest case. `Skill.level` drives the fill width, and
CSS cannot read a custom property out of a `data-` attribute:

```tsx
const meterStyle: CSSVars = { "--level": `${skill.level}%` }
```

`CSSVars` (`src/types/css.ts`) is `CSSProperties` plus `[key: \`--${string}\`]`.
React types `style` as `CSSProperties`, which knows nothing about custom
properties, so each literal has to be declared in a separately typed variable —
otherwise it is an excess-property error and you are tempted to cast. A fifth
`style` prop means one of these four was solvable in CSS; find that first.

Everything else is decorative: hero entrance on load, floating code card,
pulsing status dot, blinking code caret, animated nav underline, drifting aurora
backdrop, card tilt and glow, and the meter/stat animations. All of it is
disabled by the reduced-motion block at the end of the motion section, and the
print block freezes every animated surface at its resting appearance — a
half-counted number on paper would be a lie.

---

## Conventions

**Components**

- `function Name() { ... }` declaration, `export default Name` on the last line.
  Never an arrow-function component, never a named export — one default export
  per file keeps `react/only-export-components` quiet.
- File name matches the component name, PascalCase.
- Props typed by an `interface XxxProps` declared in the file, destructured in
  the signature.
- `interface` over `type`. No enums or namespaces; `erasableSyntaxOnly` is on.
- `import type` for type-only imports; `verbatimModuleSyntax` requires it.
- `.map()` always gets a `key`.

**Styles**

- One global stylesheet, `src/index.css`. No CSS Modules, no CSS-in-JS, no
  Tailwind, no preprocessor.
- Colours, spacing, radii, easing and breakpoints are CSS custom properties in
  `:root`. Reach for a token before writing a raw hex value.
- Kebab-case class names mirroring the component: `.skill-group`, `.project-card`.
  Modifiers `.btn-primary`, `.nav-links-open`; states `.form-error`.
- Conditional classes are plain ternaries — there is no `clsx` dependency:
  `className={active ? "nav-link nav-link-active" : "nav-link"}`
- The only `style` props allowed are the four custom properties listed in
  [Motion](#the-four-inline-styles-in-the-project) — each one carries data CSS
  cannot otherwise reach.
- Everything that animates lives in the `MOTION` block at the bottom of
  `src/index.css`, not next to the component that uses it. If you add a hover or
  entrance, put it there with the other groups.

**Formatting**

There is no formatter configured, so match the file you are editing: 2-space
indent, double quotes, semicolons omitted. Do not reformat files you are not
otherwise changing.

---

## Accessibility

- Skip-to-content link, and every section is a real landmark with a heading.
- The navbar toggle has `aria-expanded`, `aria-controls` and a label that
  changes with state. Escape and outside clicks close the menu.
- The theme toggle is a real `<button>` with `aria-pressed` and a label that
  names the theme it will switch to.
- Lists are lists: the timeline, the Now rows and the Recognition cards are
  `ol`/`ul`, with the `Reveal` wrapper told to render as one.
- The form has `aria-invalid` and `aria-describedby` on each field, and one
  polite live region for the outcome.
- Visible `:focus-visible` rings on everything focusable.
- `prefers-reduced-motion` disables smooth scrolling, the reveal cascade, the
  hero entrance, the float/pulse/blink loops, the magnet, and the
  reading-progress bar. The hook also refuses to arm the reveal, so nothing
  depends on CSS alone.
- Print styles drop the navigation, buttons and form, and switch to a light
  palette — the page prints as a readable CV.
- Body and muted text clear 4.5:1 against the background in **both** themes.
  The one value that dips under it is the light-theme comment grey (4.44:1 on
  `--bg`), which is only ever used inside the code card, on `--bg-elevated`,
  where it reaches 4.75:1.

---

## Deploying

`npm run build` produces a static `dist/`. Drop it on any static host —
GitHub Pages, Netlify, Vercel, Cloudflare Pages. There is no server component
and no runtime configuration.

For GitHub Pages, add a `base` to `vite.config.ts` matching your repo path:

```ts
export default defineConfig({
  base: "/your-repo-name/",
  plugins: [react()],
})
```

Then publish `dist/` from the `gh-pages` branch or a GitHub Actions workflow.
