import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "jogobonito.gr",
    short_name: "Jogo Bonito",
    description:
      "Jogo Bonito σημαίνει «όμορφο παιχνίδι». Σελίδα αφιερωμένη στο ποδόσφαιρο, στο μπάσκετ και στα άλλα σπορ, μέσα και έξω από τους αγωνιστικούς χώρους.",
    lang: "el",
    start_url: "/",
    display: "standalone",
    theme_color: "#EFC004",
    background_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
