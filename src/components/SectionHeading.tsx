interface SectionHeadingProps {
    /** Small uppercase kicker above the title. */
    label: string
    title: string
    body?: string
    /** Centred variant, used where there is no adjacent column. */
    align?: "start" | "center"
}

function SectionHeading({ label, title, body, align = "start" }: SectionHeadingProps) {
    const className =
        align === "center" ? "section-heading section-heading-center" : "section-heading"

    return (
        <div className={className}>
            <span className="section-label">{label}</span>
            <h2>{title}</h2>
            {body && <p>{body}</p>}
        </div>
    )
}

export default SectionHeading
