import { experience, experienceCopy } from "../data/experience"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function Experience() {
    return (
        <section id="experience" className="section experience">
            <Reveal>
                <SectionHeading
                    label={experienceCopy.label}
                    title={experienceCopy.title}
                    body={experienceCopy.body}
                />
            </Reveal>

            {/* `as="ol"` matters: the default div wrapper would orphan the li
                children and break the list semantics. */}
            <Reveal stagger as="ol" className="timeline">
                {experience.map((entry) => (
                    <li key={entry.id} className="timeline-item">
                        <span className="timeline-marker" aria-hidden="true" />

                        <div className="timeline-period">{entry.period}</div>

                        <div className="timeline-body">
                            <h3>{entry.title}</h3>
                            <p className="timeline-organisation">
                                {entry.organisation}
                            </p>
                            <p className="timeline-summary">{entry.description}</p>

                            <ul className="timeline-achievements">
                                {entry.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                ))}
                            </ul>

                            <ul className="project-tech">
                                {entry.technologies.map((technology) => (
                                    <li key={technology}>{technology}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </Reveal>
        </section>
    )
}

export default Experience
