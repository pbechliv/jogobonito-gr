import {
  getManyTags,
  getOnePost,
  getPostPaths,
  getRelatedPosts,
} from "@jogo/lib/api";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";
import { notFound } from "next/navigation";
import { PostPage } from "./post-page";

export const dynamicParams = true;

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const post = await getOnePost(params.slug);
  return generateHeaderMetadata({
    title: post?.title,
    description: post?.lead,
    imageUrl: post?.mainImage.url,
    isArticle: true,
    url: `post/${params.slug}`,
  });
}

export async function generateStaticParams() {
  const paths = await getPostPaths();
  return paths.map((slug) => ({
    slug,
  }));
}

async function getData(slug: string) {
  const post = await getOnePost(slug);
  const relatedTag =
    post?.tags.items.find((tag) => tag.isMain) ?? post?.tags.items[0];

  const [{ items: tags }, relatedPosts] = await Promise.all([
    getManyTags(),
    relatedTag ? getRelatedPosts(relatedTag.slug, slug) : Promise.resolve([]),
  ]);

  return { post, tags, relatedPosts };
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{}>;
}

export default async function Page(props: PageProps) {
  const { post, tags, relatedPosts } = await getData((await props.params).slug);
  if (!post) {
    notFound();
  }
  return <PostPage post={post} tags={tags} relatedPosts={relatedPosts} />;
}
