export interface CVContact {
  name: string;
  email: string;
  linkedin: string;
  website: string;
  location: string;
  role: string;
}

export interface CVExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  techStack: {
    backend: string[];
    frontend: string[];
    databases: string[];
    devops: string[];
    cloud: string[];
  };
}

export interface CVEducation {
  institution: string;
  degree: string;
  period: string;
}

export interface CVData {
  contact: CVContact;
  skills: string[];
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
}

export const cvData: CVData = {
  contact: {
    name: "Soare Robert Daniel",
    email: "soarerobert17@gmail.com",
    linkedin: "linkedin.com/in/soare-robertdaniel-949974151",
    website: "robertsoare.xyz",
    location: "Romania",
    role: "Software Developer"
  },
  skills: ["MySQL", "Amazon Web Services (AWS)", "User Experience (UX)"],
  summary: "Software developer with over 5 years of professional experience in web development.",
  experience: [
    {
      company: "Themeisle",
      role: "Software Developer",
      period: "July 2020 - Present (5 years 10 months)",
      location: "Romania",
      responsibilities: [
        "Developing and maintaining WordPress plugins and themes used by almost 1 million users",
        "Building internal tools to increase automation and improve team productivity",
        "Developing strategic plans aligned with company goals and growth initiatives",
        "Implementing responsive UI designs and user-friendly interfaces",
        "Collaborating with cross-functional teams to deliver product features",
        "Mentoring and onboarding new team members",
        "Participating in technical interviews and recruiting processes",
        "Writing clean, maintainable, and well-documented code",
        "Participating in code reviews and knowledge sharing",
        "Building serverless services",
        "Building agentic workflow for faster development speed"
      ],
      techStack: {
        backend: ["PHP", "Node.js", "Bun", "WordPress core"],
        frontend: ["JavaScript/Typescript (React, jQuery)", "HTML5", "CSS3", "SASS/SCSS/Tailwind"],
        databases: ["MySQL"],
        devops: ["Docker", "Git", "GitHub Actions"],
        cloud: ["Amazon Web Services (AWS)"]
      }
    }
  ],
  education: [
    {
      institution: "University POLITEHNICA of Bucharest",
      degree: "Master's degree, Computer Graphics",
      period: "October 2021 - July 2023"
    },
    {
      institution: "Facultatea de Științe Aplicate, Universitatea Politehnica din Bucuresti",
      degree: "Engineer's degree, Engineering",
      period: "2017 - 2021"
    }
  ]
};
