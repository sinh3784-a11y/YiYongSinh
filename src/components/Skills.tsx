import { skillGroupBlurb, skillGroups, skillsCopy } from "../data/skills"
import { useTilt } from "../hooks/useTilt"
import type { CSSVars } from "../types/css"
import type { Skill } from "../types/skill"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

interface SkillGroupCardProps {
    category: string
    blurb: string
    count: number
    skills: Skill[]
}

/**
 * One category panel, in its own component so it can own a tilt ref. A hook
 * cannot be called from a `.map()` callback without breaking the rules of hooks,
 * which is the whole reason this is not inlined in the list below.
 */
function SkillGroupCard({ category, blurb, count, skills }: SkillGroupCardProps) {
    /* A denser panel than a project card: less travel, so the text inside stays
       readable while it leans. */
    const tiltRef = useTilt<HTMLElement>(4)

    return (
        <article ref={tiltRef} className="skill-group tilt">
            <header className="skill-group-header">
                <h3>{category}</h3>
                <span className="skill-count">
                    {count}
                    <span className="visually-hidden"> skills</span>
                </span>
            </header>

            <p className="skill-group-blurb">{blurb}</p>

            <ul className="skill-list">
                {skills.map((skill) => {
                    /* See `CSSVars`: the fill has to be sized from data, and
                       CSS cannot read a custom property out of a data
                       attribute. This is the only inline custom property in the
                       project, and it is why the bar lives here rather than in
                       the stylesheet. */
                    const meterStyle: CSSVars = { "--level": `${skill.level}%` }

                    return (
                        <li key={skill.id} className="skill-item">
                            <div className="skill-item-head">
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">{skill.level}%</span>
                            </div>

                            <span className="skill-detail">{skill.detail}</span>

                            {/* Decorative: the percentage is already rendered
                                as text above, so the bar needs no name. */}
                            <span className="skill-meter" aria-hidden="true" style={meterStyle}>
                                <span className="skill-meter-fill" />
                            </span>
                        </li>
                    )
                })}
            </ul>
        </article>
    )
}

function Skills() {
    return (
        <section id="skills" className="section skills">
            <Reveal>
                <SectionHeading
                    label={skillsCopy.label}
                    title={skillsCopy.title}
                    body={skillsCopy.body}
                />
            </Reveal>

            <Reveal stagger className="skills-groups">
                {skillGroups.map((group) => (
                    <SkillGroupCard
                        key={group.category}
                        category={group.category}
                        blurb={skillGroupBlurb(group.category)}
                        count={group.skills.length}
                        skills={group.skills}
                    />
                ))}
            </Reveal>
        </section>
    )
}

export default Skills