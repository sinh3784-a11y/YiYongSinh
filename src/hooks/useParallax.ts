import { useEffect, type RefObject } from "react"

interface UseParallaxOptions {
    /**
     * How many times faster than the page this layer moves. 1 tracks the
     * scroll exactly; >1 drifts away from it; <1 lags behind. Negative values
     * move against the scroll.
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
 * Where the element sits in the viewport: 0 at the bottom edge, 1 at the top.
 *
 * `span` is the height of the window being measured against, and it has to be
 * the *viewport*. `document.documentElement` is not a substitute — its box is
 * the whole document, so on this page (about 9900px tall) a hero sitting at the
 * top reads as `1 - 532/9900`, i.e. already 95% of the way past, and gets faded
 * out before anyone has scrolled.
 */
function progressThroughViewport(element: HTMLElement, span: number): number {
    const bounds = element.getBoundingClientRect()

    return 1 - (bounds.top + bounds.height / 2) / span
}

/**
 * Scroll-linked drift for the hero, published as CSS custom properties rather
 * than inline styles so the stylesheet stays in charge:
 *
 *   --parallax-y   vertical offset in pixels
 *   --parallax-fade  0 at rest, 1 once the element has scrolled past
 *
 * Writes to `style`, never to state: a scroll handler that re-renders React is
 * the classic way to make a page stutter, and none of this needs to render.
 *
 * `speed` is a multiplier on the travel distance, so the content layer and the
 * code card can move at different rates from one shared implementation.
 *
 * Both properties default to `0`, which CSS reads as "no drift, no fade" — so a
 * JS failure, a missing `IntersectionObserver` or a slow first frame leaves the
 * hero at full opacity rather than blank.
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

        const paint = () => {
            frame = 0

            /* An explicit `root` defines the window; otherwise it is the
               viewport. Never the document — see `progressThroughViewport`. */
            const track = root?.current
            const span = track
                ? track.getBoundingClientRect().height || window.innerHeight
                : window.innerHeight

            const progress = progressThroughViewport(element, span)

            /* Drift the layer by a fraction of how far it has travelled. The
               sign is positive so content exits upward with the scroll. */
            const offset = (progress - 1) * 140 * speed

            element.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`)

            /* Fade only on the way out, and only over the last third, so the
               hero is fully legible while it is being read. */
            const fade = Math.max(0, Math.min(1, (progress - 0.66) / 0.34))

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