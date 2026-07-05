import { Post } from "@jogo/definitions";
import { sortTagsMainFirst } from "@jogo/lib/sort-tags";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { TagChip } from "./tag-chip";

interface CardProps {
  post: Post;
  priority?: boolean;
}

export const Card = (props: CardProps) => {
  const tags = sortTagsMainFirst(props.post.tags.items);

  return (
    <Link href={`/post/${props.post.slug}`} className="group block">
      <article className="flex flex-col gap-3">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={props.post.mainImage.url}
            priority={props.priority}
            alt={props.post.title}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <TagChip
              key={tag.slug}
              name={tag.name}
              variant={index === 0 ? "primary" : "muted"}
            />
          ))}
          <span className="text-xs text-muted-foreground">
            {format(new Date(props.post.publishedDate), "dd/MM/yyyy")}
          </span>
        </div>
        <h2 className="font-display text-lg font-bold leading-snug tracking-tight md:text-xl">
          <span className="headline-underline">{props.post.title}</span>
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {props.post.lead}
        </p>
      </article>
    </Link>
  );
};
