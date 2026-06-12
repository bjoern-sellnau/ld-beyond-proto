import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/data/posts";
import { DetailHero, Story } from "@/components/detail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function TechDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <DetailHero
        title={post.title}
        subtitle={post.excerpt}
        gradient={post.gradient}
        meta={[post.category, date, post.readingTime]}
        tags={post.tags}
        backHref="/tech"
        backLabel="Alle Artikel"
        transitionName={`post-${post.slug}`}
      />
      <Story blocks={post.story} />
    </article>
  );
}
