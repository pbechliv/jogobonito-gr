import { Tag } from "@jogo/definitions";
import { sortAndPartitionTags } from "@jogo/lib/sort-tags";
import Link from "next/link";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

interface FooterProps {
  tags: Tag[];
}

export const Footer = (props: FooterProps) => {
  const { mainTags } = sortAndPartitionTags(props.tags);

  return (
    <footer className="mt-12">
      <div className="h-1 bg-linear-to-r from-primary to-secondary" />
      <div className="bg-muted dark:bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 text-center md:grid md:grid-cols-3 md:items-start md:gap-8 md:text-left">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link href="/" aria-label="Αρχική σελίδα">
              <Logo className="h-6 w-auto text-foreground" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Το όμορφο παιχνίδι, μέσα και έξω από τους αγωνιστικούς χώρους.
            </p>
          </div>

          <nav
            aria-label="Κατηγορίες"
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start"
          >
            {mainTags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}/1`}
                className="text-sm hover:text-secondary hover:underline decoration-primary decoration-2 underline-offset-4"
              >
                {tag.name}
              </Link>
            ))}
          </nav>

          <SocialLinks className="flex justify-center gap-6 md:justify-end" />
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} jogobonito.gr
        </div>
      </div>
    </footer>
  );
};
