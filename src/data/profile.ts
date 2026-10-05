import type { Profile } from "../types/profile"

/* ------------------------------------------------------------------ *
 *  EDIT THIS FILE FIRST.
 *  Every personal detail on the site is read from here, so you can
 *  update your name, email, links and bio without touching a component.
 *
 *  Lines marked  <-- REPLACE  still hold placeholder text.
 * ------------------------------------------------------------------ */

export const profile: Profile = {
    name: "Yi YongSinh",
    initials: "YS",

    role: "Backend Developer",
    roleAccent: "& Full-Stack Learner",

    tagline: "I build secure, production-ready APIs and turn them into interfaces people actually enjoy using.",

    bio: "I build modern web applications with Java, Spring Boot, React and TypeScript. I care about clean APIs, sane database schemas, and shipping things that survive contact with real users.",

    about: [
        "I started out writing PHP and SQL, and quickly fell into backend work — designing schemas, wiring up REST endpoints, and debugging the kind of problems that only show up under production load.",
        "Most of my time is spent in the Java and Spring Boot ecosystem. I like the boring, dependable parts of backend engineering: validation, error handling, authentication and query tuning.",
        "On the frontend I work in React and TypeScript. Not because I had to, but because a backend engineer who can build their own UI ships much faster than one waiting on a handoff.",
        "Right now I am deep in Laravel and PostgreSQL, containerising everything with Docker, and treating this portfolio as one more thing to learn from rather than one more thing to maintain.",
    ],

    location: "Cambodia",
    email: "sinh3784@gmail.com",             // <-- REPLACE
    openToWork: true,

    /* Hero portrait, shown in the visual column instead of the code card.
       `width`/`height` must match the real file — they are what stops the
       hero from reflowing as the photo loads, so a resend of the image means
       updating these two numbers too.

       A keyed cutout with transparent surroundings, so the hero floats it
       rather than framing it: there is nothing for a card to clip.

       WebP at 800px wide — 2x the 400px the hero ever renders it at, so this
       covers a 2x display without carrying the pixels nobody sees. 76 KB
       instead of the 1.4 MB PNG it replaced, and it is the LCP element.

       `alt` is empty because the hero's <h1> already reads the name; a
       description would just announce it twice. Delete this whole block to
       bring the code card back. */
    portrait: {
        src: "/profile.webp",
        alt: "",
        width: 800,
        height: 871,
    },

    // Drop a hosted PDF (Drive, GitHub raw, S3) here and the hero
    // gains a "Résumé" button. Delete the line to remove it.
    resumeUrl: undefined,

    socials: [
        {
            id: "github",
            label: "GitHub",
            href: "https://github.com/sinh3784-a11y",       // <-- REPLACE
            icon: "github",
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/yi-yongsinh-85371b420/",   // <-- REPLACE
            icon: "linkedin",
        },
        {
            id: "x",
            label: "X",
            href: "https://x.com/sinh3784",            // <-- REPLACE
            icon: "x",
        },
        {
            id: "email",
            label: "Email",
            href: "mailto:sinh3784@gmail.com",               // <-- REPLACE
            icon: "email",
        },
    ],

    /* ---------------------------------------------------------------- *
     *  CONTACT FORM
     *  1. Create a free form at https://formspree.io
     *  2. Copy the form ID out of the endpoint it gives you, e.g.
     *        https://formspree.io/f/xjvqzkwl
     *                  ^^^^^^^^^^^ this part
     *  3. Paste it below. Until you do, the form shows a setup
     *     notice and does not attempt to send anything.
     * ---------------------------------------------------------------- */
    formspreeId: "YOUR_FORM_ID",
}

/** Contact section heading, kept next to the profile it belongs to. */
export const contactCopy = {
    label: "GET IN TOUCH",
    title: "Let's build something together",
    body: "Have a project, an opportunity, or a question about an approach you are weighing? Send a message and I will reply within a couple of days.",
    detailsLabel: "Elsewhere",
}

/**
 * Hero copy. Kept beside `profile` because it describes the same person — the
 * greeting, the buttons and the two `aria-label`s are strings a visitor reads or
 * a screen reader announces, so none of them belong in the component.
 */
export const heroCopy = {
    greeting: "Hello, I'm",
    availability: "Available for new work",
    primaryCta: "View my projects",
    secondaryCta: "Get in touch",
    resumeCta: "Résumé",
    socialsLabel: "Elsewhere on the web",
    techLabel: "Technologies",
}

/** The tech marquee in the hero. Also the loop length of the CSS animation. */
export const heroTech = [
    "Java",
    "Spring Boot",
    "Laravel",
    "PHP",
    "PostgreSQL",
    "Docker",
    "React",
    "TypeScript",
]

export const footerCopy = {
    blurb: "Backend developer building secure APIs and the interfaces that sit on top of them.",
    /** Visible label on the link that returns to the top of the page. */
    backToTop: "Back to top",
    /**
     * Accessible name for the monogram link. Named after the person rather than
     * the destination, so it does not collide with `backToTop` — two links in
     * the same landmark sharing an accessible name are ambiguous to tab between.
     */
    logoLabel: `${profile.name} — back to top`,
    /** Landmark names for the two lists in the footer. */
    navLabel: "Footer",
    socialsLabel: "Social links",
}

/**
 * Copyright line for the footer. The year arrives as an argument because the
 * footer reads the clock once at module load — reading it here instead would
 * bake a year into the module and go stale the moment the tab is left open
 * across New Year.
 */
export function footerCopyright(year: number): string {
    return `© ${year} ${profile.name}`
}
