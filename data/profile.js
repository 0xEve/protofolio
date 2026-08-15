// ============================================================
// كل بيانات الموقع هنا — عدّل أي قيمة وهتظهر فورًا
// ============================================================

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

  // حدّث رابط LinkedIn هنا لو مختلف
  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/Abdelrhman333" },
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/abdelrhman-islam" },
    { label: "Email", icon: "mail", url: "mailto:abdelrhman.ev@gmail.com" },
  ],

  stats: [
    { value: 90, suffix: "%", label: "Token cost cut by EVHunter" },
    { value: 89, suffix: "%", label: "ML model accuracy" },
    { value: 4, suffix: "", label: "Certifications earned" },
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
      title: "House Price Prediction",
      category: "Machine Learning",
      year: "2025",
      description:
        "Built and trained a regression model to predict house prices, achieving 89% accuracy using NumPy, Pandas, and Scikit-learn.",
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      link: "https://github.com/Abdelrhman333",
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
      items: ["C++", "Bash", "PHP", "Git & GitHub", "Google Colab"],
    },
  ],

  manifesto: {
    text: "I break systems to learn how they work, and I train models to learn how data thinks — security and AI are two sides of the same curiosity.",
    author: "Abdelrhman Islam",
    role: "Cybersecurity & Machine Learning",
  },
};
