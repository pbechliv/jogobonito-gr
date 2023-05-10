import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  Block,
  Inline,
  MARKS,
  Text,
} from "@contentful/rich-text-types";
import Layout from "@jogo/components/layout";
import RichTextAsset from "@jogo/components/rich-text-asset";
import { PostContent, PostWithContent, Tag } from "@jogo/definitions";
import { HOSTNAME } from "@jogo/definitions/hostname";
import { format } from "date-fns";
import NextImage from "next/image";
import { Fragment } from "react";

function isTextNode(node: Text | Inline | Block): node is Text {
  return (node as Text).marks !== undefined;
}

const customMarkdownOptions = (content: PostContent) => ({
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Inline | Block, children: React.ReactNode) => {
      const internalNode = node.content[0];
      if (
        isTextNode(internalNode) &&
        internalNode.marks.some((mark) => mark.type === MARKS.CODE)
      ) {
        return <Fragment>{children}</Fragment>;
      } else {
        return <p>{children}</p>;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
    [INLINES.HYPERLINK]: (node: Inline | Block, children: React.ReactNode) => {
      console.log(node.data.uri);
      return (
        <a
          href={node.data.uri}
          target={node.data.uri.startsWith(HOSTNAME) ? "_self" : "_blank"}
        >
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.CODE]: (node: React.ReactNode) => {
      if (typeof node !== "string") {
        return node;
      }
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

interface PostPageProps {
  post: PostWithContent;
  tags: Tag[];
}

const PostPage = ({ post, tags }: PostPageProps) => {
  return (
    <Layout tags={tags}>
      <div className="px-4">
        <div className="prose max-w-full mb-3 text-center">
          <h1>{post.title}</h1>
        </div>
        <div className="flex gap-3 justify-center items-center mb-3">
          <span>{format(new Date(post.publishedDate), "dd/MM/yyyy")}</span>
          <span> | </span>
          <span>Νεκτάριος Δαργάκης</span>
          <NextImage
            className="rounded-full"
            src="/nectarios.jpeg"
            width={36}
            height={36}
            alt=""
          />
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
