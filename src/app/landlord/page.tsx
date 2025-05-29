import LandlordViewing from "@/components/landlord/LandlordViewing";

export const metadata = {
  title: "Keyhook Landlord Viewing manager Page",
};

export default function LandlordViewingManager() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Viewing manager</h1>
      <LandlordViewing />
    </>
  );
}
