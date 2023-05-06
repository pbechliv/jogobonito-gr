import Layout from "@jogo/components/layout";
import { Seo } from "@jogo/components/seo";
import Posts from "@jogo/components/posts";
import { getManyPosts } from "@jogo/lib/api";
import Card from "@jogo/components/card";
import Pagination from "@jogo/components/pagination";

const Home = ({ posts, totalPosts }: any) => {
  return (
    <Layout>
      <Seo />
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { total, items } = (await getManyPosts(0)) ?? [];
  return {
    props: { posts: items, totalPosts: total },
    revalidate: 60,
  };
}

export default Home;
