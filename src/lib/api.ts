import {
  GetManyPostsResponse,
  GetManyTagsResponse,
  GetOnePostResponse,
  GetOneTagResponse,
  GetPostPathsResponse,
  GetRelatedPostsResponse,
  GetTagPathsResponse,
  Post,
  PostFields,
  PostWithContent,
  PostWithContentFields,
  TagFields,
  TagWithPosts,
} from "@jogo/definitions";

export async function getManyPosts(page: number = 0, limit: number = 10) {
  const skip = page * limit;
  const entries: GetManyPostsResponse = await fetchGraphQL(
    `query GetManyPosts($skip: Int!, $limit: Int!) {
      postCollection(order: publishedDate_DESC, skip: $skip, limit: $limit) {
        total
        items {
          ${PostFields}
        }
      }
    }`,
    { skip, limit }
  );

  return entries.data.postCollection;
}

export async function getManyTags() {
  const entries: GetManyTagsResponse = await fetchGraphQL(
    `query {
      tagCollection(order: name_ASC) {
        total
        items {
          ${TagFields}
        }
      }
    }`
  );

  return entries.data.tagCollection;
}

export async function getPostPaths() {
  const entries: GetPostPathsResponse = await fetchGraphQL(
    `query {
      postCollection {
        items {
          slug
        }
      }
    }`
  );
  return entries.data.postCollection.items.map((post) => post.slug);
}

export async function getTagPaths() {
  const entries: GetTagPathsResponse = await fetchGraphQL(
    `query {
      tagCollection {
        items {
          slug
        }
      }
    }`
  );

  return entries.data.tagCollection.items.map((tag) => tag.slug);
}

export async function getOneTag(
  slug: string,
  page: number = 0,
  limit: number = 10
): Promise<TagWithPosts | undefined> {
  const skip = page * limit;
  const entries: GetOneTagResponse = await fetchGraphQL(
    `query GetOneTag($slug: String!, $skip: Int!, $limit: Int!) {
      tagCollection(where: { slug: $slug }, limit: 1) {
        items {
          ${TagFields}
          linkedFrom {
            posts: postCollection(skip: $skip, limit: $limit, order: publishedDate_DESC) {
              total
              items {
                ${PostFields}
              }
            }
          }
        }
      }
    }`,
    { slug, skip, limit }
  );

  return entries.data.tagCollection.items[0];
}

export async function getOnePost(
  slug: string
): Promise<PostWithContent | undefined> {
  const entries: GetOnePostResponse = await fetchGraphQL(
    `query GetOnePost($slug: String!) {
      postCollection(where: { slug: $slug }, limit: 1) {
        items {
          ${PostWithContentFields}
        }
      }
    }`,
    { slug }
  );
  return entries.data.postCollection.items[0];
}

export async function getRelatedPosts(
  tagSlug: string,
  excludeSlug: string,
  limit: number = 3
): Promise<Post[]> {
  const entries: GetRelatedPostsResponse = await fetchGraphQL(
    `query GetRelatedPosts($tagSlug: String!, $limit: Int!) {
      tagCollection(where: { slug: $tagSlug }, limit: 1) {
        items {
          linkedFrom {
            posts: postCollection(order: publishedDate_DESC, limit: $limit) {
              items {
                ${PostFields}
              }
            }
          }
        }
      }
    }`,
    // linkedFrom collections don't support "where" — overfetch and filter
    { tagSlug, limit: limit + 1 }
  );

  const items = entries.data.tagCollection.items[0]?.linkedFrom.posts.items ?? [];
  return items.filter((post) => post.slug !== excludeSlug).slice(0, limit);
}

async function fetchGraphQL(
  query: string,
  variables?: Record<string, unknown>,
  preview = false
) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    }
  ).then((response) => response.json());
}
