import React from "react";
import Link from "next/link";
import NextImage from "./image";

const Card = ({ post }: any) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="group cursor-pointer p-4">
        <div className="relative aspect-video">
          <NextImage
            className="object-cover transition-all rounded-md group-hover:scale-105"
            image={post.mainImage}
          />
        </div>
        <div>
          <div className="flex gap-x-3 flex-wrap mt-2">
            {post.tags.items.map((tag: any) => (
              <span
                className="text-blue-500 text-sm"
                key={`${post.slug}__${tag.name}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight">
            <span
              className="
                bg-gradient-to-r
              from-yellow-200 
              to-yellow-100 
                bg-[length:0px_10px] 
                bg-left-bottom 
                bg-no-repeat 
                duration-500
                group-hover:bg-[length:100%_10px]
                "
            >
              {post.title}
            </span>
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
