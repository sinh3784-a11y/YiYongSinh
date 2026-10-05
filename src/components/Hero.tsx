import { useRef } from "react"
import { heroCopy, heroTech, profile } from "../data/profile"
import { useMagnetic } from "../hooks/useMagnetic"
import { useParallax } from "../hooks/useParallax"
import type { CSSVars } from "../types/css"
import Icon from "./Icon"
import Words from "./Words"

/** A call-to-action that leans toward the cursor. Split out so each can own a
    magnetic ref — hooks cannot be called inside a `.map()`. */
interface MagneticLinkProps {
    href: string
    className: string
    children: string
}

function MagneticLink({ href, className, children }: MagneticLinkProps) {
    const magneticRef = useMagnetic<HTMLAnchorElement>(0.22)

    return (
        <a ref={magneticRef} href={href} className={`${className} magnetic`}>
            <span>{children}</span>
        </a>
    )
}

function Hero() {
    const contentRef = useRef<HTMLDivElement>(null)
    const visualRef = useRef<HTMLDivElement>(null)

    /* Two layers, two rates: the code card drifts further than the text so the
       hero gains depth as you scroll away from it. `speed` above 1 means faster
       than the page itself. */
    useParallax(contentRef, { speed: 0.55 })
    useParallax(visualRef, { speed: 1.15 })

    /* The marquee is the hero tech list twice, with the second copy hidden from
       assistive tech — a screen reader should not hear "React" eight times. */
    const marqueeStyle: CSSVars = { "--marquee-count": heroTech.length }

    return (
        <section id="home" className="hero section">
            <div ref={contentRef} className="hero-content">
                {profile.openToWork && (
                    <p className="hero-label">
                        <span className="status-dot" aria-hidden="true" />
                        {heroCopy.availability}
                    </p>
                )}

                <h1>
                    <span className="hero-greeting">
                        <Words text={heroCopy.greeting} />
                    </span>
                    <span className="hero-name">
                        <Words text={profile.name} delay={140} />
                    </span>
                </h1>

                <p className="hero-role">
                    {profile.role}
                    <span> {profile.roleAccent}</span>
                </p>

                <p className="hero-description">{profile.tagline}</p>

                <div className="hero-actions">
                    <MagneticLink href="#projects" className="btn btn-primary">
                        {heroCopy.primaryCta}
                    </MagneticLink>

                    <MagneticLink href="#contact" className="btn btn-secondary">
                        {heroCopy.secondaryCta}
                    </MagneticLink>

                    {profile.resumeUrl && (
                        <a
                            href={profile.resumeUrl}
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {heroCopy.resumeCta}
                        </a>
                    )}
                </div>

                <ul className="hero-socials" aria-label={heroCopy.socialsLabel}>
                    {profile.socials.map((social) => (
                        <li key={social.id}>
                            <a
                                href={social.href}
                                className="social-link"
                                target={social.icon === "email" ? undefined : "_blank"}
                                rel={social.icon === "email" ? undefined : "noreferrer"}
                            >
                                <Icon name={social.icon} />
                                <span>{social.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hero-marquee" aria-label={heroCopy.techLabel}>
                    <div className="hero-marquee-track" style={marqueeStyle}>
                        {[0, 1].map((copy) => (
                            <ul
                                key={copy}
                                className="hero-tech"
                                /* The second copy exists only to make the loop
                                   seamless. */
                                aria-hidden={copy === 1 ? "true" : undefined}
                            >
                                {heroTech.map((technology) => (
                                    <li key={`${copy}-${technology}`}>{technology}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={visualRef} className="hero-visual">
                <div className="hero-portrait">
                    {/* Decorative: the tinted panel behind the cutout carries no
                        meaning a screen reader needs. It is a sibling of the
                        image, not a wrapper, so `aria-hidden` on it hides only
                        the panel and leaves the photo announced normally. */}
                    <div className="hero-portrait-panel" aria-hidden="true" />

                    <img
                        src={profile.portrait?.src ?? "/profile.webp"}
                        alt={profile.portrait?.alt ?? ""}
                        width={profile.portrait?.width ?? 800}
                        height={profile.portrait?.height ?? 871}
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
