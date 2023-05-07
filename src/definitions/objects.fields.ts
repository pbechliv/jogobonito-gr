export const PostFields = `
    title
    slug
    lead
    mainImage {
        url
        width
        height
    }
    publishedDate
    tags: tagCollection {
        items {
            name
            slug
        }
    }`;

export const TagFields = `
    name
    slug
`;

export const PostWithContentFields = `
    ${PostFields}
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
`;
