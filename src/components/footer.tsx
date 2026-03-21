import { SocialLinks } from "./social-links";

export const Footer = () => {
  return (
    <div className="w-full flex h-16 bg-secondary justify-center items-center">
      <SocialLinks className="flex gap-6" />
    </div>
  );
};
