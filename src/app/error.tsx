"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="font-display text-2xl font-extrabold tracking-tight">
        Κάτι πήγε στραβά
      </h2>
      <p className="text-muted-foreground">
        Παρουσιάστηκε ένα σφάλμα. Δοκιμάστε ξανά.
      </p>
      <button
        onClick={reset}
        className="cursor-pointer rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground transition-colors hover:bg-primary/80"
      >
        Δοκιμάστε ξανά
      </button>
    </div>
  );
}
