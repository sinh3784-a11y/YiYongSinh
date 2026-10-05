import type { Skill, SkillCategory, SkillGroup } from "../types/skill"

/**
 * `level` is a self-assessed proficiency, used only to size the animated meter
 * in the Skills section. Treat it as an opinion rather than a measurement, and
 * edit these freely — they are the one field here that is not a fact.
 */
export const skills: Skill[] = [
    /* Backend */
    {
        id: 1,
        name: "Java",
        category: "Backend",
        detail: "Primary language for services and data-layer work.",
        level: 92,
    },
    {
        id: 2,
        name: "Spring Boot",
        category: "Backend",
        detail: "REST APIs, dependency injection, validation, JPA.",
        level: 88,
    },
    {
        id: 3,
        name: "Laravel",
        category: "Backend",
        detail: "Eloquent, queues, Sanctum auth, Blade views.",
        level: 82,
    },
    {
        id: 4,
        name: "PHP",
        category: "Backend",
        detail: "Where it started; still useful for quick services.",
        level: 80,
    },
    {
        id: 5,
        name: "REST API Design",
        category: "Backend",
        detail: "Resource modelling, versioning, pagination, error contracts.",
        level: 90,
    },
    {
        id: 6,
        name: "C#",
        category: "Backend",
        detail: "Desktop and .NET coursework.",
        level: 55,
    },
    {
        id: 7,
        name: "C / C++",
        category: "Backend",
        detail: "Foundations, data structures, coursework.",
        level: 58,
    },

    /* Frontend */
    {
        id: 8,
        name: "React",
        category: "Frontend",
        detail: "Function components, hooks, composition.",
        level: 80,
    },
    {
        id: 9,
        name: "TypeScript",
        category: "Frontend",
        detail: "Strict types, generics, discriminated unions.",
        level: 78,
    },
    {
        id: 10,
        name: "JavaScript",
        category: "Frontend",
        detail: "ES2023+, modules, async patterns.",
        level: 85,
    },
    {
        id: 11,
        name: "CSS",
        category: "Frontend",
        detail: "Grid, flexbox, fluid type, responsive layout.",
        level: 75,
    },

    /* Database */
    {
        id: 12,
        name: "PostgreSQL",
        category: "Database",
        detail: "Schema design, indexing, migrations, query tuning.",
        level: 82,
    },
    {
        id: 13,
        name: "MySQL",
        category: "Database",
        detail: "Everyday relational work and legacy schemas.",
        level: 80,
    },
    {
        id: 14,
        name: "Redis",
        category: "Database",
        detail: "Caching and rate limiting.",
        level: 65,
    },

    /* DevOps */
    {
        id: 15,
        name: "Docker",
        category: "DevOps",
        detail: "Multi-stage builds, Compose, local parity with prod.",
        level: 72,
    },
    {
        id: 16,
        name: "Git",
        category: "DevOps",
        detail: "Rebase workflows, code review, CI.",
        level: 85,
    },
    {
        id: 17,
        name: "Linux",
        category: "DevOps",
        detail: "Shell, process and permission wrangling on a server.",
        level: 70,
    },

    /* Tools */
    {
        id: 18,
        name: "Postman",
        category: "Tools",
        detail: "Contract testing and exploring endpoints quickly.",
        level: 88,
    },
    {
        id: 19,
        name: "Figma",
        category: "Tools",
        detail: "Reading a design well enough to build it.",
        level: 60,
    },
    {
        id: 20,
        name: "JetBrains IDEs",
        category: "Tools",
        detail: "IntelliJ IDEA and PhpStorm daily.",
        level: 90,
    },
]

/**
 * Display order for the category panels. Anything not listed here is
 * appended afterwards, so adding a category to `skills` is safe.
 */
export const categoryOrder: SkillCategory[] = [
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Tools",
]

const CATEGORY_BLURBS: Record<SkillCategory, string> = {
    Backend: "Where most of my time goes — modelling the domain, then exposing it over HTTP.",
    Frontend: "Enough frontend to build my own interfaces instead of waiting on a handoff.",
    Database: "Schemas I would be happy for someone else to maintain.",
    DevOps: "If it cannot run in a container, I do not trust it.",
    Tools: "The daily drivers.",
}

export const skillGroups: SkillGroup[] = [
    ...categoryOrder.map((category) => ({
        category,
        skills: skills.filter((skill) => skill.category === category),
    })),
    // Anything filed under a category missing from `categoryOrder`.
    ...Array.from(
        new Set(
            skills
                .map((skill) => skill.category)
                .filter((category) => !categoryOrder.includes(category)),
        ),
    ).map((category) => ({
        category,
        skills: skills.filter((skill) => skill.category === category),
    })),
].filter((group) => group.skills.length > 0)

export function skillGroupBlurb(category: SkillCategory): string {
    return CATEGORY_BLURBS[category] ?? ""
}

export const skillsCopy = {
    label: "MY STACK",
    title: "Technology I work with",
    body: "The tools I reach for, and what I actually use them for. No decorative logos — every entry below is on a real project or in active study.",
}
