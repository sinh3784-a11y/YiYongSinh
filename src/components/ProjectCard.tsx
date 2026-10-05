import { useTilt } from "../hooks/useTilt"
import type { Project } from "../types/project"
import Icon from "./Icon"

interface ProjectCardProps {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
    const hasLinks = Boolean(project.githubUrl || project.demoUrl)
    const tiltRef = useTilt<HTMLElement>(5)

    return (
        <article ref={tiltRef} className="project-card tilt">
            <div className="project-number" aria-hidden="true">
                {project.number}
            </div>

            <div className="project-content">
                <div className="project-heading">
                    <h3>{project.title}</h3>

                    {project.scope && (
                        <span className="project-scope">{project.scope}</span>
                    )}
                </div>

                <p className="project-summary">{project.description}</p>

                <ul className="project-highlights">
                    {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                    ))}
                </ul>

                <ul className="project-tech" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                    ))}
                </ul>

                {hasLinks && (
                    <div className="project-links">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="github" />
                                Source
                            </a>
                        )}

                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noreferrer">
                                <Icon name="external" />
                                Live demo
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}

export default ProjectCard
