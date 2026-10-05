import { profile } from "./profile"
import { projects } from "./projects"
import { skills } from "./skills"

export interface AboutFact {
    id: string
    label: string
    value: string
}

/** A figure that counts up when the section scrolls into view. */
export interface AboutStat {
    id: string
    label: string
    /** The real number. Rendered server-side, so this must be the true value. */
    value: number
    /** Appended after the number, e.g. "+" or "k". Not animated. */
    suffix?: string
}

export const aboutCopy = {
    label: "ABOUT",
    title: "A backend engineer who ships the whole thing",
    lead: "Most of my work is on the server, but I would rather build the interface too than hand it off and argue about the error shape.",
}

export const aboutFacts: AboutFact[] = [
    {
        id: "location",
        label: "Based in",
        value: profile.location,
    },
    {
        id: "focus",
        label: "Focus",
        value: "API design, data modelling, authentication",
    },
    {
        id: "learning",
        label: "Currently learning",
        value: "Deeper TypeScript and query tuning",
    },
    {
        id: "status",
        label: "Status",
        value: profile.openToWork ? "Open to new work" : "Not looking right now",
    },
]

export const aboutPrinciples: AboutFact[] = [
    {
        id: "schema-first",
        label: "Schema first",
        value: "Get the relationships right before a single endpoint exists.",
    },
    {
        id: "boring-code",
        label: "Boring code",
        value: "Explicit error handling beats clever abstraction every time.",
    },
    {
        id: "ship-it",
        label: "Ship it",
        value: "An imperfect feature in production teaches more than a perfect one in a branch.",
    },
]

/**
 * Counted-up figures above the narrative. These are the numbers a visitor
 * skims for, so keep them to three and keep them defensible.
 *
 * `aboutStats` is derived from `skills` and `projects` where it can be, so it
 * cannot drift out of sync with the rest of the page. Only the one genuinely
 * unmeasurable figure — years of experience — is hand-written.
 */
export const aboutStats: AboutStat[] = [
    {
        id: "years",
        label: "Years writing code",
        /* <-- REPLACE with your real figure. */
        value: 4,
        suffix: "+",
    },
    {
        id: "technologies",
        label: "Technologies in daily use",
        value: skills.length,
    },
    {
        id: "projects",
        label: "Projects worth writing up",
        value: projects.length,
    },
]
