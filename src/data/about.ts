import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";

export interface AboutFact {
  id: string;
  label: string;
  value: string;
}

export interface AboutStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

/* ===================================
   ABOUT SECTION CONTENT
=================================== */

export const aboutCopy = {
  label: "ABOUT ME",

  title: "Backend Developer Building End-to-End Web Applications",

  lead: "I focus on developing reliable backend systems, designing RESTful APIs, and building practical web applications that solve real-world problems.",
};

/* ===================================
   PERSONAL & TECHNICAL INFORMATION
=================================== */

export const aboutFacts: AboutFact[] = [
  {
    id: "location",
    label: "Based in",
    value: profile.location,
  },
  {
    id: "focus",
    label: "Specialization",
    value:
      "RESTful APIs, database design, authentication, and backend development",
  },
  {
    id: "learning",
    label: "Currently improving",
    value:
      "Backend architecture, TypeScript, testing, and database optimization",
  },
  {
    id: "status",
    label: "Availability",
    value: profile.openToWork
      ? "Open to internships and junior developer opportunities"
      : "Not currently seeking opportunities",
  },
];

/* ===================================
   DEVELOPMENT PRINCIPLES
=================================== */

export const aboutPrinciples: AboutFact[] = [
  {
    id: "schema-first",
    label: "Schema First",
    value: "I design clear database relationships before building APIs.",
  },
  {
    id: "boring-code",
    label: "Reliable by Design",
    value:
      "I prioritize validation, secure authentication, clear error handling, and maintainable code.",
  },
  {
    id: "ship-it",
    label: "Build, Test & Improve",
    value:
      "I build practical applications and continuously improve them through testing, feedback, and hands-on experience.",
  },
];

/* ===================================
   ABOUT STATISTICS
=================================== */

export const aboutStats: AboutStat[] = [
  {
    id: "years",
    label: "Years of Coding",
    value: 3,
    suffix: "+",
  },
  {
    id: "technologies",
    label: "Technologies Explored",
    value: skills.length,
  },
  {
    id: "projects",
    label: "Featured Projects",
    value: projects.length,
  },
];
