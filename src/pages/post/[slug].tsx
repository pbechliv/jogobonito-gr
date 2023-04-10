import ReactMarkdown from "react-markdown";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import NextImage from "../../components/image";
import Seo from "../../components/seo";
import rehypeRaw from "rehype-raw";

const Post = ({ post, categories }: any) => {
  const seo = {
    metaTitle: post.attributes.title,
    metaDescription: post.attributes.description,
    shareImage: post.attributes.image,
    post: true,
  };

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div className="px-4">
        <div className="prose max-w-full mb-3">
          <h1>{post.attributes.title}</h1>
        </div>
        <div className="relative aspect-video mb-3">
          <NextImage
            className="object-fit rounded-md"
            image={post.attributes.image}
          ></NextImage>
        </div>
        <div>
          <ReactMarkdown
            className="prose prose-slate max-w-full"
            rehypePlugins={[rehypeRaw]}
            remarkRehypeOptions={{ allowDangerousHtml: true }}
            transformImageUri={(uri: string) =>
              uri.replace("http://localhost:1337", "")
            }
          >
            {post.attributes.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const postsRes = await fetchAPI("/posts", { fields: ["slug"] });

  return {
    paths: postsRes.data.map((post: any) => ({
      params: {
        slug: post.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsRes = await fetchAPI("/posts", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { post: postsRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Post;
