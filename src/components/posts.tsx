"use client";

import { Post } from "@jogo/definitions";
import Card from "./card";

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div>
      <div className="grid gap-10">
        {posts.map((post) => {
          return <Card post={post} key={post.slug} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
