import { EmbeddedAsset } from "@jogo/definitions";
import Image from "next/image";

interface RichTextAssetProps {
  id: string;
  assets: EmbeddedAsset[];
}

export const RichTextAsset = (props: RichTextAssetProps) => {
  const asset = props.assets.find((asset) => asset.sys.id === props.id);
  if (asset?.url) {
    return (
      <p className="max-w-full max-h-full">
        <Image
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
