import Layout from "@jogo/components/layout";
import { Seo } from "@jogo/components/seo";
import Posts from "@jogo/components/posts";
import { getManyPosts, getManyTags } from "@jogo/lib/api";
import Pagination from "@jogo/components/pagination";

const Home = ({ posts, totalPosts, tags }: any) => {
  return (
    <Layout tags={tags}>
      <Seo />
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { total, items: posts } = (await getManyPosts(0)) ?? [];
  const { items: tags } = await getManyTags();
  return {
    props: { posts, totalPosts: total, tags },
    revalidate: 60,
  };
}

export default Home;
