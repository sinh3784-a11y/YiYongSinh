import type { Project } from "../types/project"

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
        technologies: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
        scope: "Full-stack",
    },
    {
        id: 2,
        number: "02",
        title: "School Management API",
        description:
            "A REST API covering students, teachers, courses, exams and the daily operations of running a school.",
        highlights: [
            "Designed role-based access with Sanctum so staff only see the records they should.",
            "Kept exam and enrolment logic in service classes instead of controllers.",
            "Documented every endpoint so the API could be consumed without reading source.",
        ],
        technologies: ["Laravel", "PostgreSQL", "Sanctum", "Docker"],
        scope: "API",
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
    },
]

export const projectsCopy = {
    label: "SELECTED WORK",
    title: "Projects I've built",
    body: "Three things I built to learn how a system holds together — schema, API, interface and deployment — rather than one thing in isolation.",
}
