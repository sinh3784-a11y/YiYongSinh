import { useCountUp } from "../hooks/useCountUp"

interface CountUpProps {
    /** The final figure. Rendered as-is in the markup before JS takes over. */
    value: number
    /** Appended after the number and never animated. */
    suffix?: string
    /** Tweak the length of the count. */
    duration?: number
}

/**
 * A number that animates from zero to `value` the first time it scrolls into
 * view.
 *
 * The final value is what lands in the HTML, so without JavaScript — and for
 * crawlers — this is just a number. `useCountUp` rewrites it to 0 only after
 * hydrating in a browser, and writes the text directly rather than through
 * state, so a 1.6s count costs zero React renders.
 *
 * Kept as its own component so the `ref`/`textContent` juggling never leaks
 * into the section that renders it.
 */
function CountUp({ value, suffix, duration }: CountUpProps) {
    const ref = useCountUp<HTMLSpanElement>(value, { duration })

    return (
        <span className="stat-value">
            <span ref={ref}>{value}</span>
            {suffix ? <span className="stat-suffix">{suffix}</span> : null}
        </span>
    )
}

export default CountUp