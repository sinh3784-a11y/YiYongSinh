import { profile } from "../data/profile"
import Icon from "./Icon"
import { useState } from "react"

/** How long the success state stays before the button resets. */
const RESET_AFTER = 2400

type Status = "idle" | "copied" | "failed"

/**
 * Copies the email address to the clipboard.
 *
 * Why a copy button at all: the address is already a `mailto:` link a few pixels
 * away, and the reason people reach for copy is that they are about to paste it
 * into something. This is the action they actually wanted.
 *
 * `navigator.clipboard` needs a secure context, so on plain http it is missing
 * entirely. Rather than degrade to a button that silently does nothing, the
 * failure path falls back to selecting the address on screen and says so —
 * an honest "I could not copy, here it is" beats a lying check mark.
 */
function CopyEmail() {
    const [status, setStatus] = useState<Status>("idle")
    const email = profile.email

    async function copy() {
        const clipboard = navigator.clipboard

        if (!clipboard) {
            selectInstead()
            return
        }

        try {
            await clipboard.writeText(email)
            setStatus("copied")
        } catch {
            selectInstead()
        }

        window.setTimeout(() => setStatus("idle"), RESET_AFTER)
    }

    /** Last resort: put the address in the selection so Ctrl+C works. */
    function selectInstead() {
        const input = document.createElement("input")
        input.value = email
        input.setAttribute("readonly", "")
        input.style.position = "fixed"
        input.style.opacity = "0"

        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        input.remove()

        setStatus("failed")
    }

    const isCopied = status === "copied"
    const isFailed = status === "failed"

    const label = isCopied
        ? "Email address copied"
        : isFailed
          ? "Copy failed — address selected instead"
          : `Copy ${email} to clipboard`

    return (
        <button
            type="button"
            className="copy-email"
            /* The glyph swap and the colour change are driven off this rather
               than a state class, so the stylesheet owns the whole transition
               and the markup never changes shape. */
            data-status={status}
            onClick={copy}
            aria-label={label}
            title={label}
        >
            {/* Both glyphs are always mounted; CSS crossfades them. Keeps the
                button's width from changing as the state flips. */}
            <span className="copy-email-icon" aria-hidden="true">
                <Icon name="email" className="copy-icon-mail" />
                <Icon
                    name={isFailed ? "close" : "check"}
                    className={isFailed ? "copy-icon-fail" : "copy-icon-check"}
                />
            </span>

            <span className="copy-email-text">
                {isCopied ? "Copied" : isFailed ? "Select it above" : "Copy address"}
            </span>

            {/* Announces the outcome without moving focus or changing layout. */}
            <span className="visually-hidden" role="status">
                {isCopied ? "Email address copied to clipboard" : null}
            </span>
        </button>
    )
}

export default CopyEmail