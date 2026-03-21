import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-lg text-slate-600">Η σελίδα δεν βρέθηκε.</p>
      <Link
        href="/"
        className="rounded bg-yellow-200 px-4 py-2 hover:bg-yellow-300"
      >
        Αρχική σελίδα
      </Link>
    </div>
  );
}
