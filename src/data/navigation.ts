import type { NavLink } from "../types/navigation"

/**
 * Nav order. Adding an entry here lights up the link, but the matching
 * `<section id="...">` still has to exist in a component.
 */
export const navLinks: NavLink[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "now", label: "Now" },
    { id: "experience", label: "Journey" },
    { id: "projects", label: "Projects" },
    { id: "recognition", label: "Recognition" },
    { id: "contact", label: "Contact" },
]

/** Exported separately so its identity is stable across renders. */
export const navIds: string[] = navLinks.map((link) => link.id)

export const ctaLink: NavLink = { id: "contact", label: "Let's talk" }
