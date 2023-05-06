import Posts from "../../../components/posts";
import Layout from "../../../components/layout";
import { Seo } from "../../../components/seo";
import { getManyTags, getOneTag, getTagPaths } from "@jogo/lib/api";
import { useRouter } from "next/router";
import { HOSTNAME } from "@jogo/lib/definitions";
import Pagination from "@jogo/components/pagination";

const Tag = ({ tag, tags }: any) => {
  const router = useRouter();
  const url = HOSTNAME + router.asPath;

  return (
    <Layout tags={tags}>
      <Seo url={url} />
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-yellow-200">
        {tag.name}
      </h1>
      <Posts posts={tag.posts} />
      <Pagination totalPosts={tag.totalPosts} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getTagPaths();

  return {
    paths: paths.map((slug: any) => ({
      params: {
        slug,
        page: "1",
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const tag = await getOneTag(params.slug, params.page - 1);
  const { items: tags } = await getManyTags();

  return {
    props: { tag, tags },
    revalidate: 60,
  };
}

export default Tag;
