import { Metadata } from "next";
import { BASE_URL } from "./base-url";

const DEFAULT_TITLE = "jogobonito.gr";
const DEFAULT_DESCRIPTION =
  "Jogo Bonito σημαίνει «όμορφο παιχνίδι». Σελίδα αφιερωμένη στο ποδόσφαιρο, στο μπάσκετ και στα άλλα σπορ, μέσα και έξω από τους αγωνιστικούς χώρους.";

interface SeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isArticle?: boolean;
  url?: string;
}

export const generateHeaderMetadata = (props: SeoProps) => {
  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: props.title ?? DEFAULT_TITLE,
    description: props.description ?? DEFAULT_DESCRIPTION,
    applicationName: "jogobonito.gr",
    authors: [
      {
        name: "Νεκτάριος Δαργάκης",
        url: "https://gr.linkedin.com/in/nectarios-dargakis-b15876171",
      },
      {
        name: "Bechlivanos Panagiotis",
        url: "https://www.linkedin.com/in/panagiotis-bechlivanos-b197b3a4/",
      },
    ],
    creator: "Νεκτάριος Δαργάκης",
    publisher: "Νεκτάριος Δαργάκης",
    openGraph: {
      siteName: "jogobonito.gr",
      locale: "el_GR",
      url: `/${props.url ?? ""}`,
      type: props.isArticle ? "article" : "website",
      title: props.title ?? DEFAULT_TITLE,
      description: props.description ?? DEFAULT_DESCRIPTION,
      // No fallback image: the root opengraph-image.tsx is the default
      ...(props.imageUrl && { images: [props.imageUrl] }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@Nec_Darg",
      creator: "@Nec_Darg",
      ...(props.imageUrl && { images: [props.imageUrl] }),
      description: props.description ?? DEFAULT_DESCRIPTION,
      title: props.title ?? DEFAULT_TITLE,
    },
  };
  return metadata;
};
