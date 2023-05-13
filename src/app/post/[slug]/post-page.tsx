import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  Block,
  INLINES,
  Inline,
  MARKS,
  Text,
} from "@contentful/rich-text-types";
import { Layout } from "@jogo/components/layout";
import { RichTextAsset } from "@jogo/components/rich-text-asset";
import { PostContent, PostWithContent, Tag } from "@jogo/definitions";
import { format } from "date-fns";
import NextImage from "next/image";
import { Fragment } from "react";

function isTextNode(node: Text | Inline | Block): node is Text {
  return (node as Text).marks !== undefined;
}

function isString(node: React.ReactNode): node is string {
  return typeof node === "string";
}

const HTML_REGEX = /<.*?>.*?<\/.*?>/g;

const isFacebookPost = (node: string) =>
  node.includes("https://www.facebook.com/plugins/post");

const isFacebookVideo = (node: string) =>
  node.includes("https://www.facebook.com/plugins/video");

const isYoutubeVideo = (node: string) =>
  node.includes("https://www.youtube.com/embed/");

const isVideo = (node: string) => isYoutubeVideo(node) || isFacebookVideo(node);

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
      return (
        <a href={node.data.uri} target={"_blank"}>
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.CODE]: (node: React.ReactNode) => {
      if (!isString(node) || !node.match(HTML_REGEX)) {
        return node;
      }

      let wrapperClassName = "";
      if (isVideo(node)) {
        node = node.replace("<iframe", '<iframe class="video-iframe"');
        wrapperClassName = "video-container";
      } else if (isFacebookPost("https://www.facebook.com/plugins/post")) {
        node = node.replace("<iframe", '<iframe class="facebook-post-iframe"');
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

export const PostPage = ({ post, tags }: PostPageProps) => {
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
