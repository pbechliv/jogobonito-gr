import Posts from "../../components/posts";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getOneTag, getTagPaths } from "@jogo/lib/api";

const Home = ({ posts }: any) => {
  return (
    <Layout>
      <Seo />
      <Posts posts={posts} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getTagPaths();

  return {
    paths: paths.map((slug: any) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const tag = await getOneTag(params.slug);

  return {
    props: { tag },
    revalidate: 60,
  };
}

export default Tag;
