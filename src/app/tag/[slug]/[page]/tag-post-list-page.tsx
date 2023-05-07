"use client";

import { HOSTNAME } from "@jogo/lib/definitions";
import Pagination from "@jogo/components/pagination";
import { usePathname } from "next/navigation";
import Layout from "@jogo/components/layout";
import Posts from "@jogo/components/posts";

const TagPostListPage = ({ tag, tags }: any) => {
  const pathname = usePathname();
  const url = HOSTNAME + pathname;

  return (
    <Layout tags={tags}>
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-yellow-200">
        {tag.name}
      </h1>
      <Posts posts={tag.posts} />
      <Pagination totalPosts={tag.totalPosts} />
    </Layout>
  );
};

export default TagPostListPage;
