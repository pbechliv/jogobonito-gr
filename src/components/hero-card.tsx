import { Post } from "@jogo/definitions";
import { sortTagsMainFirst } from "@jogo/lib/sort-tags";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { TagChip } from "./tag-chip";

interface HeroCardProps {
  post: Post;
}

export const HeroCard = (props: HeroCardProps) => {
  const tags = sortTagsMainFirst(props.post.tags.items);

  return (
    <Link href={`/post/${props.post.slug}`} className="group block">
      <article className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-video">
        <Image
          fill
          priority
          sizes="(min-width: 1152px) 1120px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={props.post.mainImage.url}
          alt={props.post.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 md:gap-3 md:p-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <TagChip
                key={tag.slug}
                name={tag.name}
                variant={index === 0 ? "primary" : "overlay"}
              />
            ))}
          </div>
          <h2 className="font-display text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-3xl md:max-w-3xl md:text-4xl lg:text-5xl">
            {props.post.title}
          </h2>
          <p className="hidden text-white/80 md:line-clamp-2 md:max-w-2xl">
            {props.post.lead}
          </p>
          <span className="text-xs text-white/70">
            {format(new Date(props.post.publishedDate), "dd/MM/yyyy")}
          </span>
        </div>
      </article>
    </Link>
  );
};
