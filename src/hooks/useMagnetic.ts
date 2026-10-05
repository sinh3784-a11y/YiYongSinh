import { useEffect, useRef, type RefObject } from "react"

/** Peak pull as a fraction of the pointer's offset from the element's centre. */
const DEFAULT_PULL = 0.28
/** Below this distance from the centre, do not move at all. */
const DEAD_ZONE = 8

/**
 * Pulls an element gently toward the cursor, the way a physical button sticks
 * to a finger before it clicks.
 *
 * Publishes two custom properties and nothing else:
 *   --magnetic-x   horizontal pull in px
 *   --magnetic-y   vertical pull in px
 *
 * CSS composes them into a `translate`. Same reasoning as `useTilt`: the
 * pull has to coexist with the hover lift, the focus ring and the entrance
 * animation, and only the stylesheet can put them in one `transform` chain
 * without them fighting.
 *
 * Deliberately inert without a real pointer (touch) and under reduced motion.
 * A magnet that cannot be released because nothing ever "leaves" is worse than
 * no magnet.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
    pull: number = DEFAULT_PULL,
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

        let lastEvent: PointerEvent | null = null

        const release = () => {
            lastEvent = null
            element.style.setProperty("--magnetic-x", "0px")
            element.style.setProperty("--magnetic-y", "0px")
        }

        const paint = (event: PointerEvent) => {
            lastEvent = event

            const bounds = element.getBoundingClientRect()

            if (bounds.width === 0 || bounds.height === 0) {
                return
            }

            const dx = event.clientX - (bounds.left + bounds.width / 2)
            const dy = event.clientY - (bounds.top + bounds.height / 2)

            /* Inside the dead zone, stay put. Chasing the cursor by a pixel or
               two reads as jitter, not as magnetism. */
            const inX = Math.abs(dx) > DEAD_ZONE ? dx : 0
            const inY = Math.abs(dy) > DEAD_ZONE ? dy : 0

            element.style.setProperty("--magnetic-x", `${(inX * pull).toFixed(1)}px`)
            element.style.setProperty("--magnetic-y", `${(inY * pull).toFixed(1)}px`)
        }

        element.addEventListener("pointermove", paint)
        element.addEventListener("pointerleave", release)
        window.addEventListener("blur", release)

        /* As with `useTilt`, the offset is measured against the box, so a
           scroll invalidates it. */
        const repaint = () => {
            if (lastEvent) {
                paint(lastEvent)
            }
        }

        window.addEventListener("scroll", repaint, { passive: true })

        return () => {
            element.removeEventListener("pointermove", paint)
            element.removeEventListener("pointerleave", release)
            window.removeEventListener("blur", release)
            window.removeEventListener("scroll", repaint)

            element.style.removeProperty("--magnetic-x")
            element.style.removeProperty("--magnetic-y")
        }
    }, [pull])

    return ref
}