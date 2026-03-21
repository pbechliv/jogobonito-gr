import { Post } from "@jogo/definitions";
import { Card } from "./card";

interface PostsProps {
  posts: Post[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="w-full">
      {posts.map((post, index) => {
        return <Card post={post} index={index} key={post.slug} />;
      })}
    </div>
  );
};
