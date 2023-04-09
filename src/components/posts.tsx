import React from "react";
import Card from "./card";

const Posts = ({ posts }: any) => {
  const firsRowPosts = posts.slice(0, 1);
  const restPosts = posts.slice(2, posts.length);

  return (
    <div>
      <div className="grid gap-10 md:grid-cols-1">
        {firsRowPosts.map((post: any) => {
          return <Card post={post} key={post.attributes.slug} />;
        })}
      </div>
      <div className="grid gap-10 md:grid-cols-2 mt-10">
        {restPosts.map((post: any) => {
          return <Card post={post} key={post.attributes.slug} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
