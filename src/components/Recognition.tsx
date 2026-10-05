import {
    recognitionCopy,
    recognitionItems,
    type RecognitionItem,
    type RecognitionKind,
} from "../data/recognition"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const KIND_LABEL: Record<RecognitionKind, string> = {
    course: "Course",
    certificate: "Certificate",
    community: "Community",
    award: "Award",
}

interface RecognitionCardProps {
    item: RecognitionItem
}

function RecognitionCard({ item }: RecognitionCardProps) {
    const label = KIND_LABEL[item.kind]

    const body = (
        <>
            <div className="recognition-top">
                <span className="recognition-kind">{label}</span>
                {item.meta && <span className="recognition-meta">{item.meta}</span>}
            </div>

            <h3>{item.title}</h3>
            <span className="recognition-issuer">{item.issuer}</span>
            <p>{item.detail}</p>
        </>
    )

    return (
        <li className="recognition-card">
            {/* One <a> wrapping the whole card keeps it a single tab stop. A card
                with a nested link plus a heading link would double every entry
                in the tab order. */}
            {item.href ? (
                <a
                    className="recognition-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.title} — ${item.issuer}`}
                >
                    {body}
                </a>
            ) : (
                <div className="recognition-link">{body}</div>
            )}
        </li>
    )
}

function Recognition() {
    return (
        <section id="recognition" className="section recognition">
            <Reveal>
                <SectionHeading
                    label={recognitionCopy.label}
                    title={recognitionCopy.title}
                    body={recognitionCopy.body}
                />
            </Reveal>

            {/* `as="ul"` is load-bearing: the default div wrapper would strip
                the list semantics off the li children. */}
            <Reveal stagger as="ul" className="recognition-grid">
                {recognitionItems.map((item) => (
                    <RecognitionCard key={item.id} item={item} />
                ))}
            </Reveal>
        </section>
    )
}

export default Recognition