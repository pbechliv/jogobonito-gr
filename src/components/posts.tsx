import { Post } from "@jogo/definitions";
import { Card } from "./card";

interface PostsProps {
  posts: Post[];
}

export const Posts = (props: PostsProps) => {
  return (
    <div className="w-full">
      {props.posts.map((post, index) => {
        return <Card post={post} index={index} key={post.slug} />;
      })}
    </div>
  );
};
