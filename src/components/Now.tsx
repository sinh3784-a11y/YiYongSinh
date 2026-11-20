import { nowCopy, nowItems, type NowItem, type NowKind } from "../data/now";

import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const KIND_META: Record<NowKind, { icon: IconName; label: string }> = {
  building: {
    icon: "external",
    label: "Building",
  },
  learning: {
    icon: "arrow-up",
    label: "Learning",
  },
  reading: {
    icon: "menu",
    label: "Reading",
  },
};

interface NowRowProps {
  item: NowItem;
}

function NowRow({ item }: NowRowProps) {
  const meta = KIND_META[item.kind];

  // Open external websites in a new browser tab.
  const isExternal = Boolean(item.href && /^https?:\/\//i.test(item.href));

  // Determine the button label.
  const buttonLabel =
    item.hrefLabel ??
    (item.kind === "building" ? "View Project" : "View Resource");

  return (
    <li className="now-item">
      {/* Activity category */}
      <span className="now-kind">
        <Icon name={meta.icon} />
        {meta.label}
      </span>

      {/* Card content */}
      <div className="now-body">
        <h3>{item.title}</h3>

        <p>{item.detail}</p>

        {/* Show button only when a link exists */}
        {item.href && (
          <a
            href={item.href}
            className="now-view-btn"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={`${buttonLabel}: ${item.title}`}
          >
            <span>{buttonLabel}</span>
            <Icon name="external" />
          </a>
        )}
      </div>
    </li>
  );
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

      <Reveal stagger as="ul" className="now-list">
        {nowItems.map((item) => (
          <NowRow key={item.id} item={item} />
        ))}
      </Reveal>
    </section>
  );
}

export default Now;
