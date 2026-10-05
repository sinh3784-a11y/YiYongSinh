export type SocialIcon = "github" | "linkedin" | "x" | "email"

export interface SocialLink {
    id: string
    label: string
    href: string
    icon: SocialIcon
}

/** Portrait shown in the hero's visual column, in place of the code card. */
export interface Portrait {
    /** Path to the image, relative to `public/`. */
    src: string
    /**
     * Alternative text. Empty on purpose: the hero's `<h1>` already names the
     * person, so a description here is a second announcement of the same fact.
     * Give it a value if the photo is ever moved somewhere the name is not
     * already present.
     */
    alt: string
    /**
     * Intrinsic pixel size. These are attributes, not CSS: the browser reserves
     * the box from them before the file loads, so the photo cannot shift the
     * hero layout, and derives the aspect ratio from them so the stylesheet
     * needs no hardcoded ratio to maintain.
     */
    width: number
    height: number
}

export interface Profile {
    /** Full name, used in headings and structured data. */
    name: string
    /** Two-or-three letter monogram used in the logo and favicon. */
    initials: string
    /** Primary job title. */
    role: string
    /** Secondary title, rendered in a muted style after the role. */
    roleAccent: string
    /** One-line pitch used in the hero and in meta tags. */
    tagline: string
    /** Multi-sentence intro, used in the hero and the about section. */
    bio: string
    /** Longer narrative for the about section. */
    about: string[]
    location: string
    email: string
    /** Shown as a pill in the hero. Set false to hide the pill entirely. */
    openToWork: boolean
    /**
     * Portrait for the hero's visual column. While this is set the hero renders
     * the photo instead of the code card; delete the block in
     * `src/data/profile.ts` to put the code card back. Both branches are real,
     * so neither the component nor its styles are dead code.
     */
    portrait?: Portrait
    /** Links to a hosted PDF resume. Leave undefined to hide the button. */
    resumeUrl?: string
    socials: SocialLink[]
    /**
     * Formspree form ID (the `XXXXXXXX` segment of
     * https://formspree.io/f/XXXXXXXX). While this is still the
     * YOUR_FORM_ID placeholder the contact form renders a setup notice
     * instead of firing a request that cannot succeed.
     */
    formspreeId: string
}
