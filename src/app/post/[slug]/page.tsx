import { getManyTags, getOnePost, getPostPaths } from "@jogo/lib/api";
import { generateHeaderMetadata } from "@jogo/lib/generate-header-metadata";
import { notFound } from "next/navigation";
import PostPage from "./post-page";

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps) {
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
  const { items: tags } = await getManyTags();

  return { post, tags };
}

interface PageProps {
  params: { slug: string };
  searchParams: {};
}

export default async function Page(props: PageProps) {
  const { post, tags } = await getData(props.params.slug);
  if (!post) {
    notFound();
  }
  return <PostPage post={post} tags={tags} />;
}
