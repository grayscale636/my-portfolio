import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Gery",
  lastName: "Pangestu",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Data Scientist",
  avatar: "/images/avatar.jpg",
  email: "gerypangestu254@gmail.com",
  location: "Asia/Jakarta", // IANA time zone identifier for Indonesia/East Java
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/grayscale636",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/gery-pangestu",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building intelligent solutions with AI and Data Science</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">MARSHALL</strong></>,
    href: "/work/marshall-ai-teaching-system",
  },
  subline: (
    <>
      I&apos;m Gery, a Data Science graduate from Telkom University with expertise in AI, machine learning, and backend development.
      <br /> Passionate about creating intelligent systems and self-hosted solutions.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Tulungagung, East Java`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        A Data Science graduate from Telkom University with a strong interest in machine learning, backend development, and 
        self-hosted systems. Experienced in building and managing services home server with the tools. 
        Adaptable, curious, and eager to explore new technologies through hands-on projects that enhance both technical and 
        practical skills.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Telkom Corporate University",
        timeframe: "February 2024 - Present",
        role: "AI Engineer (Hybrid)",
        achievements: [
          <>
            Be part of and collaborate in the &quot;MARSHALL&quot; team, supporting teaching with various ai models
          </>,
          <>
            Create LLM Pipeline to providing resources in making teaching modules such as pictures and illustrations
          </>,
          <>
            Developed and deployed AI-based teaching module generators using CLIP and TrOCR
          </>,
        ],
        images: [],
      },
      {
        company: "Data Bridge",
        timeframe: "November 2024 - Present",
        role: "Freelance Data Scientist (Remote)",
        achievements: [
          <>
            Developed regression and classification models for client analytics (Python, Scikit-learn)
          </>,
          <>
            Delivered actionable insights through visualization (Matplotlib, Seaborn)
          </>,
          <>
            Improved decision-making by automating data pipelines and optimizing model performance
          </>,
        ],
        images: [],
      },
      {
        company: "Bangkit Academy",
        timeframe: "August 2023 - January 2024",
        role: "Machine Learning Cohort - Batch 2 2023",
        achievements: [
          <>
            Learned about data analytics, machine learning, deep learning, and deploying
          </>,
          <>
            Learned english and common softskill
          </>,
          <>
            Working on capstone project, developing transfer learning model and deploy to android
          </>,
        ],
        images: [],
      },
      {
        company: "Telkom University Purwokerto",
        timeframe: "September 2023 - January 2024",
        role: "NLP Computer Lab Assistant",
        achievements: [
          <>
            Design and develop practicum modules that are in line with the NLP course curriculum
          </>,
          <>
            Explaining and systematizing practicum modules to practicum participants
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Telkom University Purwokerto (TUP)",
        description: <>Majored in Data Science (2021 - 2025)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "AI & Machine Learning",
        description: <>Proficient in building and deploying ML models using Python, TensorFlow, PyTorch, and Scikit-learn. Experienced with computer vision using OpenCV and model serving via FastAPI or Flask.</>,
        images: [],
      },
      {
        title: "Data & Analytics",
        description: <>Skilled in data analysis using SQL, Pandas, R, and Power BI. Able to perform statistical analysis using SPSS, and present findings with clear visualizations.</>,
        images: [],
      },
      {
        title: "Backend & API Development",
        description: <>Able to design and deploy REST APIs using FastAPI and Flask. Good understanding of asynchronous patterns and scalable architecture.</>,
        images: [],
      },
      {
        title: "DevOps & Systems",
        description: <>Experienced in managing home lab server with self-hosted services including Grafana, Prometheus. Familiar with Docker, Linux, basic networking, and private VPN access using Tailscale.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
