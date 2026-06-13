import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLab, labs } from "@/lib/data/labs";
import { DetailHero, Story } from "@/components/detail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return labs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return {};
  return { title: lab.title, description: lab.excerpt };
}

export default async function LabDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <article>
      <DetailHero
        title={lab.title}
        subtitle={lab.subtitle}
        gradient={lab.gradient}
        meta={["Lab", lab.category, String(lab.year)]}
        tags={lab.tags}
        backHref="/labs"
        backLabel="Alle Labs"
        transitionName={`work-${lab.slug}`}
      />
      <Story blocks={lab.story} />
    </article>
  );
}
