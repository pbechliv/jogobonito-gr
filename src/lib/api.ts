export async function getManyPosts(page: number = 0, limit: number = 9) {
  const skip = page * limit;
  const entries = await fetchGraphQL(
    `query {
      pageBlogPostCollection(order: publishedDate_DESC, skip: ${skip}, limit: ${limit}) {
        items {
          title
          slug
          lead
          mainImage {
            url
            width
            height
          }
          publishedDate
          tags: tagsCollection(limit: 5) {
            items {
              name
            }
          }
        }
      }
    }`
  );

  return extractPostEntries(entries);
}

export async function getPostPaths() {
  const entries = await fetchGraphQL(
    `query {
      pageBlogPostCollection {
        items {
          slug
        }
      }
    }`
  );
  return extractPostEntriesSlugs(entries);
}

export async function getTagPaths() {
  const entries = await fetchGraphQL(
    `query {
      tagsCollection {
        items {
          slug
        }
      }
    }`
  );

  return extractTagEntriesSlugs(entries);
}

export async function getOneTag(slug: string) {
  const entries = await fetchGraphQL(
    `query {
      tagsCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          name
          linkedFrom {
            pageBlogPostCollection {
              total
              items {
                title
                slug
                lead
                mainImage {
                  url
                  width
                  height
                }
                publishedDate
                tags: tagsCollection(limit: 5) {
                  items {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`
  );
  console.log(JSON.stringify(entries));

  return extractTagEntry(entries);
}

export async function getOnePost(slug: string) {
  const entries = await fetchGraphQL(
    `query {
      pageBlogPostCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          title
          slug
          lead
          mainImage {
            url
            width
            height
          }
          publishedDate
          tags: tagsCollection(limit: 5) {
            items {
              name
            }
          }
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                  width
                  height
                }
              }
            }
          }
        }
      }
    }`
  );
  return extractPostEntry(entries);
}

async function fetchGraphQL(query: any, preview = false) {
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
    }
  ).then((response) => response.json());
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.pageBlogPostCollection?.items;
}

function extractPostEntry(fetchResponse: any) {
  return fetchResponse?.data?.pageBlogPostCollection?.items[0];
}

function extractPostEntriesSlugs(fetchResponse: any) {
  return fetchResponse?.data?.pageBlogPostCollection?.items.map(
    (item: any) => item.slug
  );
}

function extractTagEntry(fetchResponse: any) {
  const tag = fetchResponse?.data?.tagsCollection?.items[0];
  tag.posts = tag.linkedFrom.pageBlogPostCollection.items;
  return tag;
}

function extractTagEntriesSlugs(fetchResponse: any) {
  return fetchResponse?.data?.tagsCollection?.items.map(
    (item: any) => item.slug
  );
}
