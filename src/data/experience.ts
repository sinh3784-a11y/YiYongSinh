import type { ExperienceEntry } from "../types/experience"

/* ------------------------------------------------------------------ *
 *  Every entry here is placeholder scaffolding.
 *  Replace the copy with your real history, delete what does not apply,
 *  or delete the whole file plus `Experience` from App.tsx if you would
 *  rather not show a timeline.
 * ------------------------------------------------------------------ */

export const experience: ExperienceEntry[] = [
    {
        id: 1,
        period: "2024 — Present",
        title: "Self-directed backend development",
        organisation: "Independent study & project work",
        description:
            "Building complete backend systems to learn them properly — schema first, API second, interface last.",
        achievements: [
            "Shipped three full-stack projects across Java, PHP and embedded hardware.",
            "Moved everything into Docker so a clean machine can run any of them in one command.",
            "Started treating this portfolio as a real project: typed, linted, built on every push.",
        ],
        technologies: ["Java", "Spring Boot", "Laravel", "Docker", "PostgreSQL"],
    },
    {
        id: 2,
        period: "2023 — 2024",
        title: "Backend foundations",
        organisation: "Self-taught",
        description:
            "Went past the tutorials into the parts that are actually hard: relational modelling, auth and error handling.",
        achievements: [
            "Rebuilt a beginner CRUD app with proper migrations and seed data instead of raw SQL.",
            "Learned token authentication properly, including refresh and revocation.",
            "Started reading other people's code instead of only writing my own.",
        ],
        technologies: ["PHP", "MySQL", "Postman", "Git"],
    },
    {
        id: 3,
        period: "Ongoing",
        title: "Frontend fundamentals",
        organisation: "Side projects",
        description:
            "Enough React and TypeScript to build and maintain my own interfaces end to end.",
        achievements: [
            "Rebuilt this portfolio twice — the second time in React with strict types.",
            "Learned CSS grid and flexbox by rebuilding layouts that broke on mobile first.",
        ],
        technologies: ["React", "TypeScript", "CSS"],
    },
]

export const experienceCopy = {
    label: "JOURNEY",
    title: "How I got here",
    body: "There is no dramatic origin story — mostly a lot of building, breaking and rebuilding. This is the honest version.",
}
