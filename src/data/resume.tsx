import { Icons } from "@/components/icons";
import { portalUrl } from "@/lib/portal";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { cache } from "react";

export const NAVBAR = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/blog", icon: NotebookIcon, label: "Blog" },
];

// Content edited in the backend shows up on the site within this many seconds.
const REVALIDATE_SECONDS = 3600;

// Response of GET /resume on the mgrim-portal API. Icons arrive as keys of the Icons map.
type ResumeResponse = {
  profile: {
    name: string;
    initials: string;
    url: string;
    location: string;
    locationLink: string;
    description: string;
    summary: string;
    avatarUrl: string;
    email: string;
    tel: string;
  };
  socialLinks: { name: string; url: string; icon: string; navbar: boolean }[];
  skills: { dev: string[]; tools: string[] };
  work: {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string | null;
    description: string;
  }[];
  education: {
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }[];
  projects: {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: { type: string; href: string; icon: string }[];
    image: string;
    video: string;
  }[];
};

// Unknown icon keys fall back to the globe.
function getIcon(key: string) {
  return Icons[key as keyof typeof Icons] ?? Icons.globe;
}

async function fetchResume(): Promise<ResumeResponse> {
  const res = await fetch(portalUrl("/resume"), {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Portal API responded ${res.status} for /resume`);
  }
  return res.json();
}

export const getResume = cache(async () => {
  const { profile, socialLinks, skills, projects, ...rest } =
    await fetchResume();
  const { email, tel, ...about } = profile;

  return {
    ...about,
    ...rest,
    skillsDev: skills.dev,
    skillsTools: skills.tools,
    contact: {
      email,
      tel,
      social: Object.fromEntries(
        socialLinks.map((s) => [s.name, { ...s, icon: getIcon(s.icon) }])
      ),
    },
    projects: projects.map((project) => ({
      ...project,
      links: project.links.map((link) => {
        const Icon = getIcon(link.icon);
        return { ...link, icon: <Icon className="size-3" /> };
      }),
    })),
  };
});
