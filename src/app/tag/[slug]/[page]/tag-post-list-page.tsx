import { Layout } from "@jogo/components/layout";
import { Pagination } from "@jogo/components/pagination";
import { Posts } from "@jogo/components/posts";
import { Tag, TagWithPosts } from "@jogo/definitions";
import { PageParamEnum } from "@jogo/lib/page-param.enum";

interface TagListPageProps {
  tag: TagWithPosts;
  tags: Tag[];
}

export const TagPostListPage = (props: TagListPageProps) => {
  return (
    <Layout tags={props.tags}>
      <h1 className="text-2xl font-semibold text-center p-4 underline decoration-primary">
        {props.tag.name}
      </h1>
      <Posts posts={props.tag.linkedFrom.posts.items} />
      <Pagination
        totalPosts={props.tag.linkedFrom.posts.total}
        pageParam={PageParamEnum.TAG}
      />
    </Layout>
  );
};
