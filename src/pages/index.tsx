import { fetchAPI } from "@jogo/lib/api";
import Layout from "@jogo/components/layout";
import Seo from "@jogo/components/seo";
import Posts from "@jogo/components/posts";

const Home = ({ posts, categories, homepage }: any) => {
  return (
    <Layout categories={categories}>
      <Seo />
      <Posts posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [postsRes, categoriesRes] = await Promise.all([
    fetchAPI("/posts", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
  ]);

  return {
    props: {
      posts: postsRes.data,
      categories: categoriesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
