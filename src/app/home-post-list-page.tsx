"use client";

import Layout from "@jogo/components/layout";
import Posts from "@jogo/components/posts";
import Pagination from "@jogo/components/pagination";

const HomePostListPage = ({ posts, totalPosts, tags }: any) => {
  return (
    <Layout tags={tags}>
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
    </Layout>
  );
};

export default HomePostListPage;
