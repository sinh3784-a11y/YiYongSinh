import {
  recognitionCopy,
  recognitionItems,
  type RecognitionItem,
  type RecognitionKind,
} from "../data/recognition";

import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const KIND_LABEL: Record<RecognitionKind, string> = {
  course: "Course",
  certificate: "Certificate",
  community: "Community",
  award: "Award",
  internship: "Internship",
};

interface RecognitionCardProps {
  item: RecognitionItem;
}

function RecognitionCard({ item }: RecognitionCardProps) {
  const label = KIND_LABEL[item.kind];

  const isExternal = Boolean(item.href && /^https?:\/\//i.test(item.href));

  const viewLabel =
    item.kind === "internship"
      ? "View Internship Leter"
      : item.kind === "certificate"
        ? "View Certificate"
        : "View Training Document";

  const body = (
    <>
      <div className="recognition-top">
        <span className="recognition-kind">{label}</span>

        {item.meta && <span className="recognition-meta">{item.meta}</span>}
      </div>

      <h3>{item.title}</h3>

      <span className="recognition-issuer">{item.issuer}</span>

      <p>{item.detail}</p>

      {/* Visual button inside the existing card link */}
      {item.href && (
        <span className="recognition-view-btn" aria-hidden="true">
          <span>{viewLabel}</span>
          <Icon name="external" />
        </span>
      )}
    </>
  );

  return (
    <li className="recognition-card">
      {item.href ? (
        <a
          className="recognition-link"
          href={item.href}
          target={
            isExternal || item.href.startsWith("/") ? "_blank" : undefined
          }
          rel="noopener noreferrer"
          aria-label={`${viewLabel}: ${item.title} — ${item.issuer}`}
        >
          {body}
        </a>
      ) : (
        <div className="recognition-link">{body}</div>
      )}
    </li>
  );
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

      <Reveal
        stagger
        as="ul"
        className={`recognition-grid ${
          recognitionItems.length === 1 ? "recognition-grid--single" : ""
        }`}
      >
        {recognitionItems.map((item) => (
          <RecognitionCard key={item.id} item={item} />
        ))}
      </Reveal>
    </section>
  );
}

export default Recognition;