export const projectSlug = 'meta-portfolio'
export const projectContent = [
  {
    content: "**AI-Powered Portfolio Chatbot** – Building a conversational layer that lets visitors explore my work through natural dialogue.\n\nThis project was a self-directed mission to build that **conversational layer**, master the core technologies of the AI-driven product world, and demonstrate my unique value as a Design Engineer who bridges strategy, design, and code.",
    
    // To use a SINGLE image, uncomment these two lines and add your URL/caption:
    image: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/Mac%20Studio.png",
    singleImageCaption: "This current, AI Enabled portfolio with this chatbot.",
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "right",
  },
  
  {
    content: "**Portfolio with text to portfolio that can text**\n\nMy portfolio used to be just still pages. I wanted visitors to chat with it and dig into any project on their own.\n\n**The Challenge**\n- Teach myself RAG, vector databases, and orchestration from scratch\n- First offline build with Ollama + Llama maxed out my laptop after a single chat\n- Find hosting that could juggle 30+ chats (atleast), keep history, and stay basically free\n- Wrap it all in a simple yet scalable and elegant UI that fits into my portfolio\n\nThat's the hill I had to climb; the next section will show how I tackled it.",
    
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/project%20with%20text.png",
        alt: "Project that can text",
        caption: "What is my portfolio you talk back? Yes it does!",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/rab%20arch.png",
        alt: "RAG architecture",
        caption: "Learning Curve: RAG architecture",
      },
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",
  },
  
  {
    content: "**My Role: Solo Design Engineer & AI Architect**\n\nAs the sole creator, I owned the entire lifecycle, demonstrating my ability to manage strategy, architecture, and execution.\n\n- **Strategy:** I defined the project goals and made the critical pivot from a self-hosted to an API-driven architecture\n- **AI Architecture:** I designed the end-to-end RAG system using Gemini APIs, Qdrant, and the Haystack framework\n- **Full-Stack Development:** I built the Python backend, integrated all services, and connected it to my Next.js portfolio frontend\n- **Infrastructure & Deployment:** I deployed and optimized the application on Oracle Cloud, engineering it to work within the constraints of the free tier",
    
  },
    {
    content: "**Process: From Idea to Live AI Chat**\n\nBack in **March 2025** I wondered, _“What if my portfolio could actually talk back?”_ With zero budget and just my laptop, I decided to find out.\n\n**First local test** — I used Ollama, Llama 3.2, Chroma, and LangChain. It worked—until one answer swallowed **6 GB of RAM** and froze my MacBook. Fun demo, unusable in real life.\n\n**Learning the basics** — Evenings went into reading about **retrieval-augmented generation (RAG)**, vector databases, and prompt design. ChatGPT and Claude filled gaps while I sketched ideas on paper.\n\n**Moving to APIs** — Heavy models had to go. I picked Qdrant’s free tier for vectors, **Gemini Flash** for replies, and OpenAI embeddings (5 million tokens for \$5). Swapped LangChain for **Haystack** because the code felt cleaner.\n\n**Free-tier hosting** — I set up an Oracle Cloud VM, served the backend with **uvicorn**, added health checks and session cleanup so the free tier wouldn’t shut me down. Target: **30+ chats at once** without breaking.\n\n**Hooking up the front end** — Vercel v0 and Next.js gave me a quick frontend shell of portfolio. Mm FE skills helpt me engineer it. Dropped in the chat widget, tweaked the styles, and connected it to the API.\n\n**Polish and test** — Logs, retries, and late-night bug fixes followed. Now the chatbot runs lean, stays free, and lives right here in my portfolio. **But**, next steps are mapped out and are as such: refinig the answers, enhancing content pipeline and implementing your feedback.",
     images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/chat%20gpt%20guru.png",
        alt: "Following the learning curve, My chat history for this project.",
        caption: "Learning Curve: My chat history (recorded only with CHATGPT, tough there were others too) for this project.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/rag%20repo.png",
        alt: "My RAG repo",
        caption: "RAG Codebase: Where all the code for this project connect between my comouter and the cloud.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/oci.png",
        alt: "Oracle Cloud",
        caption: "Oracle Cloud: RAG computing is resource intensive, so I had to use a cloud virtual machine.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/v0.png",
        alt: "Vercel v0",
        caption: "Vercel v0: The frontend for my portfolio.",
      },
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",

    
  },
  
  {
    content: "**Outcomes & Impact: A Smarter, More Engaging Portfolio**\n\nThis project successfully transformed my portfolio into an interactive tool and a powerful demonstration of my capabilities _(did it?)_.\n\n**Enhanced User Engagement:** Visitors would no longer be passive viewers. They can now actively inquire and receive tailored information, turning a monologue into a dialogue _(do they?)_.\n\n**Demonstrated Strategic Adaptability:** The documented pivot serves as clear evidence of my ability to diagnose a failing strategy and make pragmatic trade-offs to deliver a superior, more sustainable solution.\n\n**Proven Technical Acumen:** The final application successfully handles up to 30 concurrent user requests with efficient response times, proving my ability to build and deploy scalable AI systems.\n\n**Future-Ready Skills:** This project is a tangible showcase of my proficiency in the core components of modern AI applications (LLMs, Vector Databases, RAG), positioning me at the intersection of design and AI engineering.",

    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/project%20that%20can%20text.png",
        alt: "Project that can text",
        caption: "Project that can text you back.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/yes%20project%20can%20text.png",
        alt: "Yes, the portfolio can text",
        caption: "Yes, the portfolio can text you back.",
      },
    ],
    
    imagePosition: "bottom",
  },
  
  {
    content: "**Technologies & Frameworks**\n\n- **AI/ML:** RAG, Gemini LLM, OpenAI embeddings, Splade Sparse Embeddings, Ollama + Llama\n- **Orchestration:** Haystack, Langchain\n- **Database:** Qdrant Vector Database, Chroma\n- **Infrastructure:** Oracle Cloud\n- **Frontend:** Next.js, Vercel v0, React, TypeScript\n- **My AI Teachers/Tools:** ChatGPT, Perplexity, Claude, Co-pilot",
  },
  {
    content:"This project demonstrates my commitment to staying current with AI technologies while combining design thinking with engineering implementation—essential skills for a Design Engineer role in today's AI-driven product landscape."
  }
];