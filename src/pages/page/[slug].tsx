import Posts from "../../components/posts";
import Layout from "../../components/layout";
import { Seo } from "../../components/seo";
import { getManyPosts } from "@jogo/lib/api";
import { useRouter } from "next/router";
import { HOSTNAME } from "@jogo/lib/definitions";
import Pagination from "@jogo/components/pagination";

const Page = ({ posts, totalPosts }: any) => {
  const router = useRouter();
  const url = HOSTNAME + router.asPath;

  return (
    <Layout>
      <Seo url={url} />
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
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
  const { items, total } = await getManyPosts(params.slug - 1);

  if (!items.length) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: { posts: items, totalPosts: total },
    revalidate: 60,
  };
}

export default Page;
