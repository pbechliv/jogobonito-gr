import { getStrapiMedia } from "../lib/media";
import NextImage from "next/image";

const Image = ({ image, className }: any) => {
  const { alternativeText } = image.data.attributes;

  return (
    <NextImage
      className={className}
      fill
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  );
};

export default Image;
