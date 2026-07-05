interface TagChipProps {
  name: string;
  variant?: "primary" | "muted" | "overlay";
  className?: string;
}

const VARIANT_CLASSES = {
  primary: "bg-primary text-primary-foreground",
  muted: "bg-muted text-muted-foreground",
  // for chips sitting on the hero image scrim
  overlay: "bg-white/20 text-white backdrop-blur-sm",
};

export const TagChip = (props: TagChipProps) => (
  <span
    className={`${VARIANT_CLASSES[props.variant ?? "primary"]} text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${props.className ?? ""}`}
  >
    {props.name}
  </span>
);
