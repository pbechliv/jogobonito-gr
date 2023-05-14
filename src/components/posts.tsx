import { Post } from "@jogo/definitions";
import { Card } from "./card";

interface PostsProps {
  posts: Post[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="w-full">
      {posts.map((post) => {
        return <Card post={post} key={post.slug} />;
      })}
    </div>
  );
};
