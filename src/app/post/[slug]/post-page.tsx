import { MARKS, BLOCKS } from "@contentful/rich-text-types";
import NextImage from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Fragment } from "react";
import RichTextAsset from "@jogo/components/rich-text-asset";
import Layout from "@jogo/components/layout";

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

const PostPage = ({ post, tags }: any) => {
  return (
    <Layout tags={tags}>
      <div className="px-4">
        <div className="prose max-w-full mb-3">
          <h1>{post.title}</h1>
        </div>
        <div className="relative aspect-video mb-3">
          <NextImage
            className="object-fit rounded-md"
            src={post.mainImage.url}
            fill
            alt=""
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

export default PostPage;
