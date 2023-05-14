import { Metadata } from "next";

const DEFAULT_TITLE = "jogobonito.gr";
const DEFAULT_DESCRIPTION =
  "Jogo Bonito σημαίνει «όμορφο παιχνίδι». Σελίδα αφιερωμένη στο ποδόσφαιρο, στο μπάσκετ και στα άλλα σπορ, μέσα και έξω από τους αγωνιστικούς χώρους.";
const DEFAULT_IMAGE_URL =
  "https://images.ctfassets.net/l9r5j1d42eo7/1XuR7HAX4knEU8Eft597wy/f64b2e84aa1b5592dfe0406a722495fa/socrates.jpeg";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://jogobonito.gr";

interface SeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isArticle?: boolean;
  url?: string;
}

export const generateHeaderMetadata = (props: SeoProps) => {
  console.log(props.url);
  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: props.title ?? DEFAULT_TITLE,
    description: props.description ?? DEFAULT_DESCRIPTION,
    applicationName: "jogobonito.gr",
    icons: ["/icon.png"],
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
      images: [props.imageUrl ?? DEFAULT_IMAGE_URL],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Nec_Darg",
      creator: "@Nec_Darg",
      images: [props.imageUrl ?? DEFAULT_IMAGE_URL],
      description: props.description ?? DEFAULT_DESCRIPTION,
      title: props.title ?? DEFAULT_TITLE,
    },
  };
  return metadata;
};
