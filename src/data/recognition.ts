export type RecognitionKind = "course" | "certificate" | "community" | "award" | "internship";

export interface RecognitionItem {
  id: string;
  kind: RecognitionKind;
  title: string;
  issuer: string;
  detail: string;
  meta?: string;
  href?: string;
}

/**
 * Training, certifications, and achievements.
 *
 * Only include verified training and achievements.
 */

export const recognitionCopy = {
  label: "CERTIFICATIONS & TRAINING",

  title: "Learning & Recognition",

  body: "Professional training, certifications, and learning experiences that strengthen my technical skills and support my growth as a backend developer.",
};

export const recognitionItems: RecognitionItem[] = [
  {
    id: "rec-etec-backend",
    kind: "course",
    title: "JAVA & Spring Boot Training",
    issuer: "ETEC",
    detail:
      "Completed training in Java, Spring Boot, RESTful API development, and database integration.",
    meta: "Completed",
    href: "/certificates/spring.jpeg",
  },
  {
    id: "rec-etec-backend",
    kind: "course",
    title: "PHP & Laravel Training",
    issuer: "ETEC",
    detail:
       "Completed training in PHP, Laravel MVC, Eloquent ORM, authentication, and CRUD operations.",
    meta: "Completed",
    href: "/certificates/laravel.jpeg",
  },
  {
    id: "rec-etec-backend",
    kind: "course",
    title: "Frontend Training",
    issuer: "JomNum Tech",
    detail:
      "Studied HTML, CSS, JavaScript, responsive web design, and interactive user interfaces.",
    meta: "Completed",
    href: "/certificates/",
  },
   {
    id: "rec-etec-backend",
    kind: "internship",
    title: "Internship Frontend",
    issuer: "ETEC",
    detail:
      "Gained practical software development experience through programming tasks and collaborative project work.",
    meta: "Completed",
    href: "/certificates/internship.jpeg",
  },
];
