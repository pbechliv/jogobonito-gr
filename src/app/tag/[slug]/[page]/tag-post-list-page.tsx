"use client";

import Layout from "@jogo/components/layout";
import Pagination from "@jogo/components/pagination";
import Posts from "@jogo/components/posts";
import { Tag, TagWithPosts } from "@jogo/definitions";

interface TagListPageProps {
  tag: TagWithPosts;
  tags: Tag[];
}

const TagPostListPage = ({ tag, tags }: TagListPageProps) => {
  return (
    <Layout tags={tags}>
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-yellow-200">
        {tag.name}
      </h1>
      <Posts posts={tag.linkedFrom.posts.items} />
      <Pagination totalPosts={tag.linkedFrom.posts.total} />
    </Layout>
  );
};

export default TagPostListPage;
