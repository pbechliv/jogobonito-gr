import { Layout } from "@jogo/components/layout";
import { Pagination } from "@jogo/components/pagination";
import { Posts } from "@jogo/components/posts";
import { Post, Tag } from "@jogo/definitions";
import { PageParamEnum } from "@jogo/lib/page-param.enum";

interface HomePostListPageProps {
  posts: Post[];
  totalPosts: number;
  tags: Tag[];
}

export const HomePostListPage = ({
  posts,
  totalPosts,
  tags,
}: HomePostListPageProps) => {
  return (
    <Layout tags={tags}>
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} pageParam={PageParamEnum.PAGE} />
    </Layout>
  );
};
