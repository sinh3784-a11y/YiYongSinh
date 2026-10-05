export type SkillCategory =
    | "Backend"
    | "Frontend"
    | "Database"
    | "DevOps"
    | "Tools"

export interface Skill {
    id: number
    name: string
    category: SkillCategory
    /** One line explaining what you actually use it for. */
    detail: string
    /**
     * Self-assessed proficiency, 0-100, used only for the animated meter.
     * Honest over impressive — nobody should read these as a certification.
     */
    level: number
}

/** Category plus every skill filed under it. */
export interface SkillGroup {
    category: SkillCategory
    skills: Skill[]
}
