"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const buttonClassName =
  "flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted";

export const ShareButtons = (props: ShareButtonsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(props.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`flex items-center gap-2 ${props.className ?? ""}`}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Κοινοποίηση στο Facebook"
        className={buttonClassName}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Κοινοποίηση στο X"
        className={buttonClassName}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Αντιγραφή συνδέσμου"
        className={`${buttonClassName} cursor-pointer`}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-secondary" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
      {isCopied && (
        <span className="text-xs text-muted-foreground">Αντιγράφηκε!</span>
      )}
    </div>
  );
};
