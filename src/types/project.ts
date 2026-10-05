export interface Project {
    id: number
    /** Display ordinal, e.g. "01". */
    number: string
    title: string
    /** Short summary, one or two sentences. */
    description: string
    /** Concrete outcomes worth calling out. */
    highlights: string[]
    technologies: string[]
    githubUrl?: string
    demoUrl?: string
    /** Shown as a pill. e.g. "Team of 3", "Full-stack". */
    scope?: string
}
