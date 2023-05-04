import Posts from "../../components/posts";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getOneTag, getTagPaths } from "@jogo/lib/api";

const Tag = ({ tag }: any) => {
  const seo = {
    metaTitle: tag.name,
    metaDescription: `All ${tag.name} posts`,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <h1 className="text-2xl p-4 underline decoration-yellow-200">
        {tag.name}
      </h1>
      <Posts posts={tag.posts} />
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
    fallback: "blocking",
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
