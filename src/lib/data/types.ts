export type StoryBlock = {
  heading: string;
  body: string;
};

export type Work = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  year: number;
  featured?: boolean;
  /** Tailwind-Gradient-Klassen für Hero/Karten-Artwork */
  gradient: string;
  story: StoryBlock[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: string;
  featured?: boolean;
  size: "large" | "wide" | "normal";
  gradient: string;
  story: StoryBlock[];
};

export type Subproject = {
  title: string;
  description: string;
  tech: string[];
};

export type Job = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  skills: string[];
  subprojects: Subproject[];
};
