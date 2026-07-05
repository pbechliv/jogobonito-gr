import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">404</h2>
      <p className="text-lg text-muted-foreground">Η σελίδα δεν βρέθηκε.</p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground transition-colors hover:bg-primary/80"
      >
        Αρχική σελίδα
      </Link>
    </div>
  );
}
