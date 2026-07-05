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
import { RelatedPosts } from "@jogo/components/related-posts";
import { RichTextAsset } from "@jogo/components/rich-text-asset";
import { ShareButtons } from "@jogo/components/share-buttons";
import { TagChip } from "@jogo/components/tag-chip";
import { Post, PostContent, PostWithContent, Tag } from "@jogo/definitions";
import { BASE_URL } from "@jogo/lib/base-url";
import {
  formatReadingTime,
  getReadingTimeMinutes,
} from "@jogo/lib/reading-time";
import { format } from "date-fns";
import Image from "next/image";
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
        <a href={node.data.uri} target={"_blank"} rel="noopener noreferrer">
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
      } else if (isFacebookPost(node)) {
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
  relatedPosts: Post[];
}

export const PostPage = (props: PostPageProps) => {
  const tag =
    props.post.tags.items.find((item) => item.isMain) ?? props.post.tags.items[0];
  const postUrl = `${BASE_URL}/post/${props.post.slug}`;
  const readingTime = formatReadingTime(
    getReadingTimeMinutes(props.post.content.json, props.post.lead)
  );

  return (
    <Layout tags={props.tags}>
      <article className="flex flex-col gap-6">
        <header className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {tag && <TagChip name={tag.name} className="self-start" />}
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {props.post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-sm text-muted-foreground">
            <Image
              priority
              className="rounded-full"
              src="/nectarios.jpeg"
              width={40}
              height={40}
              alt="Νεκτάριος Δαργάκης"
            />
            <span>Νεκτάριος Δαργάκης</span>
            <span aria-hidden>·</span>
            <span>
              {format(new Date(props.post.publishedDate), "dd/MM/yyyy")}
            </span>
            <span aria-hidden>·</span>
            <span>{readingTime}</span>
            <ShareButtons
              className="ml-auto"
              url={postUrl}
              title={props.post.title}
            />
          </div>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            fill
            priority
            sizes="(min-width: 1152px) 1120px, 100vw"
            className="object-cover"
            src={props.post.mainImage.url}
            alt={props.post.title}
          />
        </div>

        <p className="mx-auto w-full max-w-3xl border-l-4 border-primary pl-4 text-lg font-medium text-muted-foreground md:text-xl">
          {props.post.lead}
        </p>

        <div className="mx-auto w-full max-w-3xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {documentToReactComponents(
              props.post.content.json,
              customMarkdownOptions(props.post.content)
            )}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Κοινοποίηση:
            </span>
            <ShareButtons url={postUrl} title={props.post.title} />
          </div>
        </div>

        <RelatedPosts posts={props.relatedPosts} />
      </article>
    </Layout>
  );
};
