export type NowKind = "building" | "learning" | "reading"

export interface NowItem {
    id: string
    kind: NowKind
    /** The thing itself, kept short enough to read in one line. */
    title: string
    /** One sentence on why it holds my attention. */
    detail: string
    /** Optional link out — a repo, a doc, a talk. */
    href?: string
    hrefLabel?: string
}

export const nowCopy = {
    label: "NOW",
    title: "What I am in the middle of",
    body: "Short-lived by design. This is what my attention is actually on this month, rather than a claim about everything I have ever done.",
}

/**
 * <-- REPLACE all of this. It goes stale fast, which is the point: a "currently"
 * section that quietly stops being true is worse than no section at all.
 */
export const nowItems: NowItem[] = [
    {
        id: "now-portfolio",
        kind: "building",
        title: "This site",
        detail: "Rebuilding my portfolio from scratch to get the TypeScript strictness right.",
        href: "https://github.com/your-handle",
        hrefLabel: "Source",
    },
    {
        id: "now-typescript",
        kind: "learning",
        title: "TypeScript generics",
        detail: "Conditional types and inference, mostly by rewriting code that already worked.",
    },
    {
        id: "now-query-tuning",
        kind: "learning",
        title: "Postgres query plans",
        detail: "Reading EXPLAIN output properly instead of guessing at indexes.",
    },
    {
        id: "now-reading",
        kind: "reading",
        title: "Designing Data-Intensive Applications",
        detail: "Back to the consistency chapter with a database schema in mind this time.",
    },
]