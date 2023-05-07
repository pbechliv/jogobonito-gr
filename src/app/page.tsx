import { getManyPosts, getManyTags } from "@jogo/lib/api";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";
import HomePostListPage from "./home-post-list-page";

export const metadata = generateHeaderMetadata({});

async function getData() {
  const { total: totalPosts, items: posts } = await getManyPosts(0);
  const { items: tags } = await getManyTags();
  return { posts, totalPosts, tags };
}

export default async function Page() {
  const { posts, totalPosts, tags } = await getData();

  return <HomePostListPage posts={posts} totalPosts={totalPosts} tags={tags} />;
}
