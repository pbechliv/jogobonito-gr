import Layout from "@jogo/components/layout";
import Seo from "@jogo/components/seo";
import Posts from "@jogo/components/posts";
import { getManyPosts } from "@jogo/lib/api";
import Card from "@jogo/components/card";

const Home = ({ posts }: any) => {
  const headlinePost = posts[0];
  const restPosts = posts.slice(1, posts.length);
  return (
    <Layout>
      <Seo />
      <div className="grid gap-10 md:grid-cols-1">
        <Card post={headlinePost} key={headlinePost.slug} />
      </div>
      <Posts posts={restPosts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = (await getManyPosts(0)) ?? [];
  return {
    props: { posts },
    revalidate: 60,
  };
}

export default Home;
