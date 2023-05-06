import Posts from "../../components/posts";
import Layout from "../../components/layout";
import { Seo } from "../../components/seo";
import { getOneTag, getTagPaths } from "@jogo/lib/api";
import { useRouter } from "next/router";
import { HOSTNAME } from "@jogo/lib/definitions";

const Tag = ({ tag }: any) => {
  const router = useRouter();
  const url = HOSTNAME + router.asPath;

  return (
    <Layout>
      <Seo url={url} />
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-yellow-200">
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
