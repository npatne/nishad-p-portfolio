export const projectSlug = 'wat-researcher'
export const projectContent = [
  {
    content:
      "The initial plan was to build a web app for a critical research tool, but it became clear this approach would be too costly and complex. I proposed and **led the shift** to a desktop application instead.\n\nI handled the entire process—from **UX strategy and design to full-stack engineering—building** the platform with Angular, Django, and Electron.\n\nThis decision fixed major scaling problems, provided a much richer feature set for thousands of researchers, and gave the organization a new capability in desktop development.\n\n\n\n_NDA limits what I can show, but I've included a few design shots, commit logs, and IA—happy to share more over a call._",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Analysis%20List%20Page.jpg",
        alt: "Desktop WAT Researcher",
        caption: "Desktop app mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Desktop%20research%20dashboard%20-%20version%203.jpg",
        alt: "Desktop WAT Researcher",
        caption: "Web app Mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/image%201.jpg",
        alt: "Desktop WAT Researcher Legacy",
        caption: "Legacy desktop app",
      },
    ],
    imagePosition: "right",
  },
  {
    content:
      "The Learning Engineering Institute (LEI) needed a modern replacement for Coh-Metrix, a legacy tool used by over 5,000 researchers worldwide. My initial role was to **design and build the new web-based version**.\n\nI completed the front-end with Angular, but we ran into a major roadblock. The backend analysis (processing of text) was so demanding that running it as a web service would be too expensive and difficult to scale. The project's future was at risk.\n\nSeeing this issue, I researched and prototyped _(design and code)_ a **different approach**:\n\n**A desktop-first strategy** that would use the researcher's own computer for processing. My proposal was approved, which completely changed the direction of the project.",
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Screenshot%202025-07-13%20at%206.22.55%E2%80%AFPM.png",
    imagePosition: "left",
    singleImageCaption: "Coh-Metrix App, recorded citations",
  },
  {
    content:
      "As the sole UX Designer and Engineer, my role expanded to cover key strategic and technical responsibilities.\n\n- **Proposed the Pivot to Desktop**: When it became clear the web-first approach wasn't viable, I researched and presented the case for switching to a desktop application, solving a core business and technical problem.\n\n- **Designed the New Architecture**: I designed the complete user experience and technical architecture for the desktop app. This included a new project-based workflow that was a major improvement over the original web concept.\n\n- **Built the Full-Stack Application**: I developed the entire application, handling the Angular frontend, the Django/Python backend, and packaging it for both macOS and Windows with Electron and PyInstaller.\n\n- **Delivered the Original Web App**: I also built the initial 3-page web interface. After we shifted focus, we repurposed it as a complementary tool for quick, simple analyses.\n\n- **Mentored the Team**: I am currently leading junior team members, guiding them in creating user documentation and running our QA testing plan.",
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Frame%20238.png",
    imagePosition: "bottom", // Single image example
    singleImageCaption: "Figma Design document and Github commits overview.",
  },
  {
    content:
      "- **Initial Web App Delivery**: I initially designed and built the first version of the web interface, which met our initial milestone at LEI and served as a proof of my front-end skills.\n\n- **Identifying the Core Problem**: During backend integration, I flagged the high server costs, queuing complications, and technical hurdles we would face, which started the discussion about finding a better way forward.\n\n- **Proposing the Desktop Solution**: I developed a proof-of-concept for a desktop app to show it could handle more complex features (like project management and local files) and solve the scalability issue.\n\n- **Designing a Better Experience**: Once the new direction was approved, I designed a more complete user experience based on a researcher's actual workflow, adding features for project creation, managing large sets of documents, and a local task queue.\n\n- **Building and Delivering**: I handled the entire desktop development process, including the challenge of cross-platform packaging with Electron and PyInstaller to create installers for macOS and Windows.",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/WAT%20Researcher%20ia.png",
        alt: "Information Architecture",
        caption: "Information Architecture",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/WAT%20Researcher%20erd.png",
        alt: "Entity Relation Diagram WAT Researcher Desktop",
        caption: "Entity Relation Diagram Desktop",
      },
    ],
    imagePosition: "bottom",
  },
  {
    content:
      "**The Solution: A Desktop and Web App**\n\nThe final result is a solution with two parts, each for a different type of user:\n\n- **WAT Researcher (Desktop)**: The main application for in-depth research. It's a powerful tool that lets users manage projects, handle large amounts of data, and run complex analyses on their own computer.\n\n- **WAT Researcher (Web)**: A simple, lightweight version for quick analysis of a single text or small document set. It offers easy access to the core features with no installation needed.",
    imagePosition: "bottom",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/desktop%20interface.png",
        alt: "WAT Researcher Desktop high fidelity mockup",
        caption: "WAT Researcher Desktop high fidelity mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/web%20interface.png",
        alt: "WAT Researcher Web high fidelity Mockup",
        caption: "WAT Researcher Web high fidelity Mockup",
      },
    ],
  },
  {
    content:"This project is scheduled to launch and replace an essential tool for a large academic community.\n\n- **Strategic Impact**: Changing from a costly web architecture solved a major business challenge and will save the institute significantly on server and maintenance costs.\n\n- **Organizational Impact**: I built the institute's first-ever pipeline for developing and distributing a desktop application, a completely new capability for the organization.\n\n- **Product Impact**: We delivered a product that is more powerful and versatile than originally planned, better meeting the needs of both casual and advanced users.\n\n- **Career Impact**: This project was a key step for me into a role with more strategic leadership and mentorship, proving I can guide a technical product from concept to launch."
  },
  {
    content:"**Tech & Methods**\n\n- **Frontend**: Angular, HTML5, CSS3\n- **Backend**: Django, Python, SQLite\n- **Desktop**: Electron, PyInstaller, Shell Scripting\n- **Design**: Figma, Wireframing, Prototyping, User Flow Mapping\n- **Process**: Agile Development, Stakeholder Management, Technical Strategy"
  },
  {
    content:"This project shows my ability to lead a complex, multi-platform product from concept to launch, combining the strategic thinking and technical skill required for senior UX Designer or UX Engineer roles."
  }
];