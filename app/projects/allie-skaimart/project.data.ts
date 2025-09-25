export const projectSlug = "allie-skaimart";
export const projectContent = [
  {
    content: "> **By 2030, AI is projected to handle 80% of all customer interactions.**\n_[-sellerscommerce.com](https://www.sellerscommerce.com/blog/ai-in-ecommerce-statistics/#:~:text=%2A%2080,of%20companies%20by%202027)_\n\nE‑commerce is rapidly embracing AI assistants, yet current shopping bots often suffer from poor user experience and limited user control. I led the design of **“Allie”, an AI shopping assistant for the fictional Skaimart app, to tackle these gaps.**\n\n #### We introduced\n- Customizable AI profile for personalized recommendations.\n- Vision to extent this profile to the greater **Conversational Commerce** ecosystem.\n- Enhanced chat interactions (multimodal voice/text, smarter product comparisons, seamless integration)\n\n#### A/B test against Amazon’s own shopping assistant proved Allie’s impact:\n- **18 of 20** of participants preferred Allie’s experience.\n- **100%** said the new AI Profile was the feature they most wanted in real shopping apps.",
    
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/solutions%20and%20prototypes.png",
        alt: "Allie Solutions - Customizable sharable AI proile and Enhanced UI.",
        caption: "Allie Solutions - Customizable sharable AI proile and Enhanced UI.",
      },
    ],
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",
  },

  {
    content: "With retail giants like Amazon, Walmart, and others rolling out AI chatbots in their apps, I set out to investigate how effective and user-friendly these chat experiences really are.\n\n> Are these bots truly helpful “virtual shopping assistants,” or just gimmicks?\n\n> Do they mimic the feel of an in-store sales associate, or do they frustrate users?\n\n> Could it narrow choices or steer shoppers in ways that undermine their control?\n\nOur challenge was clear:\n\n**How might we design an e-commerce chatbot that augments the shopping experience without replacing it, providing guidance while preserving the user’s autonomy?**",


     image: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/chicagopng1.png",
    singleImageCaption: "Journal of the Association for Consumer Research - The University of Chicago Press",

    // videos: [
    //   {
    //     src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/animation%202.mp4",
    //     alt: "iSTART Legacy Student Portal",
    //     caption: "iSTART Legacy Student Portal",
    //   },
    //   {
    //     src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/animation%201.mp4",
    //     alt: "iSTART Legacy Teacher Portal",
    //     caption: "iSTART Legacy Teacher Portal",
    //   },
    // ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",
  },

  {
    content: "This project was executed under intense constraints. **I led the process end-to-end** (UX research, interaction design, and testing) with one collaborator supporting the study throughout.\n\n**We completed the entire case study in just a week**, from research through hi-fi prototype to testing.\n\nA fast-paced sprint that demanded sharp focus on the most impactful problems and solutions."


  },

  {
   content: "#### Evaluating Current Chatbots\n\nWe first conducted a structured evaluation of four leading retail apps’ AI chatbots (Amazon’s “Rufus,” Walmart’s “Ask Sparky,” Safeway’s in-app assistant, and Home Depot’s “Magic Apron”).\n\nWe devised a **sandardized test process** with 6 key tasks for each chatbot, emulating common customer queries:\n\n- Search by Asking\n- Product Q&A\n- Compare Products\n- Store Navigation\n- Policy/Customer Service\n- Recommendations & Justification\n\nAnd, we uncovered a wide range of maturity from Amazon's highly sophisticated to Safeway's beta model.\n\n**Critically, common pain points emerged**:\n\n- Limited memory of context\n- No way to refine what the bot shows you\n- Awkward or verbose answers for comparisons\n- Bots appear in only parts of the app rather than throughout the journey\n\nThese findings confirmed that today’s chatbots often deliver a fragmented experience: they assist with Q&A, but they don’t truly adapt to user needs or integrate seamlessly with browsing.\n\n> Users have to cede control to the bot, rather than collaborating with it." 
,
    
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Overview%20Mockup%20research.png",
        alt: "Existing Chatbots - Research Inquiry",
        caption: "An overview of findings observed after testing existing chatbots.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Amazon%20Rufus%20Mockup%20research.png",
        alt: "Amazon Rufus - Research Inquiry",
        caption: "An overview of findings observed after testing Amazon’s Rufus chatbot.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Home%20Depot%20Magic%20Apron%20Mockup%20research.png",
        alt: "Home Depot Magic Apron - Research Inquiry",
        caption: "An overview of findings observed after testing Home Depot’s Magic Apron chatbot.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Safeway%20Mockup%20research.png",
        alt: "Safeway - Research Inquiry",
        caption: "An overview of findings observed after testing Safeway’s in-app assistant chatbot.",
      },  
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Walmarts%20Ask%20Sparky%20Mockup%20research.png",
        alt: "Walmarts Ask Sparky - Research Inquiry",
        caption: "An overview of findings observed after testing Walmart’s Ask Sparky chatbot.",  
      },
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",
  },

  {
   content: "We went through 30+ published research and articles to understand, validate and better ideate solutions.\n\n#### Thematic findings\n\n- **Adoption is real, not hype:** broad rollout + high expectations for personalization.\n- **Company bet:** purpose-built, vertically integrated assistants (Rufus, Magic Apron) to reduce effort and increase confidence.\n- **Trust grows** when the bot feels human-attuned and interactive – not just accurate.\n- **But autonomy has a ceiling:** users still want the wheel; over-automation risks narrowing choices.\n\n**Net-net:**\n\n> **Assistants must be helpful and steerable, not black boxes.**\n\n#### Problem statement (refined)\n\nCurrent e-commerce chatbots need to evolve into truly assistant-like experiences, ones that integrate into the entire shopping journey and offer hyper-personalized help, while empowering the user to steer recommendations and decisions.\n\n#### What guides Allie\n\n- **Visible agency controls** – so users can steer the bot mid-conversation.\n- **Human-attuned interaction:** fast, concise answers + follow-ups; multimodal in/out; comparative cards over walls of text.\n- **Transparency against constraint:** explain why each rec fits the current profile and show alternatives." ,
    
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/rufus%20ai.png",
        alt: "The technology behind Amazon’s GenAI-powered shopping assistant, Rufus - Amazon Science",
        caption: "The technology behind Amazon’s GenAI-powered shopping assistant, Rufus - Amazon Science",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/ai%20omnichannel.png",
        alt: "Understanding Customer Responses to AI-Driven Personalized Journeys: Impacts on the Customer Experience- Journal of Advertising",
        caption: "Understanding Customer Responses to AI-Driven Personalized Journeys: Impacts on the Customer Experience- Journal of Advertising",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/nih.png",
        alt: "AI-based chatbots in conversational commerce and their effects on product and price perceptions - Electronic Markets, NLM Library",
        caption: "AI-based chatbots in conversational commerce and their effects on product and price perceptions - Electronic Markets, NLM Library",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/rep%20ai.png",
        alt: "The Future of AI In Ecommerce: 40+ Statistics on Conversational AI Agents For 2025 - REP AI",
        caption: "The Future of AI In Ecommerce: 40+ Statistics on Conversational AI Agents For 2025 - REP AI",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/sallers.png",
        alt: "AI in eCommerce Statistics (2025) - SellersCommerce",
        caption: "AI in eCommerce Statistics (2025) - SellersCommerce",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/walmart%20forbes.png",
        alt: "Walmart Bets Big On Generative And Agentic AI With ‘Sparky’ - Forbes",
        caption: "Walmart Bets Big On Generative And Agentic AI With ‘Sparky’ - Forbes",
      },
    ],
    imagePosition: "top",
  },

  {
    content: "Building on our directive of **hyper-personalization**, we extended the idea beyond a single chat into the wider conversational commerce ecosystem. This led us to define the concept of a **shareable AI Profile** that carries user preferences across sessions, products, and even apps.\n\n#### The AI Profile\n\nA persistent, customizable profile that users can edit mid-chat and even export in the future to other shopping apps. It gives shoppers direct control over how the assistant behaves:\n\n- **Focus:** Deals, Fast Delivery, Sustainable, Budget Alternatives, etc. (multi-select)\n- **Price band:** Budget · Value · Neutral · Premium · Luxury\n- **Quality:** Basic ↔ High-End\n- **Brand familiarity:** Explore · Varied · Neutral · Familiar Only\n\nA quick access panel shows current preferences and allows one-off overrides (e.g., *“show premium just this once”*).\n\n#### MVP and Enhancements\n\nFor our MVP, we prioritized creating an interface that is **human-attuned and steerable**. The AI Profile anchors the experience, while design enhancements focus on:\n\n- Fast, concise answers and natural multimodal input (text/voice)\n- Clear follow-ups instead of walls of text\n- Comparative cards over narrative blocks\n\nFuture enhancements explore a **portable profile**, allowing shoppers to carry preferences across multiple shopping platforms.\n\n#### Additional Features\n\n- **Better comparisons:** Side-by-side product cards inside chat with specs, pros/cons, price, and ratings. Scroll to scan; tap to dive deeper.\n- **“Ask Allie” everywhere:** An icon on listings and product pages opens a context-aware chat that already knows the item you’re viewing.\n\nIn short: from a directive of hyper-personalization, we shaped Allie into an assistant that is integrated, steerable, and scalable across the shopping journey." 
 ,
    
    videos: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/animation%202.mp4",
        alt: "Sherable AI Profile",
        caption: "Sherable AI Profile - Allie Skaimart",
      },
       {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/animation%201.mp4",
        alt: "Enhanced E-commerce Shopping Experience",
        caption: "Enhanced AI chatbot, E-commerce Shopping Experience - Allie Skaimart",
      },
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "bottom",
  },

  {
    content: "**Imagine a storefront assistant that chats about products from where you see the product, compares options elegantly, remembers your preferences, and adapts instantly to spur-of-the-moment choices, all with in-chat editable profiles**",
    
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Final%20FLow%202.gif",
        alt: "Allie from Skaimart - Lets you have a say in what the AI recommends",
        caption: "Allie from Skaimart - Lets you have a say in what the AI recommends",
      },
      
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "left",
  },
  {
    content: "**Now picture taking that assistant where you go. Set your AI profile once and share it across apps, a digital companion that knows your tastes yet flexes to new contexts.**",
    
    images: [
    
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/Final%20Flow%201.gif",
        alt: "Allie from Skaimart - Take your assistant where you go.",
        caption: "Allie from Skaimart - Take your assistant where you go.",
      },
      
    ],
    
    
    // Set the image position: "left", "right", or "bottom"
    imagePosition: "right",
  },

  {
   content: "To validate our design, we conducted informal A/B user testing against the gold standard, Amazon’s AI assistant.\n\nWe recruited 20 e-commerce app users (mix of colleagues and friends who shop online frequently, ages 20–40, 7 female/13 male).\n\nEach participant was asked to perform a realistic task:\n\n> **Find a pair of wireless headphones and use the AI assistant to get recommendations and compare options.**\n\nFirst, they did this using Amazon’s live app and Rufus assistant; then they repeated a similar task using our Skaimart + Allie prototype.\n\n**Post-test follow-up questions and results (in adjecent/below graphics) were truely astonishing.**"
,
     images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/question%202.png",
        alt: "20 out of 20 (100%) unanimously pointed to the customizable AI Profile as their favorite feature.",
        caption: "20 out of 20 (100%) unanimously pointed to the customizable AI Profile as their favorite feature.",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/question%201.png",
        alt: "18 out of 20 participants (90%) answered that they preferred the Allie (Skaimart) chat experience over Amazon’s",
        caption: "18 out of 20 participants (90%) answered that they preferred the Allie (Skaimart) chat experience over Amazon’s",
      },],
      imagePosition: "right",

  },
  {
    content: "The success of Allie’s concept in user testing suggests a promising path forward for AI in e-commerce. By allowing users to steer the AI (rather than the other way around), we saw engagement and enthusiasm that comparative chatbots rarely achieve.\n\nA more formal study could measure improvements in objective metrics like conversion or retention, but our qualitative results already hint at a boost in user trust and perceived relevance of recommendations.\n\nIn an era where 24/7 AI assistants are becoming the norm, designing them to be transparent, user-tunable, and seamlessly integrated could dramatically improve the online shopping experience for both customers and businesses.",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/wamlart.png",
        alt: "Walmart's Retail Rewired Report 2025: Agentic AI at the Heart of Retail Transformation",
        caption: "Walmart's Retail Rewired Report 2025: Agentic AI at the Heart of Retail Transformation",
      },
      ],
      imagePosition: "right",
  },
    {
    content: "On a personal note, this project was an intensive learning experience. Leading a rapid one-week case study taught me how to quickly synthesize research into actionable design decisions and confirm those decisions with just-enough user feedback. I also deepened my understanding of the balance between AI automation and human-centered design, and concepts like maintaining user agency, building trust through transparency, and the ethics of personalization were not just theoretical, but things I had to address in the design.\n\nFinally, this project was a breakthrough for me in mobile UX and emerging tech: it pushed me to design beyond web interfaces, adapt to mobile constraints (like small screen comparisons), and explore the cutting edge of AI-driven UX. I’m excited to carry these lessons forward as AI becomes an ever bigger part of product design."
  }
];
