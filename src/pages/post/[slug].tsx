import { MARKS, BLOCKS } from "@contentful/rich-text-types";
import Layout from "../../components/layout";
import NextImage from "../../components/image";
import Seo from "../../components/seo";
import { getOnePost, getPostPaths } from "@jogo/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Fragment } from "react";
import RichTextAsset from "@jogo/components/rich-text-asset";

const customMarkdownOptions = (content: any) => ({
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      if (node.content[0].marks.some((mark: any) => mark.type === MARKS.CODE)) {
        return <Fragment>{children}</Fragment>;
      } else {
        return <p>{children}</p>;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
  },
  renderMark: {
    [MARKS.CODE]: (node: any) => {
      let wrapperClassName = "";
      if (node.includes('src="https://www.youtube')) {
        node = node.replace("<iframe", '<iframe class="youtube-iframe"');
        wrapperClassName = "youtube-container";
      }
      return (
        <div
          className={wrapperClassName}
          dangerouslySetInnerHTML={{ __html: node }}
        />
      );
    },
  },
});

const Post = ({ post }: any) => {
  const seo = {
    metaTitle: post.title,
    metaDescription: post.description,
    shareImage: post.mainImage.url,
    post: true,
  };
  console.log(post.mainImage.url);
  return (
    <Layout>
      <Seo seo={seo} />
      <div className="px-4">
        <div className="prose max-w-full mb-3">
          <h1>{post.title}</h1>
        </div>
        <div className="relative aspect-video mb-3">
          <NextImage
            className="object-fit rounded-md"
            image={post.mainImage}
          ></NextImage>
        </div>
        <div className="prose prose-slate max-w-full">
          {documentToReactComponents(
            post.content.json,
            customMarkdownOptions(post.content)
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getPostPaths();

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
  const post = await getOnePost(params.slug);
  return {
    props: { post },
    revalidate: 60,
  };
}

export default Post;
