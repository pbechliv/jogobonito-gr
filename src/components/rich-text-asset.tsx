import { EmbeddedAsset } from "@jogo/definitions";
import NextImage from "next/image";

interface RichTextAssetProps {
  id: string;
  assets: EmbeddedAsset[];
}

export const RichTextAsset = ({ id, assets }: RichTextAssetProps) => {
  const asset = assets.find((asset) => asset.sys.id === id);
  if (asset?.url) {
    return (
      <p className="max-w-full max-h-full">
        <NextImage
          src={asset.url}
          width={asset.width}
          height={asset.height}
          alt={asset.description}
        />
      </p>
    );
  }

  return null;
};
