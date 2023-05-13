import Layout from "@jogo/components/layout";
import Pagination from "@jogo/components/pagination";
import Posts from "@jogo/components/posts";
import { Post, Tag } from "@jogo/definitions";

interface PostListPageProps {
  posts: Post[];
  totalPosts: number;
  tags: Tag[];
}

const PostListPage = ({ posts, totalPosts, tags }: PostListPageProps) => {
  return (
    <Layout tags={tags}>
      <Posts posts={posts} />
      <Pagination totalPosts={totalPosts} />
    </Layout>
  );
};

export default PostListPage;
