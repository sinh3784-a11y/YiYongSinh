export type NowKind = "building" | "learning" | "reading";

export interface NowItem {
  id: string;
  kind: NowKind;
  title: string;
  detail: string;
  href?: string;
  hrefLabel?: string;
}

/**
 * Current activities displayed on the portfolio.
 *
 * Keep this section updated to reflect
 * real projects and ongoing learning.
 */

export const nowCopy = {
  label: "CURRENT FOCUS",

  title: "What I'm Working On",

  body: "A snapshot of the projects I'm building, technologies I'm exploring, and skills I'm improving as I grow as a backend developer.",
};

export const nowItems: NowItem[] = [
  // ==========================================
  // CURRENT PROJECTS
  // ==========================================

  {
    id: "now-portfolio",
    kind: "building",
    title: "Portfolio Website",
    detail:
      "Improving my personal portfolio with React, TypeScript, responsive design, animations, and better user experience.",
    href: "https://www.yiyongsinh.online/",
    hrefLabel: "View Website",
  },

  {
    id: "now-warehouse",
    kind: "building",
    title: "Warehouse Management API",
    detail:
      "Developing inventory management, sales order workflows, stock tracking, and business logic using Node.js, TypeScript, and PostgreSQL.",
    href: "https://github.com/sinh3784-a11y/POS-SYSTEM-BACKEND",
    hrefLabel: "View Code"
  },

  {
    id: "now-chang",
    kind: "building",
    title: "Chang Application",
    detail:
      "Building a service marketplace connecting customers with technicians, featuring authentication, bookings, and role-based access control.",
    href: "https://github.com/Chang-Applicatin",
    hrefLabel: "View Code"
  },

  // ==========================================
  // CURRENT LEARNING
  // ==========================================

  {
    id: "now-typescript",
    kind: "learning",
    title: "Advanced TypeScript",
    detail:
      "Improving my understanding of generics, type inference, reusable interfaces, and type-safe backend development.",
  },

  {
    id: "now-database",
    kind: "learning",
    title: "Database Optimization",
    detail:
      "Exploring PostgreSQL indexing, query execution plans, SQL optimization, and efficient relational database design.",
  },

  {
    id: "now-testing",
    kind: "learning",
    title: "Backend Testing",
    detail:
      "Practicing unit testing, integration testing, API validation, error handling, and writing reliable backend services.",
  },
];
