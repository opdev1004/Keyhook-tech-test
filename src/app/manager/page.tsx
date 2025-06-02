import LandlordViewing from "@/components/manager/viewing_availability/LandlordViewing";

export const metadata = {
  title: "Keyhook Property Manager Viewing Management Page",
};

export default function LandlordViewingManager() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Viewing Availability</h1>
      <LandlordViewing />
    </>
  );
}
