import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";

export interface ContentfulImage {
  url: string;
  width: number;
  height: number;
}

export interface Tag {
  name: string;
  slug: string;
  isMain: boolean;
}

export interface TagWithPosts extends Tag {
  linkedFrom: {
    posts: {
      total: number;
      items: Post[];
    };
  };
}

export interface Post {
  title: string;
  slug: string;
  lead: string;
  publishedDate: string;
  mainImage: ContentfulImage;
  tags: {
    items: Tag[];
  };
}

export interface PostWithContent extends Post {
  content: PostContent;
}

export interface PostContent {
  json: {
    content: TopLevelBlock[];
    data: {};
    nodeType: BLOCKS.DOCUMENT;
  };
  links: {
    assets: {
      block: EmbeddedAsset[];
    };
  };
}

export interface EmbeddedAsset {
  description: string;
  height: number;
  width: number;
  url: string;
  sys: {
    id: string;
  };
}
