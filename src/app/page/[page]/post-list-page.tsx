import { Layout } from "@jogo/components/layout";
import { Pagination } from "@jogo/components/pagination";
import { Posts } from "@jogo/components/posts";
import { Post, Tag } from "@jogo/definitions";
import { PageParamEnum } from "@jogo/lib/page-param.enum";

interface PostListPageProps {
  posts: Post[];
  totalPosts: number;
  tags: Tag[];
}

export const PostListPage = (props: PostListPageProps) => {
  return (
    <Layout tags={props.tags}>
      <Posts posts={props.posts} />
      <Pagination totalPosts={props.totalPosts} pageParam={PageParamEnum.PAGE} />
    </Layout>
  );
};
