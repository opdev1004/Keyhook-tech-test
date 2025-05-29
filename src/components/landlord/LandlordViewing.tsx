"use client";
import { useState } from "react";
import AvailabilityForm from "@/components/landlord/AvailabilityForm";
import AvailabilityList from "@/components/landlord/AvailabilityList";
import BookingList from "@/components/landlord/BookingList";

const LandlordViewing = () => {
  const [managerId, setManagerId] = useState("landlord1");
  const [propertyId, setPropertyId] = useState(1);
  const [ALRenderTrigger, setALRenderTrigger] = useState(0);

  const updateAvailabilityList = () => {
    setALRenderTrigger((prev) => prev + 1);
  };

  return (
    <>
      <p>
        These inputs are just for prototype testing purpose since there isn't
        login or authentication system.
        <br />
        Data need to be stored in cookies or localStorage.
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <label className="flex flex-col text-sm font-medium">
          Manager ID
          <input
            type="text"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="mt-1 p-2 border rounded-md w-60"
            placeholder="landlord1"
          />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Property ID
          <input
            type="number"
            value={propertyId}
            onChange={(e) => setPropertyId(parseInt(e.target.value))}
            className="mt-1 p-2 border rounded-md w-32"
            placeholder="1"
            min={1}
          />
        </label>
      </div>
      <AvailabilityForm
        managerId={managerId}
        propertyId={propertyId}
        onCreated={updateAvailabilityList}
      />
      <AvailabilityList propertyId={propertyId} rerender={ALRenderTrigger} />
      <BookingList propertyId={propertyId} />
    </>
  );
};

export default LandlordViewing;
