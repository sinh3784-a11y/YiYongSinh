import { useEffect, useRef, type RefObject } from "react"

/** Ease-out cubic: fast start, long settle. Reads as "counting up to" rather
    than "moving at constant speed". */
function easeOutCubic(t: number): number {
    return 1 - (1 - t) ** 3
}

/**
 * Counts an element's text content from 0 to `to` the first time it scrolls
 * into view, using `requestAnimationFrame` and writing `textContent` directly.
 *
 * No state, so no render. The count is presentation only.
 *
 * Progressive enhancement, which is the part that matters here: the component
 * renders the *final* number in the markup, so search engines and users without
 * JavaScript see the real value. This hook rewrites the text to 0 only once it
 * has mounted in a browser, and only if it is actually going to animate. Under
 * `prefers-reduced-motion: reduce`, or with no `IntersectionObserver`, it
 * leaves the final value exactly where it found it.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
    to: number,
    { duration = 1600 }: { duration?: number } = {},
): RefObject<T | null> {
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        const settle = () => {
            element.textContent = String(to)
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return
        }

        if (typeof IntersectionObserver === "undefined") {
            return
        }

        element.textContent = "0"

        let frame = 0

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]

                if (!entry?.isIntersecting) {
                    return
                }

                observer.disconnect()

                const start = performance.now()

                const tick = (now: number) => {
                    const elapsed = now - start

                    if (elapsed >= duration) {
                        element.textContent = String(to)
                        frame = 0

                        return
                    }

                    const value = Math.round(to * easeOutCubic(elapsed / duration))

                    element.textContent = String(value)
                    frame = requestAnimationFrame(tick)
                }

                frame = requestAnimationFrame(tick)
            },
            { threshold: 0.4 },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()

            if (frame !== 0) {
                cancelAnimationFrame(frame)
            }

            /* Never leave a partial number behind for a mid-count unmount. */
            settle()
        }
    }, [to, duration])

    return ref
}