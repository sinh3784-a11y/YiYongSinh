import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently occupying the top of the viewport.
 *
 * Pass a module-level array (see `navIds` in `data/navigation.ts`) so its
 * identity is stable. The effect keys off the joined ids instead of the array
 * itself, so an inline `.map()` would not cause a re-subscribe every render.
 *
 * @param ids     Section ids, in document order.
 * @param offset  Distance from the top of the viewport, in px. Accounts for the
 *                fixed navbar so a section is not "active" while its heading is
 *                still hidden behind it.
 */
export function useScrollSpy(ids: readonly string[], offset = 96): string {
    const [activeId, setActiveId] = useState<string>(ids[0] ?? "")

    const key = ids.join("|")

    useEffect(() => {
        const sectionIds = key.length > 0 ? key.split("|") : []

        if (sectionIds.length === 0) {
            return
        }

        function update() {
            let current = sectionIds[0]

            for (const id of sectionIds) {
                const element = document.getElementById(id)

                if (element && element.getBoundingClientRect().top - offset <= 0) {
                    current = id
                }
            }

            // Pin the final section once the page is scrolled to the bottom.
            // Short pages never reach it, and the last entry would otherwise
            // be unreachable.
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2

            if (atBottom) {
                current = sectionIds[sectionIds.length - 1]
            }

            setActiveId(current)
        }

        update()

        window.addEventListener("scroll", update, { passive: true })
        window.addEventListener("resize", update)

        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [key, offset])

    return activeId
}

/** Tracks whether the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 12): boolean {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        function update() {
            setScrolled(window.scrollY > threshold)
        }

        update()
        window.addEventListener("scroll", update, { passive: true })

        return () => {
            window.removeEventListener("scroll", update)
        }
    }, [threshold])

    return scrolled
}
