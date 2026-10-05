import type { ElementType, ReactNode } from "react"

import { useInView } from "../hooks/useInView"

interface RevealProps {
    children: ReactNode
    /**
     * Stagger the direct children instead of animating the wrapper as one
     * block. Each child is delayed in turn, so a grid of cards cascades.
     */
    stagger?: boolean
    /** Merged onto the wrapper, so it can carry the layout class itself. */
    className?: string
    as?: ElementType
}

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 *
 * The wrapper renders as a `div` by default; pass `as` to change the tag, or
 * put `className` on it when it is also the layout container.
 *
 * Everything degrades to plain visible content when JavaScript is unavailable,
 * when `IntersectionObserver` is unsupported, or when the visitor has asked for
 * reduced motion. See `useInView`.
 */
function Reveal({ children, stagger = false, className, as: Tag = "div" }: RevealProps) {
    const ref = useInView<HTMLElement>()

    const classes = [stagger ? "stagger" : "reveal", className]
        .filter(Boolean)
        .join(" ")

    return (
        <Tag ref={ref} className={classes}>
            {children}
        </Tag>
    )
}

export default Reveal
