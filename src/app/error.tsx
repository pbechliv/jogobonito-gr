"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-semibold">Κάτι πήγε στραβά</h2>
      <p className="text-slate-600">
        Παρουσιάστηκε ένα σφάλμα. Δοκιμάστε ξανά.
      </p>
      <button
        onClick={reset}
        className="rounded bg-yellow-200 px-4 py-2 hover:bg-yellow-300"
      >
        Δοκιμάστε ξανά
      </button>
    </div>
  );
}
