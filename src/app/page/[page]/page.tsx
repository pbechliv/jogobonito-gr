import { getManyPosts, getManyTags } from "@jogo/lib/api";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";
import { PostListPage } from "./post-list-page";

export const dynamicParams = true;

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  return generateHeaderMetadata({
    url: `tag/${params.page}`,
  });
}

export async function generateStaticParams() {
  const cachedPages = ["1", "2", "3", "4", "5"];
  return cachedPages.map((page: string) => ({ page }));
}

async function getData(page: string) {
  const { total: totalPosts, items: posts } = await getManyPosts(+page - 1);
  const { items: tags } = await getManyTags();
  return { posts, totalPosts, tags };
}

interface PageProps {
  params: Promise<{ page: string }>;
  searchParams: Promise<{}>;
}

export default async function Page(props: PageProps) {
  const { posts, totalPosts, tags } = await getData((await props.params).page);

  return <PostListPage posts={posts} totalPosts={totalPosts} tags={tags} />;
}
