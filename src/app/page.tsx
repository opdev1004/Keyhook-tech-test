import Button from "@/components/Button";

export const metadata = {
  title: "Keyhook",
};

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Keyhook tech test
          </h1>
          <p>Skipping login/register with athentication.</p>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <Button href="/landlord">Landlord</Button>
            <Button href="/tenant">Tenant</Button>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
