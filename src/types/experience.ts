export interface ExperienceEntry {
    id: number
    /** Period label, e.g. "2024 — Present". */
    period: string
    title: string
    /** Employer, school or organisation. */
    organisation: string
    description: string
    achievements: string[]
    technologies: string[]
}
