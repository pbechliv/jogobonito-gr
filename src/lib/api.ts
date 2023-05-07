import {
  GetManyPostsResponse,
  GetManyTagsResponse,
  GetOnePostResponse,
  GetOneTagResponse,
  GetPostPathsResponse,
  GetTagPathsResponse,
  PostFields,
  PostWithContent,
  PostWithContentFields,
  TagFields,
  TagWithPosts,
} from "@jogo/definitions";

export async function getManyPosts(page: number = 0, limit: number = 10) {
  const skip = page * limit;
  const entries: GetManyPostsResponse = await fetchGraphQL(
    `query {
      postCollection(order: publishedDate_DESC, skip: ${skip}, limit: ${limit}) {
        total
        items {
          ${PostFields}
        }
      }
    }`
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
    `query {
      tagCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${TagFields}
          linkedFrom {
            posts: postCollection(skip: ${skip}, limit: ${limit}) {
              total
              items {
                ${PostFields}
              }
            }
          }
        }
      }
    }`
  );

  return entries.data.tagCollection.items[0];
}

export async function getOnePost(
  slug: string
): Promise<PostWithContent | undefined> {
  const entries: GetOnePostResponse = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${PostWithContentFields}
        }
      }
    }`
  );
  return entries.data.postCollection.items[0];
}

async function fetchGraphQL(query: string, preview = false) {
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
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    }
  ).then((response) => response.json());
}
