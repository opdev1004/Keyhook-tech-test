import Button from "@/components/Button";
import { ReactNode } from "react";

export const metadata = {
  title: "Keyhook Landlord Pages",
};

export default function LandlordLayout({ children }: { children: ReactNode }) {
  const sidebarMenu = [
    { label: "Schedule Viewing", href: "/landlord" },
    { label: "Properties", href: "/landlord/properties" },
    { label: "Chat", href: "/landlord/chat" },
    { label: "Financials", href: "/landlord/financials" },
    { label: "Listings", href: "/landlord/listings" },
    { label: "Tenant Checks", href: "/landlord/tenant_checks" },
  ];

  return (
    <div className="w-[100dvw] h-[100dvh] bg-white flex">
      <div className="w-[250px] min-h-full bg-brand-25 border-r border-brand-75 flex flex-col items-center">
        <div className="w-full h-[71px] bg-brand-25 border-b border-brand-75 flex items-center justify-center">
          <Button href="/">Home</Button>
        </div>
        <div className="w-full p-3 flex flex-col gap-2">
          {sidebarMenu.map(({ label, href }) => (
            <Button key={href} href={href} className="rounded-xl text-sm">
              {label}
            </Button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
