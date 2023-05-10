import { Tag } from "@jogo/definitions";
import Link from "next/link";

interface CategoriesProps {
  tags: Tag[];
}

export const Categories = ({ tags }: CategoriesProps) => {
  return (
    <div className="text-center h-full p-4">
      <ul className="h-full overflow-y-scroll">
        {tags.map((tag) => (
          <li key={tag.slug} className="p-2 border-b-2 border-yellow-200">
            <Link href={`/tag/${tag.slug}/1`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
