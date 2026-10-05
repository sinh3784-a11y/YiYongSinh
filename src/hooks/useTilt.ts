import { useEffect, useRef, type RefObject } from "react"

/** How far a card leans, in degrees, when the cursor is at its edge. */
const DEFAULT_MAX_TILT = 6

/**
 * Tracks the cursor across an element and publishes the result as CSS custom
 * properties. The stylesheet owns every visual decision:
 *
 *   --tilt-rx   rotateX angle, e.g. "-3.2deg"
 *   --tilt-ry   rotateY angle
 *   --glow-x    cursor position across the card, as a percentage
 *   --glow-y    cursor position down the card, as a percentage
 *
 * Nothing re-renders. Pointer events arrive at up to ~120Hz on a gaming mouse
 * and none of them should cost a React render, so this writes to `style` and
 * lets the compositor do the rest.
 *
 * Why custom properties instead of setting `transform` directly: the card needs
 * several things to share one `transform` function chain — the tilt, and a
 * hover lift. Writing the angles into variables and letting CSS compose them
 * means the lift can be a plain `:hover` rule changing `--tilt-lift`, with no
 * JavaScript involved and no chance of the two fighting over `transform`.
 *
 * Three conditions under which this deliberately does nothing, all of which
 * leave the card looking like an ordinary static card:
 *   - No `hover: hover` and `pointer: fine` media, i.e. touch. A tilt that
 *     never resets because there is no pointer is worse than no tilt.
 *   - `prefers-reduced-motion: reduce`.
 *   - The element is detached.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(
    maxTilt: number = DEFAULT_MAX_TILT,
): RefObject<T | null> {
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            return
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return
        }

        /* Publish neutral values up front so the CSS defaults and the JS values
           agree before the first pointermove. */
        const rest = {
            "--tilt-rx": "0deg",
            "--tilt-ry": "0deg",
            "--glow-x": "50%",
            "--glow-y": "50%",
        }

        const reset = () => {
            for (const [key, value] of Object.entries(rest)) {
                element.style.setProperty(key, value)
            }

            lastEvent = null
        }

        /* The angles are relative to the box, so a scroll moves the box under a
           stationary cursor and leaves the tilt stale. Keeping the last event
           lets the scroll listener repaint without a synthetic one. */
        let lastEvent: PointerEvent | null = null

        const paint = (event: PointerEvent) => {
            lastEvent = event

            const bounds = element.getBoundingClientRect()

            /* Guard against a zero-height box, which makes both divisions NaN
               and would poison the transform for the rest of the session. */
            if (bounds.width === 0 || bounds.height === 0) {
                return
            }

            /* -0.5..0.5 from the element's own centre. */
            const across = (event.clientX - bounds.left) / bounds.width - 0.5
            const down = (event.clientY - bounds.top) / bounds.height - 0.5

            /* Inverted on Y so the card tips *away* from the cursor, which is
               what sells it as a physical surface rather than a rotation. */
            element.style.setProperty("--tilt-rx", `${(-down * maxTilt).toFixed(2)}deg`)
            element.style.setProperty("--tilt-ry", `${(across * maxTilt).toFixed(2)}deg`)
            element.style.setProperty("--glow-x", `${((across + 0.5) * 100).toFixed(1)}%`)
            element.style.setProperty("--glow-y", `${((down + 0.5) * 100).toFixed(1)}%`)
        }

        reset()

        element.addEventListener("pointermove", paint)

        /* Leaving, or losing the window entirely, must not strand the card
           leaning at some arbitrary angle. */
        element.addEventListener("pointerleave", reset)
        window.addEventListener("blur", reset)

        const repaint = () => {
            if (lastEvent) {
                paint(lastEvent)
            }
        }

        window.addEventListener("scroll", repaint, { passive: true })

        return () => {
            element.removeEventListener("pointermove", paint)
            element.removeEventListener("pointerleave", reset)
            window.removeEventListener("blur", reset)
            window.removeEventListener("scroll", repaint)

            for (const key of Object.keys(rest)) {
                element.style.removeProperty(key)
            }
        }
    }, [maxTilt])

    return ref
}