import Head from "next/head"
import { getStrapiMedia } from "../lib/media"

const Seo = ({ seo }: any) => {
  const fullSeo = {
    ...seo,
    // Add title suffix
    metaTitle: `Jogo Bonito | jogobonito.gr`,
    // Get full image URL
    shareImage: getStrapiMedia(seo?.shareImage || {data: {attributes: {url: "socrates.jpeg"}}}),
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.post && <meta property="og:type" content="post" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo
