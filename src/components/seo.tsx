import { HOSTNAME } from "@jogo/lib/definitions";
import Head from "next/head";

const DEFAULT_TITLE = "jogobonito.gr";
const DEFAULT_DESCRIPTION =
  "Jogo Bonito σημαίνει «όμορφο παιχνίδι». Σελίδα αφιερωμένη στο ποδόσφαιρο, στο μπάσκετ και στα άλλα σπορ, μέσα και έξω από τους αγωνιστικούς χώρους.";
const DEFAULT_IMAGE_URL =
  "https://images.ctfassets.net/l9r5j1d42eo7/1XuR7HAX4knEU8Eft597wy/f64b2e84aa1b5592dfe0406a722495fa/socrates.jpeg";

interface SeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isArticle?: boolean;
  url?: string;
}

export const Seo = (props: SeoProps) => {
  const fullSeo = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    imageUrl: DEFAULT_IMAGE_URL,
    url: HOSTNAME,
    isPost: false,
    ...props,
  };

  return (
    <Head>
      <meta property="og:site_name" content="jogobonito.gr" />
      <meta property="og:locale" content="el_GR" />
      <meta property="og:url" content={fullSeo.url} />
      <meta
        property="og:type"
        content={fullSeo.isArticle ? "article" : "website"}
      />

      {fullSeo.title && (
        <>
          <title>{fullSeo.title}</title>
          <meta property="og:title" content={fullSeo.title} />
          <meta name="twitter:title" content={fullSeo.title} />
        </>
      )}
      {fullSeo.description && (
        <>
          <meta name="description" content={fullSeo.description} />
          <meta property="og:description" content={fullSeo.description} />
          <meta name="twitter:description" content={fullSeo.description} />
        </>
      )}
      {fullSeo.imageUrl && (
        <>
          <meta property="og:image" content={fullSeo.imageUrl} />
          <meta name="twitter:image" content={fullSeo.imageUrl} />
          <meta name="image" content={fullSeo.imageUrl} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
