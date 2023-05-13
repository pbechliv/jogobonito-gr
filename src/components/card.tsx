"use client";

import { Post } from "@jogo/definitions";
import NextImage from "next/image";
import Link from "next/link";

interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="group cursor-pointer p-4">
        <div className="relative aspect-video">
          <NextImage
            className="object-cover transition-all rounded-md group-hover:scale-105"
            src={post.mainImage.url}
            fill
            alt=""
          />
        </div>
        <div>
          <div className="flex gap-1 flex-wrap mt-4">
            {post.tags.items.map((tag) => (
              <span
                className="text-slate-700 text-xs border-2 border-yellow-200 rounded-xl p-1"
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
          <span className="text-sm text-slate-700">{post.lead}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
