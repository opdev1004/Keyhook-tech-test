"use client";
import React, { useState, useEffect } from "react";

type Property = {
  id: number;
  name: string;
  address: string;
  bedroom: number;
  showerroom: number;
  bathroom: number;
  toiletroom: number;
  manager_id: string;
};

type availableTime = {
  id: number;
  booked: boolean;
  weekday: string;
  start_at: string;
  end_at: string;
};

const PropertySearch = () => {
  const [q, setQ] = useState("");
  const [bedroomMin, setBedroomMin] = useState("");
  const [bedroomMax, setBedroomMax] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [propertyId, setPropertyId] = useState(-1);
  const [availability, setAvailability] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(-1);
  const [tenantId, setTenantId] = useState("tenant1");

  useEffect(() => {
    if (!propertyId) return;

    fetch(`http://localhost:4000/api/availability/property/${propertyId}`)
      .then((res) => res.json())
      .then(setAvailability);
  }, [propertyId]);

  const fetchProperties = async () => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (bedroomMin) params.append("bedroom_min", bedroomMin);
    if (bedroomMax) params.append("bedroom_max", bedroomMax);
    params.append("page", page.toString());

    const res = await fetch(
      `http://localhost:4000/api/properties/search?${params.toString()}`
    );
    const data = await res.json();

    setProperties(data.result);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

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
      <div>
        <h2 className="text-lg">Search Property for viewing</h2>
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Search by keywords"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border p-2 w-full"
          />
          <p>The filter can be replaced with range slider and better design</p>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min bedrooms"
              value={bedroomMin}
              onChange={(e) => setBedroomMin(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Max bedrooms"
              value={bedroomMax}
              onChange={(e) => setBedroomMax(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <p>
            Only implemented the bedroom filter as adding the other filters is
            quite same thing to do and they will take GUI space.
          </p>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Search
          </button>
        </form>

        <div className="space-y-4">
          {properties.map((property) => (
            <>
              <div
                key={property.id}
                className={`border p-4 rounded shadow ${
                  propertyId === property.id
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setPropertyId(property.id);
                }}
              >
                <h2 className="text-xl font-bold">{property.name}</h2>
                <p>Address: {property.address}</p>
                <p>Bedrooms: {property.bedroom}</p>
                <p>Showerrooms: {property.showerroom}</p>
                <p>Bathrooms: {property.bathroom}</p>
                <p>Toiletrooms: {property.toiletroom}</p>
                <p>Managed by: {property.manager_id}</p>
              </div>
              {propertyId === property.id && availability.length > 0 && (
                <>
                  <h2 className="text-lg font-semibold mt-4 mb-2">
                    Available Times
                  </h2>
                  <ul className="border rounded p-3 space-y-2">
                    {availability.map((availableTime: availableTime) => (
                      <li
                        key={availableTime.id}
                        className={`p-2 rounded cursor-pointer ${
                          selectedSlotId === availableTime.id
                            ? "bg-blue-200"
                            : "bg-gray-100"
                        } ${
                          availableTime.booked
                            ? "opacity-50 pointer-events-none"
                            : ""
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
            </>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertySearch;
