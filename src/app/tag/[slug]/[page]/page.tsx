import { getManyTags, getOneTag, getTagPaths } from "@jogo/lib/api";
import TagPostListPage from "./tag-post-list-page";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";

export const dynamicParams = "blocking";

export async function generateMetadata({ params }: PageProps) {
  return generateHeaderMetadata({
    url: `tag/${params.slug}/${params.page}`,
  });
}

export async function generateStaticParams() {
  const paths = await getTagPaths();
  return paths.map((slug: any) => ({
    slug,
    page: "1",
  }));
}

export async function getData(slug: string, page: string) {
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

  return <TagPostListPage tag={tag} tags={tags} />;
}
