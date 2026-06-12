import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data/projects";
import { DetailHero, Story } from "@/components/detail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.excerpt };
}

export default async function ProjektDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <DetailHero
        title={project.title}
        subtitle={project.subtitle}
        gradient={project.gradient}
        meta={["Projekt", project.category, String(project.year)]}
        tags={project.tags}
        backHref="/projekte"
        backLabel="Alle Projekte"
        transitionName={`work-${project.slug}`}
      />
      <Story blocks={project.story} />
    </article>
  );
}
