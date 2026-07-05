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
      <div className="flex flex-col gap-10">
        <header className="border-b-4 border-primary py-6 md:py-10">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
            {props.tag.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {props.tag.linkedFrom.posts.total} άρθρα
          </p>
        </header>
        <Posts posts={props.tag.linkedFrom.posts.items} />
        <Pagination
          totalPosts={props.tag.linkedFrom.posts.total}
          pageParam={PageParamEnum.TAG}
        />
      </div>
    </Layout>
  );
};
