import { getManyTags, getOneTag, getTagPaths } from "@jogo/lib/api";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";
import { notFound } from "next/navigation";
import { TagPostListPage } from "./tag-post-list-page";

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps) {
  return generateHeaderMetadata({
    url: `tag/${params.slug}/${params.page}`,
  });
}

export async function generateStaticParams() {
  const paths = await getTagPaths();
  return paths.map((slug) => ({
    slug,
    page: "1",
  }));
}

async function getData(slug: string, page: string) {
  const tag = await getOneTag(slug, +page - 1);
  const { items: tags } = await getManyTags();

  return { tag, tags };
}

interface PageProps {
  params: { slug: string; page: string };
  searchParams: {};
}

export default async function Page({ params }: PageProps) {
  const { tag, tags } = await getData(params.slug, params.page);
  if (!tag) {
    notFound();
  }

  return <TagPostListPage tag={tag} tags={tags} />;
}
