import { footerCopy, footerCopyright, profile } from "../data/profile";
import { navLinks } from "../data/navigation";
import Icon from "./Icon";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* TOP SECTION */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <a
              href="#home"
              className="footer-logo"
              aria-label={footerCopy.logoLabel}
            >
              {profile.initials}
              <span>.</span>
            </a>

            <p className="footer-blurb">{footerCopy.blurb}</p>
          </div>

          {/* Navigation */}
          <nav className="footer-nav" aria-label={footerCopy.navLabel}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* BOTTOM SECTION */}
        <div className="footer-meta">
          {/* Social Links */}
          <ul className="footer-socials" aria-label={footerCopy.socialsLabel}>
            {profile.socials.map((social) => {
              const isExternal = /^https?:\/\//i.test(social.href);

              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="footer-social-link"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon name={social.icon} />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Copyright */}
          <p className="footer-copyright">{footerCopyright(currentYear)}</p>

          {/* Back to Top */}
          <a href="#home" className="back-to-top">
            <span>{footerCopy.backToTop}</span>
            <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
