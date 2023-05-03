import Layout from "@jogo/components/layout";
import Seo from "@jogo/components/seo";
import Posts from "@jogo/components/posts";
import { getManyPosts } from "@jogo/lib/api";

const Home = ({ posts }: any) => {
  return (
    <Layout>
      <Seo />
      <Posts posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = (await getManyPosts()) ?? [];
  return {
    props: { posts },
    revalidate: 1,
  };
}

export default Home;
