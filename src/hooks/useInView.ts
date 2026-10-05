import { useEffect, useRef, type RefObject } from "react"

/** Attribute values the stylesheet keys off. */
const ARMED = "hidden"

interface UseInViewOptions {
    /** Reveal only the first time, then stop observing. Default true. */
    once?: boolean
    /** Fraction of the element that must be on screen. Default 0.15. */
    threshold?: number
    /** Shrink the observer box, e.g. "0px 0px -10% 0px" to fire slightly late. */
    rootMargin?: string
}

function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Contract with the stylesheet:
 *   - `data-reveal-armed="hidden"` means "apply the pre-reveal state".
 *   - The hook *adds* that attribute on mount and *removes* it on reveal, so
 *     once an element has animated it carries no leftover inline state and
 *     hover styles are free to own `transform` again.
 *   - `data-inview="true"` marks a revealed element. It has no styling of its
 *     own; it exists so tests and CSS hooks can see the state.
 *
 * Deliberately returns a ref rather than state: a scroll listener that causes
 * React re-renders is a performance bug, and nothing here needs to re-render.
 *
 * Two fail-safes, both of which leave content fully visible:
 *   - If `IntersectionObserver` is missing, the hook does nothing at all.
 *   - If the user prefers reduced motion, the hook does nothing at all.
 * Without either, the "hidden" state would never be lifted and the content
 * would be permanently invisible.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {},
): RefObject<T | null> {
    const { once = true, threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = options

    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current

        if (!element || typeof IntersectionObserver === "undefined") {
            return
        }

        if (prefersReducedMotion()) {
            return
        }

        element.dataset.revealArmed = ARMED

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]

                if (!entry) {
                    return
                }

                if (entry.isIntersecting) {
                    delete element.dataset.revealArmed
                    element.dataset.inview = "true"

                    if (once) {
                        observer.unobserve(entry.target)
                    }
                } else if (!once) {
                    element.dataset.revealArmed = ARMED
                    delete element.dataset.inview
                }
            },
            { threshold, rootMargin },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
            delete element.dataset.revealArmed
            delete element.dataset.inview
        }
    }, [once, threshold, rootMargin])

    return ref
}
