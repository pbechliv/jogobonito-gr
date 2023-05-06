import Link from "next/link";

export const Categories = ({ tags }: any) => {
  return (
    <div className="pt-4 prose prose-sm max-md:hidden">
      <h2 className="m-0">Κατηγορίες</h2>
      <ul>
        {tags.map((tag: any) => (
          <li key={tag.slug}>
            <Link href={`/tag/${tag.slug}/1`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
