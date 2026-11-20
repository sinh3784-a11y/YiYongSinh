import type { ExperienceEntry } from "../types/experience";

/**
 * My Development Journey
 *
 * Education, technical training, internship,
 * and hands-on software development experience.
 *
 * Update periods with verified dates when available.
 */

export const experience: ExperienceEntry[] = [
  // ==========================================
  // FULL-STACK PROJECT DEVELOPMENT
  // ==========================================
  {
    id: 1,
    period: "Ongoing",
    title: "Full-Stack Project Development",
    organisation: "Personal Projects",

    description:
      "Designing and building web applications with a strong focus on backend architecture, RESTful APIs, authentication, and database integration.",

    achievements: [
      "Developing backend applications using Java, Spring Boot, PHP, Laravel, Node.js, and Express.js.",
      "Implementing authentication, role-based access control, request validation, and business logic.",
      "Building responsive frontend interfaces with React and TypeScript.",
      "Using PostgreSQL, MySQL, Redis, and Docker in practical development projects.",
    ],

    technologies: [
      "Java",
      "Spring Boot",
      "Laravel",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
    ],
  },

  // ==========================================
  // FRONTEND DEVELOPMENT INTERNSHIP
  // ==========================================
  {
    id: 2,
    period: "Completed",
    title: "Frontend Development Internship",
    organisation: "ETEC",

    description:
      "Gained practical experience in frontend development by applying programming knowledge to web interfaces and development tasks.",

    achievements: [
      "Practiced building responsive and user-friendly web interfaces.",
      "Applied HTML, CSS, and JavaScript in frontend development tasks.",
      "Strengthened problem-solving, debugging, and practical coding skills.",
    ],

    technologies: ["HTML", "CSS", "JavaScript"],
  },

  // ==========================================
  // BACKEND DEVELOPMENT TRAINING
  // ==========================================
  {
    id: 3,
    period: "Completed",
    title: "Backend Development Training",
    organisation: "ETEC",

    description:
      "Completed technical training in Java, Spring Boot, PHP, and Laravel, developing a foundation in server-side programming and backend application development.",

    achievements: [
      "Studied object-oriented programming and backend development principles using Java and PHP.",
      "Practiced building RESTful APIs with Spring Boot and Laravel.",
      "Learned database integration, CRUD operations, and MVC architecture.",
      "Developed an understanding of authentication, validation, and application structure.",
    ],

    technologies: [
      "Java",
      "Spring Boot",
      "PHP",
      "Laravel",
      "MySQL",
      "PostgreSQL",
    ],
  },

  // ==========================================
  // UNIVERSITY EDUCATION
  // ==========================================
  {
    id: 4,
    period: "Present · Third Year",
    title: "Computer Science Education",
    organisation: "Royal University of Phnom Penh (RUPP)",

    description:
      "Currently a third-year Computer Science student, building academic knowledge in programming, computer systems, software development, and problem-solving.",

    achievements: [
      "Developing programming and analytical problem-solving skills.",
      "Studying computer science concepts and software development fundamentals.",
      "Applying technical knowledge through practical assignments and personal projects.",
    ],

    technologies: ["Programming", "Data Structures", "Algorithms", "Databases"],
  },
];

/**
 * Journey section heading and introduction.
 */
export const experienceCopy = {
  label: "MY JOURNEY",

  title: "My Development Journey",

  body: "From academic learning to hands-on development, my journey reflects continuous growth through technical training, practical experience, and real-world software projects.",
};
