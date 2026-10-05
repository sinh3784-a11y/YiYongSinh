import { projects, projectsCopy } from "../data/projects"
import ProjectCard from "./ProjectCard"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function Projects() {
    return (
        <section id="projects" className="section projects">
            <Reveal>
                <SectionHeading
                    label={projectsCopy.label}
                    title={projectsCopy.title}
                    body={projectsCopy.body}
                />
            </Reveal>

            <Reveal stagger className="projects-list">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </Reveal>
        </section>
    )
}

export default Projects
