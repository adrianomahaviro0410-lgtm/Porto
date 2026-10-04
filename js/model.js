/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "adrianomahaviro0410-lgtm",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "adrianomahaviro0410@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Android Mobile Application Security Assessment",
      tag: "Mobile Security", color: "#3dff6e", live: false,
      url: "https://github.com/adrianomahaviro0410-lgtm",
      cta: "View GitHub profile →",
      img: "assets/projects/android-security.png",
      desc: "Conducted SAST and DAST on large-scale Android applications using JADX-GUI and Burp Suite, uncovering BOLA/IDOR issues, cleartext traffic misconfigurations, and unverified App Link intent filters.",
    },
    {
      title: "HackTheBox Laboratory Penetration Testing",
      tag: "Pentesting", color: "#e60012",
      url: "https://github.com/adrianomahaviro0410-lgtm",
      cta: "View write-ups →",
      img: "assets/projects/htb.png",
      desc: "Performed systematic network and web application enumeration to obtain initial access, then analyzed system scripts and cron jobs to escalate privileges to root access.",
    },
    {
      title: "Computational Data Systems & Python Scripting",
      tag: "Data Engineering", color: "#f1e05a",
      url: "https://github.com/adrianomahaviro0410-lgtm",
      cta: "View repositories →",
      img: "assets/projects/data-systems.png",
      desc: "Built custom Python scripts for data parsing and visualization, designed MariaDB/MySQL schemas, and implemented self-balancing AVL Tree algorithms in C for efficient binary search operations.",
    },
    {
      title: "Public Sector Android Security Assessment",
      tag: "Threat Analysis", color: "#3178c6",
      url: "https://github.com/adrianomahaviro0410-lgtm",
      cta: "View profile →",
      img: "assets/projects/public-sector.png",
      desc: "Performed vulnerability testing on a large-scale Indonesian public sector mobile application, identifying API endpoint misconfigurations and client-side data leakage risks using Burp Suite and JADX-GUI.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "SoftEng", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/adrianomahaviro0410-lgtm/SoftEng",
      description: "SmartStudy App project focused on web and cloud workstreams, priority algorithm logic, and Supabase integration.",
    },
    {
      name: "HTB-Cap", language: "Shell", stargazers_count: 0,
      html_url: "https://github.com/adrianomahaviro0410-lgtm",
      description: "An HTB Linux machine write-up covering enumeration, exploitation, and privilege escalation workflows.",
    },
    {
      name: "CyberSecurity-Portfolio", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/adrianomahaviro0410-lgtm",
      description: "Portfolio and project showcase focused on mobile security, pentesting, and security research findings.",
    },
    {
      name: "Security-Notes", language: "Markdown", stargazers_count: 0,
      html_url: "https://github.com/adrianomahaviro0410-lgtm",
      description: "Security notes and research documentation covering vulnerability analysis, reverse engineering, and remediation planning.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Security & Pentesting", items: [
      ["OWASP MASVS · CVSS v3.1", 96], ["SAST · DAST", 94],
      ["Burp Suite", 80], ["APK Reverse Engineering", 80],
      ["Root & SSL Pinning Bypass", 80], ["Server And Network Administration(AntiViruses)", 95],
    ]},
    { group: "Web & App Security", items: [
      ["Android Security Testing", 94], ["Web API Pentesting", 90],
      ["Mobile App Threat Modeling", 88], ["Network Vulnerability Assessment", 86],
      ["Frida Scripting", 84], ["Smali Reading", 90],
    ]},
    { group: "Programming & Data", items: [
      ["Python", 80], ["C", 90],
      ["SQL · MariaDB · MySQL", 84], ["Kali Linux · Ubuntu", 90],
      ["Biopython · Matplotlib", 78], ["DevSecOps Pipelines", 74],
    ]},
    { group: "Certifications & Focus", items: [
      ["Certified Network Security Practitioner (CNSP)", 100], ["Cybersecurity · BINUS", 97],
      ["SIEM Tools", 82], ["Ethical Security Research", 90],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
