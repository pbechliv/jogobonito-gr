import Posts from "../../components/posts";
import Layout from "../../components/layout";
import { Seo } from "../../components/seo";
import { getManyPosts } from "@jogo/lib/api";
import { useRouter } from "next/router";
import { HOSTNAME } from "@jogo/lib/definitions";

const Page = ({ posts }: any) => {
  const router = useRouter();
  const url = HOSTNAME + router.asPath;

  return (
    <Layout>
      <Seo url={url} />
      <Posts posts={posts} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const cachedPages = ["1", "2", "3", "4", "5"];
  return {
    paths: cachedPages.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const posts = await getManyPosts(params.slug);

  if (!posts.length) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: { posts },
    revalidate: 60,
  };
}

export default Page;
