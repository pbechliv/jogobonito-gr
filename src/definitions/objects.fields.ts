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
            isMain
        }
    }`;

export const TagFields = `
    name
    slug
    isMain
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
