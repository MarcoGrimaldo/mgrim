import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marco Grimaldo",
  initials: "MG",
  url: "https://mgrim.dev",
  location: "México",
  locationLink: "https://www.google.com/maps/place/Ciudad+de+México",
  description: "Software Engineer. I love building things and helping people.",
  summary:
    "In 2021, I start working as a software engineer, I began focusing on creating meaningful digital experiences through my own projects. I spend my free time building and learning new tools every day — always exploring better ways to solve problems and bring ideas to life online.",
  avatarUrl: "/yop.png",
  skillsDev: [
    "React",
    "React Native",
    "Next.js",
    "Vite",
    "Redux",
    "Typescript",
    "Material UI",
    "Node.js",
    "Jest",
    "Vitest",
    "Python",
    "JavaScript",
    "Postgres",
    "PL/SQL",
    "Java",
    "C++",
    "Dart",
    "PHP",
  ],
  skillsTools: [
    "Jira",
    "Git",
    "GitHub",
    "Vercel",
    "Microsoft Azure",
    "AWS",
    "Storybook",
    "Docker",
    "Zeplin",
    "Figma",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/notebook", icon: NotebookIcon, label: "Notebook" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MarcoGrimaldo",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/marco-a-grimaldo-peralta-83468a1a2/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "https://drive.google.com/file/d/1R2FPRV0dhoWyOqVfgfuu_-cEEha0E_2W/view?usp=sharing",
        icon: Icons.resume,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "PSL Group",
      href: "https://www.pslgroup.com/",
      badges: [],
      location: "Remote",
      title: "Application Developer",
      logoUrl: "/psl_group_logo.jpeg",
      start: "January 2022",
      end: "up to now",
      description:
        "Experienced Front-End Developer skilled in building responsive, scalable web applications using React. Proficient in creating reusable components, custom hooks, and debugging complex UI issues. Successfully deployed and maintained 15+ websites on AWS, ensuring high performance, reliability, and maintainable code.",
    },
    {
      company: "Veyron",
      badges: [],
      href: "https://veyron.com.mx/",
      location: "Hybrid",
      title: "Software Developer",
      logoUrl: "/veyron.png",
      start: "June 2021",
      end: "Jan 2022",
      description:
        "Full-Stack Developer with ERP Expertise, experienced in customizing IFS ERP solutions using IFS Developer Studio, .NET Core, and PL/SQL. Designed efficient backend logic and robust database components, while building custom web portals for seamless ERP data access. Skilled in front-end development with JavaScript, jQuery, Telerik, and responsive design. Integrated SOAP services and championed modernization efforts by introducing React and React Native for web and mobile solutions.",
    },
    {
      company: "CIITA Chihuahua",
      href: "https://www.ciitachihuahua.ipn.mx/",
      badges: [],
      location: "Remote",
      title: "Front End Developer",
      logoUrl: "/images.png",
      start: "January 2021",
      end: "June 2021",
      description:
        "Web Developer for Research Institutions, led the development of the CIITA Chihuahua website for the National Polytechnic Institute. Built a responsive and dynamic web app using React, Node.js, and CSS. Collaborated on intuitive UI design tailored to academic needs, ensured smooth version control with Git, and delivered a scalable, maintainable solution to support the center’s digital presence.",
    },
  ],
  education: [
    {
      school: "School of Computer Science and Engineering",
      href: "https://www.escom.ipn.mx/",
      degree: "Bachelor’s Degree in Computer Systems Engineering",
      logoUrl: "/escom.jpeg",
      start: "2017",
      end: "2021",
    },
    {
      school: "Udemy Courses",
      href: "https://www.udemy.com/",
      degree: "Ongoing Professional Development",
      logoUrl: "/udemy_logo.jpeg",
      start: "2021",
      end: "up to now",
    },
  ],
  projects: [
    {
      title: "Grupo Garruz",
      href: "https://www.grupogarruz.com/",
      dates: "Jan 2025 - Feb 2025",
      active: true,
      description:
        "Developed a responsive website to showcase a construction consultancy’s services, helping them attract clients and improve their digital presence.",
      technologies: [
        "React",
        "Javascript",
        "Node.js",
        "Material UI",
        "Vercel",
        "Sora",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.grupogarruz.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/garruz.mov",
    },
    {
      title: "Griza",
      href: "https://griza-corp.vercel.app/",
      dates: "June 2022 - September 2022",
      active: true,
      description:
        "Built a startup site to sell sleek, ready-to-use website templates for businesses looking to get online quickly and affordably.",
      technologies: [
        "Javascript",
        "React",
        "HTML",
        "Bootstrap",
        "CSS",
        "Vercel",
        "GitHub Pages",
      ],
      links: [
        {
          type: "Website",
          href: "https://griza-corp.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MarcoGrimaldo/griza-corp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/griza1.mov",
    },
    {
      title: "Old Portafolio",
      href: "https://marcogrimaldo.github.io/portafolio/",
      dates: "April 2020 - September 2020",
      active: true,
      description:
        "Built my first portfolio website to showcase personal projects, skills, and experience as a software developer, using a clean, responsive design.",
      technologies: ["jQuery", "Javascript", "HTML", "CSS", "Git Hub Pages"],
      links: [
        {
          type: "Website",
          href: "https://marcogrimaldo.github.io/portafolio/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/yop.mov",
    },
    {
      title: "Recorre Teotihuacán",
      href: "https://marcogrimaldo.github.io/recorre-teoti/#/",
      dates: "April 2020 - March 2020",
      active: true,
      description:
        "Developed a tourism services website with support for showcasing destinations and managing reservations through a user-friendly interface.",
      technologies: [
        "Javascript",
        "React",
        "Materialize CSS",
        "Redux",
        "Github Pages",
      ],
      links: [
        {
          type: "Website",
          href: "https://marcogrimaldo.github.io/recorre-teoti/#/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MarcoGrimaldo/recorre-teoti/tree/master",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/recorre1.mov",
    },
  ],
  hackathons: [
    {
      title: "#6: Sum square difference",
      dates: "Currently working on it...",
      description:
        "Find the difference between the sum of the squares of the first n natural numbers and the square of the sum.",
      image:
        "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/32-20e3.svg",
      links: [
        {
          title: "Web problem",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://projecteuler.net/problem=6",
        },
        {
          title: "My solution here",
          icon: <Icons.nextjs className="h-4 w-4" />,
          href: "/notebook/project-euler-6",
        },
      ],
    },
    {
      title: "#5: Smallest multiple",
      dates: "Done!",
      description:
        "Find smallest positive number that is evenly divisible by all of the numbers from 1 to n.",
      image:
        "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f96b.svg",
      links: [
        {
          title: "Web problem",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://projecteuler.net/problem=5",
        },
        {
          title: "My solution here",
          icon: <Icons.nextjs className="h-4 w-4" />,
          href: "/notebook/project-euler-5",
        },
      ],
    },
    {
      title: "#4: Largest palindrome product",
      dates: "Done!",
      description:
        "Find the largest palindrome made from the product of two n-digit numbers.",
      image:
        "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f504.svg",
      links: [
        {
          title: "Web problem",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://projecteuler.net/problem=4",
        },
        {
          title: "My solution here",
          icon: <Icons.nextjs className="h-4 w-4" />,
          href: "/notebook/project-euler-4",
        },
      ],
    },
    {
      title: "#3: Largest Prime Factor",
      dates: "Done!",
      description: "What is the largest prime factor of the given number?",
      image:
        "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/26f8.svg",
      links: [
        {
          title: "Web problem",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://projecteuler.net/problem=3",
        },
        {
          title: "My solution here",
          icon: <Icons.nextjs className="h-4 w-4" />,
          href: "/notebook/project-euler-3",
        },
      ],
    },
  ],
  eulerProblems: [
    {
      title: "🔢 Multiples of 3 and 5",
      description:
        "Find the sum of all the multiples of 3 or 5 below the provided parameter value number.",
      link: "/notebook/project-euler-1",
    },
    {
      title: "🇮🇹 Even Fibonacci numbers",
      description:
        "Return the sum of all even Fibonacci numbers that are less than or equal to the provided parameter value number.",
      link: "/notebook/project-euler-2",
    },
    {
      title: "⬆️ Largest Prime Factor",
      description:
        "What is the largest prime factor of the provided parameter value number?",
      link: "/notebook/project-euler-3",
    },
    {
      title: "🆘 Largest Palindrome Product",
      description:
        "Find the largest palindrome made from the product of two n-digit numbers, where n is the provided parameter value number.",
      link: "/notebook/project-euler-4",
    },
    {
      title: "🔢 Smallest Multiple",
      description:
        "Find the smallest positive number that is evenly divisible by all of the numbers from 1 to n, where n is the provided parameter value number.",
      link: "/notebook/project-euler-5",
    },
    {
      title: "🧮 Sum Square Difference",
      description:
        "Find the difference between the sum of the squares of the first n natural numbers and the square of the sum.",
      link: "/notebook/project-euler-6",
    },
  ],
} as const;
