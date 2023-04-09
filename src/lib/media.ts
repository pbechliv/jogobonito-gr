import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  return url;
}
