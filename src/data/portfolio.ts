
import type { PortfolioData } from "@/types/portfolio";
import agriLinkPreview from "./agrilink.png";
import luxuryEstatePreview from "./luxury_estate.png";
import utuhisaniPreview from "./utuhisaniwins.jpg.png";
import kenyaInsiderPreview from "./kenya_insider.png";
import counterfeitCurrencyPreview from "./counterfeit.jpg.png";
import studykenyaPreview from "./study_kenya.jpg.png";

/**
 * PORTFOLIO CONTENT
 *
 * Single source of truth for portfolio content.
 * Replace remaining placeholders before publishing.
 * Only include verified project details, experience, and results.
 */
export const portfolio: PortfolioData = {
  accentColor: "#E8B04B",

  profile: {
    fullName: "",
    displayName: "",
    monogram: "AN",
    title: "Software Engineer",

    shortBio:
      "I build web applications with a focus on practical problem-solving, intuitive interfaces, and maintainable code.",

    longBio: [
      "I'm Arcel Ndala, a software developer interested in building useful digital products that solve real-world problems. My work includes web application development, frontend engineering, and application functionality.",

      "I focus on creating clear user experiences, writing maintainable code, and choosing technologies that fit each project's requirements. I enjoy developing projects that bring together functionality, usability, and thoughtful design.",
    ],

    location: "Nairobi, Kenya", // Confirm before publishing
    email: "arcendala@gmail.com",
    availability: "Open to selected opportunities",

    specialties: [
      "Web Development",
      "Frontend Engineering",
      "Backend Development",
      "Full-Stack Development",
      "Mobile App Development",
      "UI/UX Implementation",
    ],
  },

  social: [
    {
      label: "Email",
      href: "mailto:arcendala@gmail.com",
      icon: "mail",
    },
    {
      label: "GitHub",
      href: "https://github.com/arcendala-byte",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/arc_ndala/",
      icon: "instagram",
    },
  ],

  navigation: [
    { label: "Home", href: "#home", sectionId: "home" },
    { label: "About", href: "#about", sectionId: "about" },
    { label: "Work", href: "#work", sectionId: "work" },
    { label: "Create", href: "#create", sectionId: "create" },
    { label: "Process", href: "#process", sectionId: "process" },
    { label: "Archive", href: "#archive", sectionId: "archive" },
    { label: "Skills", href: "#expertise", sectionId: "expertise" },
    { label: "Experience", href: "#experience", sectionId: "experience" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ],

  skills: [
    {
      category: "Programming Languages",
      items: [
        "Python",
        "JavaScript",
        "TypeScript",
        "PHP",
        "Dart",
      ],
    },
    {
      category: "Frontend",
      items: [
        "HTML",
        "CSS",
        "React",
        "Next.js",
        "Tailwind CSS",
      ],
    },
    {
      category: "Mobile Development",
      items: [
        "Flutter",
        "React Native",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Laravel",
        "REST APIs",
      ],
    },
    {
      category: "Databases",
      items: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
      ],
    },
    {
      category: "Backend Services",
      items: [
        "Supabase",
        "Firebase",
      ],
    },
    {
      category: "DevOps & Deployment",
      items: [
        "Docker",
        "Git",
        "GitHub",
        "GitHub Actions",
        "Vercel",
        "Netlify",
      ],
    },
    {
      category: "UI/UX & Interaction",
      items: [
        "Responsive Web Design",
        "UI Implementation",
        "Accessibility",
      ],
    },
    {
      category: "Development Tools",
      items: [
        "VS Code",
        "Postman",
        "XAMPP",
      ],
    },
  ],

  projects: [
    {
      slug: "utuhisaniwins",
      title: "UtuhisaniWins",

      description:
        "A community-support website built with Next.js and TypeScript, focused on presenting the organization's work and providing a donation interface.",

      category: "Web",
      year: "2026", // Verify the project year

      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "PayPal Integration",
      ],

      imageSrc: utuhisaniPreview,
      imageAlt: "Screenshot of the UtuhisaniWins community-support website",

      liveUrl: "https://utuhisaniwins.com/",
      repoUrl: undefined,

      featured: true,

      caseStudy: {
        overview:
          "A web project focused on presenting a community-support organization's work and providing visitors with an accessible online experience.",

        problem:
          "The website aims to communicate the organization's mission and make information about supporting its work easier to access.",

        role:
          "Developer working on the website interface and application functionality. Update this description to reflect the exact responsibilities completed.",

        approach:
          "Developed with Next.js and TypeScript, using reusable components and a structured application layout. The project includes a donation interface and PayPal integration work.",

        decisions: [
          "Used reusable components to organize the interface and support maintainability.",
          "Developed a configurable donation interface with currency selection and a PayPal integration workflow.",
        ],

        results: undefined,
        isPlaceholder: true,
      },
    },

    {
      slug: "kenya-insider",
      title: "Kenya Insider",

      description:
        "A travel and discovery platform concept focused on helping users explore destinations and experiences in Kenya.",

      category: "Platform",
      year: "2024", // Verify the project year

      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],

      imageSrc: kenyaInsiderPreview,
      imageAlt: "Preview of the Kenya Insider travel platform",

      liveUrl: undefined,
      repoUrl: undefined,

      featured: true,

      caseStudy: {
        overview:
          "A travel and discovery project intended to present information about destinations and experiences in Kenya.",

        problem:
          "The concept focuses on making travel-related information and destination discovery more accessible.",

        role:
          "Project contributor. Replace this description with your verified responsibilities.",

        approach:
          "Document the actual technologies, application structure, and features implemented in the project.",

        decisions: [
          "Document a verified decision about navigation or destination discovery.",
          "Describe an implemented technical decision and its reasoning.",
        ],

        results: undefined,
        isPlaceholder: true,
      },
    },

    {
      slug: "counterfeit-currency-detection",
      title: "Counterfeit Currency Detection System",

      description:
        "A software project exploring image analysis and machine learning for identifying potentially counterfeit currency.",

      category: "AI / ML",
      year: "2023", // Verify the project year

      technologies: [
        "Python",
        "Machine Learning",
        "Computer Vision",
      ],

      imageSrc: counterfeitCurrencyPreview,
      imageAlt: "Preview of the counterfeit currency detection system",

      liveUrl: undefined,
      repoUrl: undefined,

      featured: true,

      caseStudy: {
        overview:
          "A project exploring how image analysis and machine learning could be applied to currency classification.",

        problem:
          "The project concerns distinguishing genuine currency from potentially counterfeit notes using image-based information.",

        role:
          "Replace this text with your verified contribution to data preparation, programming, model development, or evaluation.",

        approach:
          "Document the actual dataset, image-processing techniques, model, implementation, and evaluation methods used.",

        decisions: [
          "Describe the model or image-processing method actually implemented.",
          "Document the evaluation process and any known limitations.",
        ],

        results: undefined,
        isPlaceholder: true,
      },
    },

    {
      slug: "agrilink-mobile-app",
      title: "AgriLink Mobile App",

      description:
        "An agriculture-focused mobile app interface for AgriLink.",

      category: "Mobile",

      technologies: [],

      imageSrc: agriLinkPreview,
      imageAlt:
        "AgriLink mobile app dashboard with farming and product sections",

      liveUrl: "https://agrilink-116df.web.app/",

      featured: true,

      caseStudy: {
        overview: "A mobile application project named AgriLink.",

        problem:
          "The project is focused on an agriculture-related mobile experience.",

        role: "Project contributor.",

        approach:
          "A live project link is available for exploring the current experience.",

        decisions: [],
        isPlaceholder: true,
      },
    },

    {
      slug: "study-kenya-hub",
      title: "Study Kenya Hub",

      description:
        "An education-focused platform concept designed to help users explore study opportunities and access useful educational information in Kenya.",

      category: "Platform",

      technologies: [],

      imageSrc: studykenyaPreview,
      imageAlt: "Study Kenya Hub project preview",

      liveUrl: "https://study-kenya-platform.vercel.app/",
      repoUrl: undefined,

      featured: true,

      caseStudy: {
        overview:
          "Study Kenya Hub is an education-focused project intended to make study-related information and opportunities easier to discover.",

        problem:
          "Finding relevant educational information and study opportunities can be challenging when resources are scattered across different sources.",

        role:
          "Project contributor. Update this description to reflect your verified responsibilities.",

        approach:
          "Document the actual features, technologies, and implementation used in Study Kenya Hub.",

        decisions: [],
        isPlaceholder: true,
      },
    },

    {
      slug: "luxury-estate-website",
      title: "Luxury Estate Website",

      description:
        "A website project focused on presenting luxury real estate online.",

      category: "Web",

      technologies: [],

      imageSrc: luxuryEstatePreview,
      imageAlt: "Luxury Estate website featuring a modern residence",

      liveUrl: "https://luxury-estate-three.vercel.app/",

      featured: true,

      caseStudy: {
        overview: "A luxury estate website project.",

        problem:
          "The project focuses on a web experience for luxury real estate.",

        role: "Project contributor.",

        approach:
          "A live website is available for exploring the current experience.",

        decisions: [],
        isPlaceholder: true,
      },
    },
  ],

 

 
experience: [
  {
    period: "2026 – Present",
    organization: "Independent Projects",
    role: "Web Developer / Software Engineer",
    description:
      "Build responsive web applications and digital experiences, combining frontend development, backend integration, and practical problem-solving. My work includes developing UtuhisaniWins, a nonprofit website supporting education, healthcare, and community initiatives in Kenya.",
    achievements: [
      "Developed responsive interfaces using Next.js, React, TypeScript, and Tailwind CSS.",
      "Implemented a PayPal donation workflow with server-side order creation, payment capture, validation, and support for USD, EUR, and CHF.",
      "Built and refined reusable UI components, navigation, animated sections, project galleries, and mobile-friendly layouts.",
      "Worked across a portfolio of web projects, including UtuhisaniWins, Study Kenya Hub, AgriLink, and a luxury estate website.",
      "Used Git and GitHub for version control, and worked with environment variables, API routes, and deployment workflows."
    ]
  }
],
  education: [
    {
      period: "Year — Year",
      institution: "Your Institution Name",
      qualification: "Your Actual Degree or Qualification",
      description:
        "Add your actual field of study and relevant academic projects.",
    },
  ],
};

