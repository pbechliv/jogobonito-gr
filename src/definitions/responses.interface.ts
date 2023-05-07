import { Post, PostWithContent, Tag, TagWithPosts } from "./objects.interface";

export interface GetManyPostsResponse {
  data: {
    postCollection: {
      total: number;
      items: Post[];
    };
  };
}

export interface GetPostPathsResponse {
  data: {
    postCollection: {
      items: Pick<Post, "slug">[];
    };
  };
}

export interface GetManyTagsResponse {
  data: {
    tagCollection: {
      total: number;
      items: Tag[];
    };
  };
}

export interface GetTagPathsResponse {
  data: {
    tagCollection: {
      total: number;
      items: Pick<Tag, "slug">[];
    };
  };
}

export interface GetOneTagResponse {
  data: {
    tagCollection: {
      items: TagWithPosts[];
    };
  };
}

export interface GetOnePostResponse {
  data: {
    postCollection: {
      items: PostWithContent[];
    };
  };
}
