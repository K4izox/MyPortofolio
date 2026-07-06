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
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
  details: string;
  color: "blue" | "green";
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeType: "bronze" | "silver" | "gold" | "diamond";
  color: "blue" | "red" | "yellow" | "green";
  imageUrl?: string;
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
  }
];

export const EXPERIENCE_TIMELINE: Experience[] = [
  {
    level: 3,
    role: "UI/UX Designer",
    organization: "GasGawe Indonesia",
    period: "2025 – 2026",
    color: "blue",
    description: [
      "Merancang antarmuka pengguna (UI) yang intuitif dan alur pengguna (UX) yang mulus untuk platform karir.",
      "Melakukan riset pengguna mendalam, pembuatan user persona, dan usability testing.",
      "Membuat wireframe high-fidelity, interactive prototype, dan berkolaborasi erat dengan tim developer untuk implementasi desain."
    ]
  },
  {
    level: 2,
    role: "Member",
    organization: "President University Developers Club",
    period: "2024 – Present",
    color: "yellow",
    description: [
      "Aktif berpartisipasi dalam pengembangan software internal kampus dan open-source.",
      "Mengikuti bootcamp internal tentang modern web development, API, dan version control (Git).",
      "Berkolaborasi dalam hackathon dan proyek teknologi berskala komunitas."
    ]
  },
  {
    level: 1,
    role: "Member",
    organization: "President University Robotics & Technology Club",
    period: "2024 – Present",
    color: "red",
    description: [
      "Mempelajari pemrograman embedded system (Arduino, Raspberry Pi) dan sirkuit listrik.",
      "Berkontribusi dalam riset purwarupa robotika pintar berbasis mikrokontroler.",
      "Mengeksplorasi integrasi sensor keamanan IoT dan cloud storage."
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "President University",
    degree: "Bachelor of Computer Science - Informatics (Cybersecurity)",
    period: "2024 – Present",
    score: "GPA: 3.79 / 4.00",
    details: "Mempelajari fundamental ilmu komputer, struktur data, pemrograman berorientasi objek, keamanan jaringan, kriptografi, forensik digital, etika peretasan, dan keamanan cloud AWS.",
    color: "blue"
  },
  {
    institution: "Madrasah Aliyah Negeri 1 Pontianak",
    degree: "Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA)",
    period: "2021 – 2024",
    score: "Nilai Rata-rata: 89.9 / 100",
    details: "Aktif dalam olimpiade sains/TIK sekolah, mendalami dasar matematika komputer, pemrograman dasar, dan fisika kelistrikan.",
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
    color: "red"
  },
  {
    id: "cert-02",
    title: "Implementasi Keamanan Siber bagi BUMN di AWS",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "diamond",
    color: "blue"
  },
  {
    id: "cert-03",
    title: "AWS Security Fundamentals",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "gold",
    color: "blue"
  },
  {
    id: "cert-04",
    title: "Introduction to Generative AI",
    issuer: "AWS (Amazon Web Services)",
    year: "2025",
    badgeType: "silver",
    color: "yellow"
  },
  {
    id: "cert-05",
    title: "Basic Cybersecurity",
    issuer: "CODEPOLITAN",
    year: "2026",
    badgeType: "gold",
    color: "green"
  },
  {
    id: "cert-06",
    title: "AI Productivity & API Integration for Developers",
    issuer: "Hacktiv8",
    year: "2026",
    badgeType: "gold",
    color: "yellow"
  },
  {
    id: "cert-07",
    title: "Introduction to Large Language Models",
    issuer: "IBM",
    year: "2026",
    badgeType: "silver",
    color: "red"
  },
  {
    id: "cert-08",
    title: "Intelligent by Design: Build an AI Agent",
    issuer: "IBM",
    year: "2026",
    badgeType: "diamond",
    color: "red"
  },
  {
    id: "cert-09",
    title: "AI Fundamentals",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "green"
  },
  {
    id: "cert-10",
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue"
  },
  {
    id: "cert-11",
    title: "AI for Research and Insights",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue"
  },
  {
    id: "cert-12",
    title: "AI for Writing and Communicating",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue"
  },
  {
    id: "cert-13",
    title: "AI for Content Creation",
    issuer: "Google",
    year: "2026",
    badgeType: "silver",
    color: "blue"
  },
  {
    id: "cert-14",
    title: "AI for Data Analysis",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "blue"
  },
  {
    id: "cert-15",
    title: "AI for App Building",
    issuer: "Google",
    year: "2026",
    badgeType: "gold",
    color: "blue"
  },
  {
    id: "cert-16",
    title: "Google AI",
    issuer: "Google",
    year: "2026",
    badgeType: "diamond",
    color: "blue"
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
    description: "Platform pendakian ekologis berbasis AI dengan fitur Scanner Bawaan Zero-Waste, Live Weather, dan Community Trail Reports.",
    imageColor: "green",
    techStack: ["React", "Gemini API", "Tailwind", "Google AI Studio"],
    demoUrl: "https://lnkd.in/gb7wYuqw",
    githubUrl: "#"
  }
];
