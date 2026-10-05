import { nowCopy, nowItems, type NowItem, type NowKind } from "../data/now"
import Icon, { type IconName } from "./Icon"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

/** Each row gets a glyph and a tint so the list scans without colour alone. */
const KIND_META: Record<NowKind, { icon: IconName; label: string }> = {
    building: { icon: "external", label: "Building" },
    learning: { icon: "arrow-up", label: "Learning" },
    reading: { icon: "menu", label: "Reading" },
}

interface NowRowProps {
    item: NowItem
}

function NowRow({ item }: NowRowProps) {
    const meta = KIND_META[item.kind]

    return (
        <li className="now-item">
            {/* The kind is written out, not just tinted — colour is not the
                only thing carrying the meaning. */}
            <span className="now-kind">
                <Icon name={meta.icon} />
                {meta.label}
            </span>

            <div className="now-body">
                <h3>
                    {item.title}
                    {item.href && item.hrefLabel && (
                        <a
                            className="now-link"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${item.hrefLabel}: ${item.title}`}
                        >
                            <Icon name="external" />
                        </a>
                    )}
                </h3>
                <p>{item.detail}</p>
            </div>
        </li>
    )
}

function Now() {
    return (
        <section id="now" className="section now">
            <Reveal>
                <SectionHeading
                    label={nowCopy.label}
                    title={nowCopy.title}
                    body={nowCopy.body}
                />
            </Reveal>

            {/* `as="ul"` is load-bearing: the default div wrapper would strip
                the list semantics off the li children. */}
            <Reveal stagger as="ul" className="now-list">
                {nowItems.map((item) => (
                    <NowRow key={item.id} item={item} />
                ))}
            </Reveal>
        </section>
    )
}

export default Now