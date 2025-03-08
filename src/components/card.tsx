import { Post } from "@jogo/definitions";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  post: Post;
}

export const Card = ({ post }: CardProps) => {
  return (
    <div className="p-4 max-w-4xl ">
      <Link href={`/post/${post.slug}`}>
        <Image
          className="transition-all object-cover aspect-video rounded-md hover:scale-105"
          src={post.mainImage.url}
          priority
          width={864}
          height={486}
          alt=""
        />
      </Link>
      <div className="flex justify-between mt-3">
        <div className="flex gap-1 flex-wrap">
          {post.tags.items.map((tag) => (
            <Link
              href={`/tag/${tag.slug}/1`}
              className="text-slate-700 text-xs border-2 border-yellow-200 rounded-xl p-1 hover:scale-105 hover:bg-yellow-100"
              key={`${post.slug}__${tag.name}`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
        <div className="text-xs text-slate-500">
          {<span>{format(new Date(post.publishedDate), "dd/MM/yyyy")}</span>}
        </div>
      </div>

      <Link href={`/post/${post.slug}`} className="group">
        <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2">
          <span
            className="
                bg-linear-to-r
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
