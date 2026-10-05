/**
 * The ambient backdrop: the starfield, the shooting stars and the corner web.
 *
 * Change `backdrop` to retheme all of it. The variants are declared in CSS
 * against a `data-backdrop` attribute on `.aurora`, and each one only redeclares
 * tokens, so no rule is duplicated per variant — see the "backdrop variants"
 * block in `src/index.css`.
 *
 * `spiderman` is the default and needs no attribute: it is the set `:root`
 * already declares. The others are overrides.
 */
export const backdropVariants = ["spiderman", "classic", "web-only", "none"] as const

export type BackdropVariant = (typeof backdropVariants)[number]

/** Which variant is live. `BackdropVariant` makes a typo a type error. */
export const backdrop: BackdropVariant = "spiderman"