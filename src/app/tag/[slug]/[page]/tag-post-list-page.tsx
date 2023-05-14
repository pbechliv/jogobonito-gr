import { Layout } from "@jogo/components/layout";
import { Pagination } from "@jogo/components/pagination";
import { Posts } from "@jogo/components/posts";
import { Tag, TagWithPosts } from "@jogo/definitions";
import { PageParamEnum } from "@jogo/lib/page-param.enum";

interface TagListPageProps {
  tag: TagWithPosts;
  tags: Tag[];
}

export const TagPostListPage = ({ tag, tags }: TagListPageProps) => {
  return (
    <Layout tags={tags}>
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-yellow-200">
        {tag.name}
      </h1>
      <Posts posts={tag.linkedFrom.posts.items} />
      <Pagination
        totalPosts={tag.linkedFrom.posts.total}
        pageParam={PageParamEnum.TAG}
      />
    </Layout>
  );
};
