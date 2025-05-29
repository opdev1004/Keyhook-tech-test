"use client";
import { useEffect, useState } from "react";
import BookingList from "@/components/tenant/BookingList";

type property = {
  id: string;
  name: string;
};

type availableTime = {
  id: number;
  booked: boolean;
  weekday: string;
  start_at: string;
  end_at: string;
};

const TenantBooking = () => {
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [availability, setAvailability] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(-1);
  const [tenantId, setTenantId] = useState("tenant1");

  useEffect(() => {
    fetch("http://localhost:4000/api/properties")
      .then((res) => res.json())
      .then(setProperties);
  }, []);

  useEffect(() => {
    if (!propertyId) return;

    fetch(`http://localhost:4000/api/availability/property/${propertyId}`)
      .then((res) => res.json())
      .then(setAvailability);
  }, [propertyId]);

  const handleBooking = async () => {
    if (!selectedSlotId) return;
    const today = new Date().toISOString().split("T")[0];

    const res = await fetch("http://localhost:4000/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenant_id: tenantId,
        availability_id: selectedSlotId,
        booked_date: today,
      }),
    });

    if (res.ok) {
      alert("Booked successfully!");
      setSelectedSlotId(-1);
    } else {
      const err = await res.json();
      alert(err.error || "Booking failed");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Book a Viewing</h1>

      <p>
        This input is just for prototype testing purpose since there isn't login
        or authentication system.
        <br />
        Data need to be stored in cookies or localStorage.
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <label className="flex flex-col text-sm font-medium">
          Tenant ID
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="mt-1 p-2 border rounded-md w-60"
            placeholder="tenant1"
          />
        </label>
      </div>

      <label className="block mb-2 font-semibold">
        Select Property (Meant to be search and select)
      </label>
      <select
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="">Select Property</option>
        {properties.map((property: property) => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>

      {availability.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4 mb-2">Available Times</h2>
          <ul className="border rounded p-3 space-y-2">
            {availability.map((availableTime: availableTime) => (
              <li
                key={availableTime.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedSlotId === availableTime.id
                    ? "bg-blue-200"
                    : "bg-gray-100"
                } ${
                  availableTime.booked ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => setSelectedSlotId(availableTime.id)}
              >
                {availableTime.weekday}, {availableTime.start_at}–
                {availableTime.end_at}
              </li>
            ))}
          </ul>

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleBooking}
            disabled={!selectedSlotId}
          >
            Book Selected Time
          </button>
        </>
      )}
      <BookingList tenantId={tenantId} />
    </>
  );
};

export default TenantBooking;
