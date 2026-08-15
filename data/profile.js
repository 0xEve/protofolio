

export const profile = {
  name: "Abdelrhman Islam",
  initials: "AI",
  firstName: "Abdelrhman",
  lastName: "Islam",
  role: "Cybersecurity & Penetration Testing",
  tagline:
    "Computer Science student who hunts vulnerabilities in web apps and trains machine learning models — security mindset, engineering discipline.",
  about:
    "I'm a second-year Computer Science student at Benha National University, focused on cybersecurity and web application penetration testing, with hands-on experience in machine learning. Linux is my daily driver, Burp Suite is my workspace, and I've built and shipped EVHunter — an AI-augmented bug-hunting framework. Right now I'm going deeper into deep learning with PyTorch, and looking for internships where I can apply and grow these skills.",
  location: "Benha, Egypt",
  timezone: "Africa/Cairo",
  email: "abdelrhman.ev@gmail.com",
  phone: "+20 114 349 4160",
  availability: "Open to internships & opportunities",
  resumeUrl: "/resume.pdf",

  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/Abdelrhman333" },
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/abdelrhman-lslam" },
    { label: "Email", icon: "mail", url: "mailto:abdelrhman.ev@gmail.com" },
  ],

  stats: [
    { value: 94, suffix: "%", label: "ML model accuracy" }, // TODO: update once you retrain on your real spam.csv
    { value: 4, suffix: "", label: "Certifications earned and training" },
    { value: 2, suffix: "", label: "Projects built & shipped" },
  ],

  languages: ["Arabic — Native", "English — Professional"],

  marquee: [
    "Penetration Testing", "Burp Suite", "Python", "Linux",
    "Nmap", "Nuclei", "PyTorch", "Scikit-learn", "C++", "Bug Hunting",
  ],

  projects: [
    {
      title: "EVHunter",
      category: "Security Tooling",
      year: "2026",
      description:
        "A CLI-based, AI-powered bug-hunting framework that fuses industry-standard recon tools — Nmap, Subfinder, Nuclei — with AI-driven analysis to find and verify vulnerabilities. A token-optimized pipeline sends compact JSON instead of raw output, cutting token usage by 80–90%, with automated PoC verification and AI-generated Markdown/HTML reports.",
      stack: ["Python", "Nmap", "Subfinder", "Nuclei", "SQLite", "CLI"],
      link: "https://github.com/Abdelrhman333/Ev_Hunter",
    },
    {
      title: "Spam Email Detector",
      category: "Machine Learning",
      year: "2026",
      description:
        "A TF-IDF + Multinomial Naive Bayes classifier that flags spam vs. legitimate messages in real time, wrapped in a Flask API with a live-testing web UI.",
      stack: ["Python", "Flask", "Scikit-learn", "TF-IDF", "Naive Bayes"],
      link: "https://github.com/Abdelrhman333/spam_detection", // TODO: point at the actual repo for this project
      demo: true,
    },
  ],

  education: {
    school: "Benha National University",
    degree: "B.Sc. in Computer Science — 2nd Year",
    period: "Expected graduation 2029",
    gpa: "3.2 / 4.0 GPA",
    note: "Currently in 2nd year",
  },

  certifications: [
    { date: "Mar 2026", title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy — via ELCC" },
    { date: "Jul 2026", title: "CyberSecurity Certificate", issuer: "Google Developer Group on Campus, BNU" },
    { date: "Self-paced", title: "Red Teaming, Ethical Hacking, Bug Hunting & Penetration Testing", issuer: "Udemy — Hussam Shady" },
    { date: "Self-paced", title: "Penetration Testing Student", issuer: "Udemy — Hussam Shady" },
  ],

  skillGroups: [
    {
      title: "Security",
      items: ["Web App Penetration Testing", "Burp Suite", "Nmap / Subfinder / Nuclei", "Recon & Verification", "Linux (daily driver)"],
    },
    {
      title: "Machine Learning",
      items: ["Python", "NumPy / Pandas", "Scikit-learn", "Matplotlib", "PyTorch (in progress)"],
    },
    {
      title: "Engineering",
      items: ["C++", "Bash", "PHP", "Git & GitHub", "Google Colab", "kaggle"],
    },
  ],

  manifesto: {
    text: "I break systems to learn how they work, and I train models to learn how data thinks — security and AI are two sides of the same curiosity.",
    author: "Abdelrhman Islam",
    role: "Cybersecurity & Machine Learning",
  },
};
