import Posts from "../../components/posts";
import Layout from "../../components/layout";
import { Seo } from "../../components/seo";
import { getManyPosts, getManyTags } from "@jogo/lib/api";
import { useRouter } from "next/router";
import { HOSTNAME } from "@jogo/lib/definitions";
import Pagination from "@jogo/components/pagination";

const Page = ({ posts, totalPosts, tags }: any) => {
  const router = useRouter();
  const url = HOSTNAME + router.asPath;

  return (
    <Layout tags={tags}>
      <Seo url={url} />
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const cachedPages = ["1", "2", "3", "4", "5"];
  return {
    paths: cachedPages.map((page: string) => ({
      params: {
        page,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const { items, total } = await getManyPosts(params.page - 1);
  const { items: tags } = await getManyTags();

  if (!items.length) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: { posts: items, totalPosts: total, tags },
    revalidate: 60,
  };
}

export default Page;
