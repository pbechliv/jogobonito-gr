import NextImage from "next/image";

const Image = ({ image, className }: any) => {
  return <NextImage className={className} fill src={image.url} alt="" />;
};

export default Image;
