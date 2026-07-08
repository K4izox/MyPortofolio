export interface Skill {
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  icon: string; // lucide icon name
  googleColor: "blue" | "red" | "yellow" | "green";
  description: string;
}

export interface Experience {
  level: number;
  role: string;
  organization: string;
  period: string;
  description: string[];
  color: "blue" | "red" | "yellow" | "green";
  certificateId?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
  details: string;
  color: "blue" | "green";
  certificateIds?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeType: "bronze" | "silver" | "gold" | "diamond";
  color: "blue" | "red" | "yellow" | "green";
  imageUrl?: string;
  pdfUrl?: string;
  description?: string;
}

export const OWNER_DATA = {
  name: "Reza Fahlevi",
  title: "UI/UX Designer & Full-Stack Developer",
  tagline: "Informatics Student (Cybersecurity) @ President University | GPA 3.79/4.00",
  summary: "I am a versatile tech enthusiast with a strong academic background in Informatics. I have a strong interest in UI/UX Design, Full-Stack Development, and Cybersecurity, and I am passionate about building digital solutions that combine intuitive user experience with secure and scalable system architecture.",
  contacts: {
    email: "reza06117@gmail.com",
    phone: "+6283152805570",
    instagram: "rezafahlevitzy",
    instagramUrl: "https://instagram.com/rezafahlevitzy",
    linkedin: "Reza Fahlevi",
    linkedinUrl: "https://www.linkedin.com/in/reza-fahlevi-157623313",
    github: "K4izox",
    githubUrl: "https://github.com/K4izox"
  }
};

export const SKILLS_INVENTORY: Skill[] = [
  {
    name: "Full-Stack Development",
    rarity: "Legendary",
    icon: "Code",
    googleColor: "blue",
    description: "Membangun aplikasi web interaktif, responsif, dan scalable dari backend hingga frontend."
  },
  {
    name: "Generative AI",
    rarity: "Epic",
    icon: "Sparkles",
    googleColor: "yellow",
    description: "Integrasi API AI, optimasi prompt, rekayasa agen cerdas, dan pemanfaatan LLM."
  },
  {
    name: "Ethical Hacking",
    rarity: "Rare",
    icon: "Terminal",
    googleColor: "red",
    description: "Penetration testing, analisis kerentanan sistem, dan eksploitasi etis untuk pengamanan aset digital."
  },
  {
    name: "Digital Forensic",
    rarity: "Rare",
    icon: "ShieldAlert",
    googleColor: "blue",
    description: "Investigasi serangan siber, pelacakan jejak digital, serta analisis malware dasar."
  },
  {
    name: "User Interface (UI)",
    rarity: "Epic",
    icon: "Palette",
    googleColor: "green",
    description: "Merancang antarmuka digital yang memukau, modern, konsisten, dan berstandar industri."
  },
  {
    name: "User Experience (UX)",
    rarity: "Epic",
    icon: "Compass",
    googleColor: "yellow",
    description: "Riset pengguna, wireframing, pemetaan journey, prototyping, dan pengujian kegunaan produk."
  },
  {
    name: "Teamwork",
    rarity: "Common",
    icon: "Users",
    googleColor: "green",
    description: "Kolaborasi aktif, manajemen proyek, empati tim, dan komunikasi efektif dalam lingkungan agile."
  },
  {
    name: "PHP & Laravel",
    rarity: "Epic",
    icon: "Code",
    googleColor: "blue",
    description: "Membangun sistem backend robust menggunakan PHP, framework Laravel, serta ekosistem server XAMPP."
  },
  {
    name: "JavaScript / TS",
    rarity: "Epic",
    icon: "Code",
    googleColor: "yellow",
    description: "Pengembangan web interaktif dan dinamis menggunakan modern framework JavaScript/TypeScript (React, Next.js)."
  },
  {
    name: "Golang (Go)",
    rarity: "Rare",
    icon: "Terminal",
    googleColor: "blue",
    description: "Pemrograman backend berkinerja tinggi, concurrent, dan scalable menggunakan bahasa Go."
  },
  {
    name: "Python",
    rarity: "Epic",
    icon: "Terminal",
    googleColor: "green",
    description: "Scripting, otomasi, analisis data, dan integrasi Artificial Intelligence / Machine Learning menggunakan Python."
  },
  {
    name: "PostgreSQL & DB",
    rarity: "Epic",
    icon: "Database",
    googleColor: "red",
    description: "Manajemen basis data relasional, desain skema, dan optimasi query menggunakan PostgreSQL dan MySQL."
  }
];

export const EXPERIENCE_TIMELINE: Experience[] = [
  {
    level: 3,
    role: "User Interface/User Experience Designer",
    organization: "GasGawe Indonesia",
    period: "May 2025 – May 2026",
    color: "blue",
    description: [
      "Spearheaded UI/UX design initiatives during a 1-year internship at GasGawe Indonesia.",
      "Focused on creating user-friendly interfaces by developing comprehensive wireframes, user flows, and interactive prototypes.",
      "Worked closely with cross-functional teams, including developers and product managers, to bridge the gap between design and technical implementation, ultimately delivering seamless and visually appealing digital experiences."
    ]
  },
  {
    level: 2,
    role: "Member",
    organization: "President University Developers Club",
    period: "Dec 2024 – Present",
    color: "yellow",
    certificateId: "cert-pudc",
    description: [
      "Participating in campus-based developer communities to expand knowledge in software engineering, web development, and algorithmic design.",
      "Collaborating with peers to share programming insights and attending technical events to strengthen foundational coding skills."
    ]
  },
  {
    level: 1,
    role: "Member",
    organization: "President University Robotics and Technology Club",
    period: "Nov 2024 – Present",
    color: "red",
    certificateId: "cert-purtc",
    description: [
      "Engaging with a student community focused on developing skills and knowledge in robotics and technology.",
      "Collaborating with peers to innovate and apply technical knowledge to real-world projects.",
      "Actively participating in workshops, seminars, and training sessions covering diverse topics, from robot programming to artificial intelligence, to build readiness as an innovator in the ever-evolving tech industry."
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "President University",
    degree: "Bachelor of Computer Science, Information Technology / Informatics",
    period: "Aug 2024 – 2028",
    score: "Grade: 3.79 / 4.00",
    details: "Undergraduate student in Information Technology with a strong focus on Cybersecurity, Cloud Infrastructure, and Software Development. Actively engaged in campus technology communities to bridge the gap between theoretical computer science, software programming, and practical hardware integration. Passionate about continuously learning and applying tech innovations to solve real-world problems. (Activities: PURTC, PUDC, Comptech Enthusiast)",
    color: "blue",
    certificateIds: ["cert-presuniv-1", "cert-presuniv-2", "cert-presuniv-3"]
  },
  {
    institution: "Madrasah Aliyah Negeri 1 Pontianak",
    degree: "High School Diploma, Natural Sciences and Mathematics (MIPA)",
    period: "Jul 2021 – May 2024",
    score: "Grade: 89.9 / 100",
    details: "Focused on Natural Sciences and Mathematics (MIPA). Engaged in the Water Rocket extracurricular program, which provided practical experience in applied science, structural design, and collaborative problem-solving.",
    color: "green"
  }
];

export const CERTIFICATES_LIST: Certificate[] = [
  {
    id: "cert-01",
    title: "Cybersecurity Literacy Training",
    issuer: "BSSN (Badan Siber dan Sandi Negara)",
    year: "2025",
    badgeType: "diamond",
    color: "red",
    imageUrl: "/images/certificates/Cybersecurity Literacy Training.jpeg"
  },
  {
    id: "cert-02",
    title: "Implementasi Keamanan Siber bagi BUMN di AWS",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "diamond",
    color: "blue",
    imageUrl: "/images/certificates/Implementasi Keamanan Siber bagi BUMN di AWS (Bahasa Indonesia).jpeg"
  },
  {
    id: "cert-03",
    title: "AWS Security Fundamentals",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "gold",
    color: "blue",
    imageUrl: "/images/certificates/AWS Security Fundamentals Second Edition (Bahasa Indonesia).jpeg"
  },
  {
    id: "cert-04",
    title: "Introduction to Generative AI",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "silver",
    color: "yellow",
    imageUrl: "/images/certificates/Introduction to Generative AI - Art of the Possible (Bahasa Indonesia).jpeg"
  },
  {
    id: "cert-05",
    title: "Basic Cybersecurity",
    issuer: "CODEPOLITAN",
    year: "2026",
    badgeType: "gold",
    color: "green",
    imageUrl: "/images/certificates/Basic CyberSecurity.jpeg"
  },
  {
    id: "cert-06",
    title: "AI Productivity & API Integration for Developers",
    issuer: "Hacktiv8",
    year: "2026",
    badgeType: "gold",
    color: "yellow",
    imageUrl: "/images/certificates/AI Productivity and AI API Integration for Developers.jpeg"
  },
  {
    id: "cert-07",
    title: "Introduction to Large Language Models",
    issuer: "IBM",
    year: "2026",
    badgeType: "silver",
    color: "red",
    imageUrl: "/images/certificates/Introduction to Large Language Models.jpeg"
  },
  {
    id: "cert-08",
    title: "Intelligent by Design: Build an AI Agent",
    issuer: "IBM",
    year: "2026",
    badgeType: "diamond",
    color: "red",
    imageUrl: "/images/certificates/Build an AI Agent.jpeg"
  },
  {
    id: "cert-09",
    title: "AI Fundamentals",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "green",
    pdfUrl: "/images/certificates/Coursera AI Fundamentals.pdf"
  },
  {
    id: "cert-10",
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for Brainstorming and Planning.pdf"
  },
  {
    id: "cert-11",
    title: "AI for Research and Insights",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for Research and Insights.pdf"
  },
  {
    id: "cert-12",
    title: "AI for Writing and Communicating",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for Writing and Communicating.pdf"
  },
  {
    id: "cert-13",
    title: "AI for Content Creation",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for Content Creation.pdf"
  },
  {
    id: "cert-14",
    title: "AI for Data Analysis",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for Data Analysis.pdf"
  },
  {
    id: "cert-15",
    title: "AI for App Building",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera AI for App Building.pdf"
  },
  {
    id: "cert-16",
    title: "Google AI",
    issuer: "Google",
    year: "2026",
    badgeType: "diamond",
    color: "blue",
    pdfUrl: "/images/certificates/Coursera Google AI.pdf"
  },
  {
    id: "cert-pudc",
    title: "Certificate of Participation - Hello World! Event",
    issuer: "President University Developers Club",
    year: "2024",
    badgeType: "silver",
    color: "yellow",
    description: "Official certificate awarded for participating in the 'Hello, World!' event organized by the President University Developer Club.",
    imageUrl: "/images/certificates/Certificate of Participation - Hello World! Event.jpeg"
  },
  {
    id: "cert-purtc",
    title: "PURTC First Big Meeting",
    issuer: "President University Robotics and Technology Club",
    year: "2024",
    badgeType: "silver",
    color: "red",
    description: "Collaborating with the next generation of innovators at President University to explore and master the latest technologies in robotics and AI.",
    imageUrl: "/images/certificates/PURTC First Big Meeting.jpeg"
  },
  {
    id: "cert-presuniv-1",
    title: "The Art & Algorithms of Design",
    issuer: "President University",
    year: "2024",
    badgeType: "gold",
    color: "blue",
    imageUrl: "/images/certificates/The Art & Algorithms of Design.jpeg"
  },
  {
    id: "cert-presuniv-2",
    title: "Opportura Education & Career Seminar",
    issuer: "President University",
    year: "2024",
    badgeType: "silver",
    color: "blue",
    imageUrl: "/images/certificates/Opportura Education & Career Seminar.jpeg"
  },
  {
    id: "cert-presuniv-3",
    title: "Bilateral Relations Between Indonesia and Ukraine",
    issuer: "President University",
    year: "2024",
    badgeType: "silver",
    color: "blue",
    imageUrl: "/images/certificates/Bilateral Relations Between Indonesia and Ukraine.jpeg"
  },
  {
    id: "cert-coming-soon",
    title: "??? (CLASSIFIED DATA)",
    issuer: "UNKNOWN",
    year: "202X",
    badgeType: "bronze",
    color: "red",
    description: "New achievement is currently being processed. Stay tuned for the next level up!"
  }
];

export interface Project {
  id: string;
  title: string;
  description: string;
  imageColor: "blue" | "red" | "yellow" | "green";
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export const PROJECTS_LIST: Project[] = [
  {
    id: "proj-1",
    title: "Demeter (Eco-Hiking AI)",
    description: "AI-based ecological hiking platform featuring an integrated Zero-Waste Scanner, Live Weather updates, and Community Trail Reports.",
    imageColor: "green",
    techStack: ["React", "Gemini API", "Tailwind", "Google AI Studio"],
    demoUrl: "https://demeter-cinematic-hero-533806768391.asia-southeast1.run.app/",
    githubUrl: "#",
    imageUrl: "/images/projects/Demeter.png"
  },
  {
    id: "proj-2",
    title: "Grawizah (AI Trade Intelligence)",
    description: "AI-native Trade Intelligence Platform for Indonesian SMEs. Features neural matchmaking, automated HS-coding, and real-time supply chain mapping.",
    imageColor: "blue",
    techStack: ["Next.js", "Go", "AI Assistant"],
    demoUrl: "https://grawizah-com.vercel.app/",
    githubUrl: "https://github.com/wi5nuu/grawizah.com",
    imageUrl: "/images/projects/Grawizah.png"
  },
  {
    id: "proj-3",
    title: "Nova AI (Intelligent Chat Assistant)",
    description: "Intelligent AI chatbot assistant built using a Flask backend and direct integration with the Gemini API.",
    imageColor: "red",
    techStack: ["Python", "Flask", "Gemini API"],
    demoUrl: "https://novaai-indol.vercel.app/",
    githubUrl: "https://github.com/K4izox/HACKTIV8-Project"
  },
  {
    id: "proj-4",
    title: "Pixel Portfolio (Reza.exe)",
    description: "The 8-bit retro-style interactive portfolio you are viewing right now! Equipped with Arcade Mini Games, a hidden Hacker Terminal, and a Guestbook.",
    imageColor: "yellow",
    techStack: ["Laravel", "React", "Inertia", "Tailwind CSS"],
    demoUrl: "https://my-portofolio-tau-nine.vercel.app",
    githubUrl: "https://github.com/K4izox/MyPortofolio",
    imageUrl: "/images/projects/portofolio.png"
  },
  {
    id: "proj-coming-soon",
    title: "CLASSIFIED PROJECT",
    description: ">>> LOADING NEXT BIG THING... \nProyek rahasia sedang dalam tahap pengembangan (Under Construction). Bersiaplah untuk inovasi berikutnya!",
    imageColor: "red",
    techStack: ["???", "Top Secret", "In Development"]
  }
];
