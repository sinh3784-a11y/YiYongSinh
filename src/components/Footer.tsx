import { footerCopy, footerCopyright, profile } from "../data/profile"
import { navLinks } from "../data/navigation"
import Icon from "./Icon"

/* Resolved once at module load, not during render — reading the clock inside a
   component body is an impure render and breaks deterministic rendering. */
const currentYear = new Date().getFullYear()

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <a href="#home" className="logo" aria-label={footerCopy.logoLabel}>
                        {profile.initials}
                        <span>.</span>
                    </a>
                    <p className="footer-blurb">{footerCopy.blurb}</p>
                </div>

                <nav className="footer-nav" aria-label={footerCopy.navLabel}>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a href={`#${link.id}`}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-meta">
                    <ul className="footer-socials" aria-label={footerCopy.socialsLabel}>
                        {profile.socials.map((social) => (
                            <li key={social.id}>
                                <a
                                    href={social.href}
                                    className="social-icon"
                                    target={
                                        social.icon === "email" ? undefined : "_blank"
                                    }
                                    rel={
                                        social.icon === "email" ? undefined : "noreferrer"
                                    }
                                    aria-label={social.label}
                                    title={social.label}
                                >
                                    <Icon name={social.icon} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <p className="footer-copyright">{footerCopyright(currentYear)}</p>

                    <a href="#home" className="back-to-top">
                        {footerCopy.backToTop}
                        <Icon name="arrow-up" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
