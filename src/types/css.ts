import type { CSSProperties } from "react"

/**
 * `CSSProperties` that also accepts CSS custom properties.
 *
 * React types `style` as `CSSProperties`, which knows nothing about `--vars`,
 * so `style={{ "--level": "80%" }}` is an excess-property error. Declaring the
 * value in a separately typed variable sidesteps the object-literal check
 * without a cast, because the contextual type is then `CSSVars` rather than
 * `CSSProperties`.
 *
 * The intersection keeps every normal CSS property, so a `CSSVars` value is
 * still assignable to the `style` prop.
 */
export type CSSVars = CSSProperties & {
    [key: `--${string}`]: string | number | undefined
}