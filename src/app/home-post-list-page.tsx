import { HeroCard } from "@jogo/components/hero-card";
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

export const HomePostListPage = (props: HomePostListPageProps) => {
  return (
    <Layout tags={props.tags}>
      <div className="flex flex-col gap-10">
        {props.posts.length > 0 && <HeroCard post={props.posts[0]} />}
        <Posts posts={props.posts.slice(1)} hasHeroAbove />
        <Pagination
          totalPosts={props.totalPosts}
          pageParam={PageParamEnum.PAGE}
        />
      </div>
    </Layout>
  );
};
