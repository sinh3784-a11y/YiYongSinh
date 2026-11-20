
import type {
  Skill,
  SkillCategory,
  SkillGroup,
} from "../types/skill";

/**
 * Technical Skills — Portfolio
 *
 * Focus: Backend & Full-Stack Development
 *
 * Levels are self-assessed proficiency scores.
 * They are not official certifications.
 *
 * Each skill has a unique ID.
 */

export const skills: Skill[] = [

  // ==========================================
  // BACKEND DEVELOPMENT
  // ==========================================

  {
    id: 1,
    name: "Java",
    category: "Backend",
    detail:
      "Object-oriented programming, collections, exception handling, and core Java development.",
    level: 92,
  },

  {
    id: 2,
    name: "Spring Boot",
    category: "Backend",
    detail:
      "Spring MVC, dependency injection, Spring Security, Spring Data JPA, and application configuration.",
    level: 88,
  },

  {
    id: 3,
    name: "Laravel",
    category: "Backend",
    detail:
      "MVC architecture, Eloquent ORM, database migrations, Laravel Sanctum, and authorization policies.",
    level: 82,
  },

  {
    id: 4,
    name: "PHP",
    category: "Backend",
    detail:
      "PHP fundamentals, object-oriented programming, server-side scripting, and request processing.",
    level: 80,
  },

  {
    id: 5,
    name: "REST API Design",
    category: "Backend",
    detail:
      "REST principles, HTTP methods, status codes, resource naming, pagination, and consistent API responses.",
    level: 90,
  },

  {
    id: 6,
    name: "Node.js",
    category: "Backend",
    detail:
      "JavaScript runtime, event loop, asynchronous I/O, package management, and server-side development.",
    level: 65,
  },

  {
    id: 7,
    name: "Express.js",
    category: "Backend",
    detail:
      "Routing, middleware, controllers, service layers, request validation, and centralized error handling.",
    level: 70,
  },

  {
    id: 8,
    name: "C#",
    category: "Backend",
    detail:
      "C# syntax, object-oriented programming, Windows Forms, and introductory .NET development.",
    level: 55,
  },

  {
    id: 9,
    name: "C / C++",
    category: "Backend",
    detail:
      "Programming fundamentals, pointers, memory management, data structures, and algorithms.",
    level: 58,
  },


  // ==========================================
  // FRONTEND DEVELOPMENT
  // ==========================================

  {
    id: 10,
    name: "React",
    category: "Frontend",
    detail:
      "Component-based architecture, React Hooks, state management, conditional rendering, and API integration.",
    level: 90,
  },

  {
    id: 11,
    name: "TypeScript",
    category: "Frontend",
    detail:
      "Static typing, interfaces, type aliases, generics, utility types, and type-safe application development.",
    level: 78,
  },

  {
    id: 12,
    name: "JavaScript",
    category: "Frontend",
    detail:
      "ES6+ features, DOM manipulation, event handling, promises, async/await, and Fetch API.",
    level: 85,
  },

  {
    id: 13,
    name: "CSS",
    category: "Frontend",
    detail:
      "Custom styling, Flexbox, CSS Grid, media queries, transitions, keyframe animations, and responsive layouts.",
    level: 75,
  },

  {
    id: 14,
    name: "Tailwind CSS",
    category: "Frontend",
    detail:
      "Utility-first CSS, responsive variants, design tokens, theme customization, and reusable styling patterns.",
    level: 85,
  },

  {
    id: 15,
    name: "Bootstrap",
    category: "Frontend",
    detail:
      "Bootstrap grid system, predefined UI components, navigation bars, forms, and responsive utilities.",
    level: 45,
  },

  {
    id: 16,
    name: "jQuery",
    category: "Frontend",
    detail:
      "DOM traversal, element selection, event handling, AJAX requests, and interactive page behavior.",
    level: 40,
  },


  // ==========================================
  // DATABASE & CACHING
  // ==========================================

  {
    id: 17,
    name: "PostgreSQL",
    category: "Database",
    detail:
      "Relational schema design, SQL joins, constraints, indexing, transactions, and database migrations.",
    level: 82,
  },

  {
    id: 18,
    name: "MySQL",
    category: "Database",
    detail:
      "Relational database management, CRUD queries, table relationships, normalization, and SQL operations.",
    level: 80,
  },

  {
    id: 19,
    name: "Redis",
    category: "Database",
    detail:
      "In-memory key-value storage, application caching, TTL expiration, and cache invalidation.",
    level: 65,
  },


  // ==========================================
  // DEVOPS & VERSION CONTROL
  // ==========================================

  {
    id: 20,
    name: "Docker",
    category: "DevOps",
    detail:
      "Containerization, Dockerfiles, Docker Compose, image management, volumes, and container networking.",
    level: 72,
  },

  {
    id: 21,
    name: "Git",
    category: "DevOps",
    detail:
      "Version control, branching strategies, commits, merging, rebasing, and resolving merge conflicts.",
    level: 85,
  },

  {
    id: 22,
    name: "Linux",
    category: "DevOps",
    detail:
      "Ubuntu development, shell commands, package management, file permissions, and process management.",
    level: 70,
  },


  // ==========================================
  // DEVELOPMENT TOOLS
  // ==========================================

  {
    id: 23,
    name: "Postman",
    category: "Tools",
    detail:
      "HTTP request testing, API collections, environment variables, authentication testing, and endpoint debugging.",
    level: 88,
  },

  {
    id: 24,
    name: "Figma",
    category: "Tools",
    detail:
      "Inspecting UI designs, reviewing layouts, extracting design specifications, and preparing frontend implementation.",
    level: 60,
  },

  {
    id: 25,
    name: "JetBrains IDEs",
    category: "Tools",
    detail:
      "IntelliJ IDEA and PhpStorm for code navigation, debugging, refactoring, and development workflows.",
    level: 90,
  },

];



/**
 * Display order for the category panels. Anything not listed here is
 * appended afterwards, so adding a category to `skills` is safe.
 */
export const categoryOrder: SkillCategory[] = [
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Tools",
]

const CATEGORY_BLURBS: Record<SkillCategory, string> = {
    Backend: "Where most of my time goes — modelling the domain, then exposing it over HTTP.",
    Frontend: "Enough frontend to build my own interfaces instead of waiting on a handoff.",
    Database: "Schemas I would be happy for someone else to maintain.",
    DevOps: "If it cannot run in a container, I do not trust it.",
    Tools: "The daily drivers.",
}

export const skillGroups: SkillGroup[] = [
    ...categoryOrder.map((category) => ({
        category,
        skills: skills.filter((skill) => skill.category === category),
    })),
    // Anything filed under a category missing from `categoryOrder`.
    ...Array.from(
        new Set(
            skills
                .map((skill) => skill.category)
                .filter((category) => !categoryOrder.includes(category)),
        ),
    ).map((category) => ({
        category,
        skills: skills.filter((skill) => skill.category === category),
    })),
].filter((group) => group.skills.length > 0)

export function skillGroupBlurb(category: SkillCategory): string {
    return CATEGORY_BLURBS[category] ?? ""
}

export const skillsCopy = {
    label: "MY STACK",
    title: "Technology I work with",
    body: "The tools I reach for, and what I actually use them for. No decorative logos — every entry below is on a real project or in active study.",
}
