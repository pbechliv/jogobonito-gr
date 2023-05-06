import React from "react";
import Card from "./card";

const Posts = ({ posts }: any) => {
  return (
    <div>
      <div className="grid gap-10 md:grid-cols-1">
        {posts.map((post: any) => {
          return <Card post={post} key={post.slug} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
