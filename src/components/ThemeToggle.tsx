import { useTheme } from "../hooks/useTheme"
import Icon from "./Icon"

/**
 * Light/dark switch.
 *
 * Rendered as a real `<button>` with `aria-pressed`, not a checkbox or a bare
 * div, so it is reachable by keyboard and announces its state.
 *
 * The icon is swapped rather than animated between two states: a crossfade on
 * an SVG that has no second path to fade from tends to look like a glitch, and
 * this is the one control a first-time visitor is guaranteed to press.
 */
function ThemeToggle() {
    const { theme, toggle } = useTheme()

    // Undefined until the inline script in index.html has set data-theme.
    const isLight = theme === "light"
    const label = isLight ? "Switch to dark theme" : "Switch to light theme"

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={label}
            title={label}
            aria-pressed={isLight}
            disabled={theme === null}
        >
            {/* Both icons render; CSS picks one per theme. Keeps the DOM shape
                identical across a toggle, so nothing reflows around it. */}
            <span className="theme-toggle-icon" aria-hidden="true">
                <Icon name="sun" className="theme-icon-sun" />
                <Icon name="moon" className="theme-icon-moon" />
            </span>
        </button>
    )
}

export default ThemeToggle