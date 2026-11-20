import type { Project } from "../types/project";

/* ------------------------------------------------------------------ *
 *  Project links
 *  Add `githubUrl` / `demoUrl` to any entry below and the buttons
 *  appear automatically. ProjectCard already handles their absence,
 *  so leaving them off is safe — the cards just render without links.
 * ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Smart Tourism Platform",
    description:
      "A full-stack platform for discovering hotels, restaurants and tours, and for managing bookings end to end.",
    highlights: [
      "Modelled the domain across hotels, restaurants, tours and bookings with enforced relations.",
      "Built the public search and detail APIs with server-side filtering and pagination.",
      "Containerised the app and its database so local setup is a single Compose command.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
    ],
    scope: "Full-stack",
    image: "/projects/tourism.jpg",
    imageAlt: "SovannDomnure Application",

    // GitHub repositories
    frontendUrl: "https://github.com/TOURISM-PROJECT-SPRING/frontend",

    backendUrl: "https://github.com/TOURISM-PROJECT-SPRING/backend",

    // Live Website / Domain
    demoUrl: "https://frontend-pso1qhcgk-yi-yongsinh-s-projects.vercel.app/",
  },

  {
    id: 2,
    number: "02",
    title: "School Management System",
    scope: "Full-stack",

    description:
      "A full-stack school management application designed to streamline student records, academic operations, and administrative workflows.",

    highlights: [
      "Implemented secure authentication and role-based access control using Laravel Sanctum.",
      "Developed RESTful APIs for students, teachers, courses, examinations, and enrollment management.",
      "Built a React dashboard for managing academic data and administrative operations.",
    ],

    technologies: ["Laravel", "PostgreSQL", "Sanctum", "Docker", "React"],

    image: "/projects/school.jpeg",
    imageAlt: "School Management System administration dashboard",

    // GitHub repositories
    frontendUrl: "https://github.com/school-management-api-2026/School-Management-Frontend",

    backendUrl: "https://github.com/school-management-api-2026/School-Management-Backend",

    // Live Website / Domain
    demoUrl: "https://school-management-frontend-five-sigma.vercel.app",
  },

  {
    id: 3,
    number: "03",
    title: "Smart Attendance",
    description:
      "Attendance tracking with QR scanning, ESP32 hardware and Telegram notifications.",
    highlights: [
      "Firmware on an ESP32 posts check-ins straight to the service, no manual entry.",
      "Attendance state is derived server-side, so duplicated scans cannot inflate a count.",
      "Telegram bot pushes a summary to staff instead of making them open a dashboard.",
    ],
    technologies: ["PHP", "MySQL", "ESP32", "Telegram Bot"],
    scope: "IoT",
    image: "/projects/smart.jpg",
    imageAlt: "Smart Attendance System dashboard",

    // GitHub repositories
    githubUrl: "https://github.com/sinh3784-a11y/project",

    // Live Website / Domain
    demoUrl: "https://project-production-70393e5b.up.railway.app/",
  },
];

export const projectsCopy = {
  label: "SELECTED WORK",
  title: "Projects I've built",
  body: "Three things I built to learn how a system holds together — schema, API, interface and deployment — rather than one thing in isolation.",
};
