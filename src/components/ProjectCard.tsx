import { useTilt } from "../hooks/useTilt";
import type { Project } from "../types/project";
import Icon from "./Icon";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const tiltRef = useTilt<HTMLElement>(5);

  const hasLinks = Boolean(
    project.githubUrl ||
    project.frontendUrl ||
    project.backendUrl ||
    project.demoUrl,
  );

  // Reusable project action buttons
  const projectLinks = hasLinks ? (
    <div className="project-links">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
          <span>Source Code</span>
        </a>
      )}

      {project.frontendUrl && (
        <a href={project.frontendUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
          <span>Frontend Code</span>
        </a>
      )}

      {project.backendUrl && (
        <a href={project.backendUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
          <span>Backend Code</span>
        </a>
      )}

      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="external" />
          <span>Live Website</span>
        </a>
      )}
    </div>
  ) : null;

  return (
    <article ref={tiltRef} className="project-card tilt">
      <div className="project-number" aria-hidden="true">
        {project.number}
      </div>

      <div className="project-layout">
        {/* LEFT - PROJECT INFORMATION */}
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

          {/* Fallback when project has no image */}
          {!project.image && projectLinks}
        </div>

        {/* RIGHT - IMAGE AND LINKS */}
        {project.image && (
          <div className="project-media">
            {/* PROJECT IMAGE */}
            <div className="project-image">
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-link"
                aria-label={`View screenshot of ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  loading="lazy"
                />

                <span className="project-image-overlay">
                  <Icon name="external" />
                  View Screenshot
                </span>
              </a>
            </div>

            {/* BUTTONS BELOW IMAGE */}
            {projectLinks}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
