import { Post } from "@jogo/definitions";
import NextImage from "next/image";
import Link from "next/link";

interface CardProps {
  post: Post;
}

export const Card = ({ post }: CardProps) => {
  return (
    <div className="p-4">
      <Link href={`/post/${post.slug}`}>
        <div className="relative aspect-video">
          <NextImage
            className="object-cover transition-all rounded-md hover:scale-105"
            src={post.mainImage.url}
            fill
            alt=""
          />
        </div>
      </Link>
      <div className="flex gap-1 flex-wrap mt-4">
        {post.tags.items.map((tag) => (
          <Link
            href={`/tag/${tag.slug}/1`}
            className="text-slate-700 text-xs border-2 border-yellow-200 rounded-xl p-1 hover:scale-105 hover:bg-yellow-200 hover:border-slate-700"
            key={`${post.slug}__${tag.name}`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <Link href={`/post/${post.slug}`} className="group">
        <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2">
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
      </Link>
    </div>
  );
};
