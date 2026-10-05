import { useCallback, useSyncExternalStore } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

/**
 * Browser-chrome tint per theme. These must match `--bg` in `src/index.css`,
 * and the dark one is duplicated in `index.html` for the case where no script
 * ever runs.
 */
const THEME_COLOR: Record<Theme, string> = {
    dark: "#080a10",
    light: "#f6f7fb",
}

/**
 * Matches the inline script in `index.html`.
 *
 * `null` means "nothing has written `data-theme` yet", which is the server
 * render. The toggle stays disabled until a value lands.
 */
function readCurrentTheme(): Theme | null {
    if (typeof document === "undefined") {
        return null
    }

    const value = document.documentElement.dataset.theme

    return value === "light" || value === "dark" ? value : null
}

function systemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

function storedTheme(): Theme | null {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)

        return saved === "light" || saved === "dark" ? saved : null
    } catch {
        /* Private browsing, or storage is disabled. */
        return null
    }
}

/**
 * Writes the attribute on `<html>` rather than on a wrapper, which is what lets
 * `src/index.css` switch purely on `:root[data-theme="light"]`, with no
 * component knowing which theme is active.
 *
 * `persist` is false when the theme was chosen by the OS rather than the
 * visitor. Storing that would freeze the page at whatever the system happened
 * to be doing at load time, which is the bug `storedTheme` guards against.
 */
function writeTheme(next: Theme, persist: boolean) {
    document.documentElement.dataset.theme = next

    /* Keep the address bar / mobile chrome tint in step with the page. */
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", THEME_COLOR[next])

    if (persist) {
        try {
            localStorage.setItem(STORAGE_KEY, next)
        } catch {
            /* Private browsing, or storage is disabled. The theme still
               applies for this page view; it just will not be remembered. */
        }
    }
}

/**
 * The DOM attribute *is* the store, so the snapshot is a straight read of it and
 * there is no duplicated copy to fall out of sync. It is a primitive, which is
 * what lets `useSyncExternalStore` compare it with `Object.is` — no caching
 * needed, no `useState` to seed from a DOM that does not exist during SSR.
 */
const listeners = new Set<() => void>()

function emit() {
    for (const listener of listeners) {
        listener()
    }
}

let followingSystem = false

function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange)

    /* One media listener for the page, not one per subscriber. Follow the
       system until the visitor states a preference of their own: without this,
       someone whose OS flips at sunset is stuck on whatever the page happened
       to be when they loaded it. */
    if (!followingSystem) {
        followingSystem = true

        const media = window.matchMedia("(prefers-color-scheme: light)")

        media.addEventListener("change", (event) => {
            if (storedTheme() !== null) {
                return
            }

            writeTheme(event.matches ? "light" : "dark", false)
            emit()
        })
    }

    return () => {
        listeners.delete(onStoreChange)
    }
}

/** The server has no DOM and therefore no theme. */
function getServerTheme(): Theme | null {
    return null
}

/**
 * Theme, persisted to `localStorage` and read back through
 * `useSyncExternalStore`.
 *
 * Not `useState`. The initial value would have to come from the DOM, which
 * does not exist during SSR, and seeding it on the client instead means
 * hydration compares the server's `null` against a real theme and reports a
 * mismatch. `useSyncExternalStore` is built for exactly this shape: React
 * renders `getServerSnapshot` while hydrating, then re-renders from
 * `getSnapshot` once the DOM is authoritative — no effect, no `setState` after
 * mount, no flash of the wrong theme.
 */
export function useTheme() {
    const theme = useSyncExternalStore(subscribe, readCurrentTheme, getServerTheme)

    const toggle = useCallback(() => {
        const current = readCurrentTheme() ?? systemTheme()

        writeTheme(current === "dark" ? "light" : "dark", true)
        emit()
    }, [])

    return { theme, toggle }
}
