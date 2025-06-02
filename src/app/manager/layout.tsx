import Button from "@/components/Button";
import { ReactNode } from "react";
import Sidebar from "@/components/manager/Sidebar";

export const metadata = {
  title: "Keyhook Landlord Pages",
};

export default function LandlordLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-[100dvw] h-[100dvh] bg-white flex">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
