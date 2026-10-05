import type { CSSVars } from "../types/css"

interface WordsProps {
    /** The text to split. Rendered as-is inside each word, never as HTML. */
    text: string
    className?: string
    /** Base delay in ms for the first word; each word adds `--word-step`. */
    delay?: number
}

/**
 * Splits a string into words so they can arrive one at a time.
 *
 * The reveal is a CSS animation with a per-word `animation-delay` read from an
 * `--i` custom property, so it runs on load with no JavaScript and no observer.
 * That matters here: this is above the fold, and anything gated behind
 * `IntersectionObserver` would either miss it or need a special case.
 *
 * Each word keeps a real space after it so the text still wraps, selects and
 * copies normally — an inline-block per word with no trailing space would
 * collapse "Yi YongSinh" into "YiYongSinh" on copy.
 */
function Words({ text, className, delay = 0 }: WordsProps) {
    const words = text.split(" ")

    const groupStyle: CSSVars = { "--word-delay": `${delay}ms` }

    return (
        <span className={className} style={groupStyle}>
            {words.map((word, index) => {
                /* The array is derived from `text`, so the index is a stable
                   identity here — no dedupe concern. */
                const wordStyle: CSSVars = { "--i": index }

                return (
                    <span key={`${word}-${index}`} className="word" style={wordStyle}>
                        {word}
                        {" "}
                    </span>
                )
            })}
        </span>
    )
}

export default Words