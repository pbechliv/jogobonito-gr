import { Post } from "@jogo/definitions";
import { Card } from "./card";

interface RelatedPostsProps {
  posts: Post[];
}

export const RelatedPosts = (props: RelatedPostsProps) => {
  if (props.posts.length === 0) return null;

  return (
    <section className="mt-6 border-t border-border pt-8">
      <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight">
        Σχετικά άρθρα
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
        {props.posts.map((post) => (
          <Card post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
};
