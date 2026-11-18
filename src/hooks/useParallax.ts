import { useEffect, type RefObject } from "react"

interface UseParallaxOptions {
    /**
     * How far this layer drifts relative to the page, as a fraction of the
     * travel the page makes past the layer. 1 tracks the scroll exactly; above 1
     * lags behind it; below 1 moves with it. Negative values invert.
     */
    speed?: number
    /**
     * Extra element whose box defines the scroll window, instead of the
     * viewport. Rarely needed — the hero is the only parallax on the site — and
     * note that passing `document.documentElement` gets you the *document*
     * height, not the viewport.
     */
    root?: RefObject<HTMLElement | null>
}

/**
 * Scroll-linked drift for the hero, published as CSS custom properties rather
 * than inline styles so the stylesheet stays in charge:
 *
 *   --parallax-y   vertical offset in pixels, 0 at rest
 *   --parallax-fade  0 while any of the element is on screen, 1 once it has left
 *
 * Writes to `style`, never to state: a scroll handler that re-renders React is
 * the classic way to make a page stutter, and none of this needs to render.
 *
 * `speed` is a multiplier on the drift, so the content layer and the portrait
 * can separate from one another out of a single implementation.
 *
 * Both properties are 0 until the first scroll *and* 0 again when there is no
 * travel to report, so a JS failure, a missing `IntersectionObserver` or a slow
 * first frame leaves the hero at rest rather than offset.
 *
 * Under `prefers-reduced-motion: reduce` this does nothing at all, and the
 * custom properties keep their `0` defaults.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
    ref: RefObject<T | null>,
    { speed = 1, root }: UseParallaxOptions = {},
): void {
    useEffect(() => {
        const element = ref.current

        if (!element) {
            return
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return
        }

        let frame = 0

        /* The scroll offset the layer was mounted at. Drift is measured from
           here rather than from the element's absolute position in the
           viewport: the hero's centre begins halfway down the window, so any
           absolute measure starts at about 0.5 and a formula keyed to it
           translates the layer before the visitor has scrolled at all. Anchoring
           to the mount offset makes the offset exactly 0 at rest.

           It also survives a reload that lands mid-page, and it is independent
           of `span`, so a resize cannot shift a layer that has not been
           scrolled. */
        let origin: number | null = null

        const paint = () => {
            frame = 0

            /* An explicit `root` defines the window; otherwise it is the
               viewport. Never the document — its box is ~9900px tall, not 900. */
            const track = root?.current
            const span = track
                ? track.getBoundingClientRect().height || window.innerHeight
                : window.innerHeight

            if (origin === null) {
                origin = window.scrollY
            }

            /* Viewport heights of page travel past the layer since mount. */
            const travel = (window.scrollY - origin) / span

            /* Positive, so a layer drifts down slower than the page moves up and
               reads as sitting behind it. Scaled by `speed`, which is what
               separates the portrait from the text as the hero leaves. */
            const offset = travel * 140 * speed

            element.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`)

            /* Fade on the way out only, keyed to the element's own box rather
               than to its travel: `exit` is 0 while any of it is on screen and
               1 once it has passed the top edge.

               Keying this to travel instead would mean fading the hero out while
               it is still readable — the hero is a full viewport tall and flush
               with the bottom edge at rest, so it only starts leaving after a
               whole screen of scroll.

               The visible fade is then remapped to the last 40% of that exit. A
               hero that starts dimming the moment its top edge crosses the fold
               is dimming text that is still the main thing on screen; holding
               full opacity until it is two thirds gone keeps it readable for as
               long as it can be read, and fades it only as it actually leaves. */
            const bounds = element.getBoundingClientRect()
            const height = bounds.height || span
            const exit = Math.max(0, Math.min(1, -bounds.top / height))
            const fade = Math.max(0, Math.min(1, (exit - 0.6) / 0.4))

            element.style.setProperty("--parallax-fade", fade.toFixed(3))
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

            element.style.removeProperty("--parallax-y")
            element.style.removeProperty("--parallax-fade")
        }
    }, [ref, speed, root])
}