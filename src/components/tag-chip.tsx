interface TagChipProps {
  name: string;
  className?: string;
}

export const TagChip = (props: TagChipProps) => (
  <span
    className={`bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${props.className ?? ""}`}
  >
    {props.name}
  </span>
);
