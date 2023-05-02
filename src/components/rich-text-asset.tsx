import Image from "next/image";

export default function RichTextAsset({ id, assets }: any) {
  const asset = assets?.find((asset: any) => asset.sys.id === id);
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
}
