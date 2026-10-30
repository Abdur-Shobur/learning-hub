import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[720px] flex-col justify-center px-6">
      <p className="mb-3 font-mono text-[12.5px] text-amber">404</p>
      <h1 className="mb-4 font-display text-4xl font-semibold">এই পাতা নেই।</h1>
      <p className="mb-8 text-dim">কোর্সের তালিকায় ফিরে যান।</p>
      <Link href="/" className="font-mono text-sm text-violet">
        ← সব কোর্স
      </Link>
    </div>
  );
}
