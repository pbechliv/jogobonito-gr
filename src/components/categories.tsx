import { Tag } from "@jogo/definitions";
import Link from "next/link";

interface CategoriesProps {
  tags: Tag[];
}

export const Categories = (props: CategoriesProps) => {
  return (
    <div className="text-center">
      <ul>
        {props.tags.map((tag) => (
          <li key={tag.slug} className="p-2 border-b-2 border-primary">
            <Link href={`/tag/${tag.slug}/1`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
