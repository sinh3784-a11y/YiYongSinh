import { useEffect, type RefObject } from "react"

/**
 * Drives a scroll progress bar by writing `transform: scaleX()` straight onto
 * the referenced element.
 *
 * Two details that matter:
 *   - It mutates the DOM instead of holding state, so scrolling never triggers
 *     a React render.
 *   - Updates are coalesced into one `requestAnimationFrame` per frame, so a
 *     fast scroll cannot queue up hundreds of style writes.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): void {
    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        let frame = 0

        /* Arrow functions, not declarations: a hoisted `function paint()` is
           treated as callable before the null guard above, so TypeScript drops
           the narrowing and reports `element` as possibly null inside it. */
        const paint = () => {
            frame = 0

            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0

            element.style.transform = `scaleX(${progress})`
        }

        const schedule = () => {
            if (frame === 0) {
                frame = requestAnimationFrame(paint)
            }
        }

        paint()

        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", schedule)

        return () => {
            if (frame !== 0) {
                cancelAnimationFrame(frame)
            }

            window.removeEventListener("scroll", schedule)
            window.removeEventListener("resize", schedule)
        }
    }, [ref])
}
