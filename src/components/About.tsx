import { aboutCopy, aboutFacts, aboutPrinciples, aboutStats } from "../data/about"
import { profile } from "../data/profile"
import CountUp from "./CountUp"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function About() {
    return (
        <section id="about" className="section about">
            <Reveal>
                <SectionHeading
                    label={aboutCopy.label}
                    title={aboutCopy.title}
                    body={aboutCopy.lead}
                />
            </Reveal>

            <Reveal stagger className="stat-row">
                {aboutStats.map((stat) => (
                    <div key={stat.id} className="stat">
                        <CountUp value={stat.value} suffix={stat.suffix} />
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </Reveal>

            <Reveal stagger className="about-grid">
                <div className="about-narrative">
                    {profile.about.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>

                <div className="about-aside">
                    <dl className="about-facts">
                        {aboutFacts.map((fact) => (
                            <div key={fact.id} className="about-fact">
                                <dt>{fact.label}</dt>
                                <dd>{fact.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="about-principles">
                        {aboutPrinciples.map((principle) => (
                            <div key={principle.id} className="about-principle">
                                <div>
                                    <h3>{principle.label}</h3>
                                    <p>{principle.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    )
}

export default About