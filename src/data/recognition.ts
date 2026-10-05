export type RecognitionKind = "course" | "certificate" | "community" | "award"

export interface RecognitionItem {
    id: string
    kind: RecognitionKind
    title: string
    /** Who issued it — a school, a platform, an organisation. */
    issuer: string
    detail: string
    /** Free-form, shown as a pill. A year, a status, a URL. */
    meta?: string
    href?: string
}

export const recognitionCopy = {
    label: "RECOGNITION",
    title: "Courses, certificates and community",
    body: "Not a substitute for the work above. Just the places that pushed me faster than working alone would have.",
}

/**
 * <-- REPLACE. Only list things you actually completed or hold. A certification
 * you did not finish is a liability in a portfolio, not a credential.
 */
export const recognitionItems: RecognitionItem[] = [
    {
        id: "rec-ts",
        kind: "course",
        title: "TypeScript",
        issuer: "Your learning platform",
        detail:
            "Generics, conditional types and narrowing — the module that finally made the type system stop feeling arbitrary.",
        meta: "Completed",
    },
    {
        id: "rec-sql",
        kind: "course",
        title: "Relational databases",
        issuer: "Your learning platform",
        detail: "Schema design, normalisation and query plans against a real Postgres instance.",
        meta: "Completed",
    },
    {
        id: "rec-accessibility",
        kind: "course",
        title: "Web accessibility",
        issuer: "Your learning platform",
        detail:
            "WCAG fundamentals, keyboard traps and focus management. It changed how I write markup.",
        meta: "In progress",
    },
    {
        id: "rec-community",
        kind: "community",
        title: "Developer community",
        issuer: "Your meetup or online group",
        detail: "Showing up, asking questions badly, and answering other people's badly too.",
        meta: "Active",
    },
]