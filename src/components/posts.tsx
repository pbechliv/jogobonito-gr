import { Post } from "@jogo/definitions";
import { Card } from "./card";

interface PostsProps {
  posts: Post[];
  hasHeroAbove?: boolean;
}

export const Posts = (props: PostsProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {props.posts.map((post, index) => (
        <Card
          post={post}
          priority={index === 0 && !props.hasHeroAbove}
          key={post.slug}
        />
      ))}
    </div>
  );
};
