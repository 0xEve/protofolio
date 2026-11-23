

export const profile = {
  name: "Abdelrhman Islam",
  initials: "AI",
  firstName: "Abdelrhman",
  lastName: "Islam",
  role: "Cybersecurity & Penetration Testing",
  tagline:
    "Computer Science student who hunts vulnerabilities in web apps and trains machine learning models — security mindset, engineering discipline.",
  about:
    "I'm Abdelrhman, a Computer Science student at Benha National University. I focus on web application security and build projects in Python, from security tooling to machine learning. I'm still learning, and I like turning what I study into something I can test and improve.",
  location: "Benha, Egypt",
  timezone: "Africa/Cairo",
  email: "abdelrhman.ev@gmail.com",
  phone: "+20 114 349 4160",
  availability: "Open to internships & opportunities",
  resumeUrl: "/resume.pdf",

  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/0xEve" },
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/abdelrhman-lslam" },
    { label: "Email", icon: "mail", url: "mailto:abdelrhman.ev@gmail.com" },
  ],

  stats: [
    { value: 2, suffix: "", label: "Areas: security & machine learning" }, 
    { value: 4, suffix: "", label: "Certificates & training entries" },
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
        "A CLI-based, AI-powered bug-hunting framework that fuses industry-standard recon tools — Nmap, Subfinder, Nuclei — with AI-driven analysis to find and verify vulnerabilities. A token-optimized pipeline sends compact JSON instead of raw output, with automated PoC verification and AI-generated Markdown/HTML reports.",
      stack: ["Python", "Nmap", "Subfinder", "Nuclei", "SQLite", "CLI"],
      link: "https://github.com/0xEve/Ev_Hunter",
      image: "/projects/evhunter.png",
      imageAlt: "EVHunter command-line help showing recon, history and reporting commands",
      imageCaption: "Actual CLI help. No target was scanned for this preview.",
      highlights: ["Recon, verification and reporting in one CLI workflow", "Compact JSON payloads for AI analysis", "SQLite scan history and Markdown / HTML reports"],
      note: "Built for authorized security testing. AI-assisted findings still need human validation.",
    },
    {
      title: "Spam Email Detector",
      category: "Machine Learning",
      year: "2026",
      description:
        "A TF-IDF + Multinomial Naive Bayes classifier that flags spam vs. legitimate messages in real time, wrapped in a Flask API with a live-testing web UI.",
      stack: ["Python", "Flask", "Scikit-learn", "TF-IDF", "Naive Bayes"],
      link: "https://github.com/0xEve/spam_detection",
      demo: "https://spam-detection-sigma-seven.vercel.app/",
      image: "/projects/spam-detector.png",
      imageAlt: "Spam Checker web interface with a message input and analysis control",
      imageCaption: "Actual deployed web interface.",
      highlights: ["TF-IDF text features with a Naive Bayes classifier", "Flask prediction API and browser-based interface", "Separate training script and saved model bundle"],
      note: "A learning project, not an email security filter. Evaluation metrics need a leakage-free test before publication.",
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
