"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

type Availability = {
  id: number;
  weekday: string;
  start_at: string;
  end_at: string;
};

type Props = {
  propertyId: number;
  rerender: number;
};

const AvailabilityList = ({ propertyId, rerender }: Props) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const fetchAvailabilities = () => {
    fetch(`http://localhost:4000/api/availability/property/${propertyId}`)
      .then((res) => res.json())
      .then((data) => setAvailabilities(data));
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [propertyId, rerender]);

  const handleDelete = async (availability: Availability) => {
    const confirmed = confirm(
      `Are you sure you want to delete this availability ${availability.weekday}, ${availability.start_at} - ${availability.end_at}? `
    );
    if (!confirmed) return;

    const res = await fetch(
      `http://localhost:4000/api/availability/${availability.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      alert("Availability removed.");
      fetchAvailabilities();
    } else {
      alert("Failed to delete availability.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">
        Availabilities for Property #{propertyId}
      </h2>
      <ul className="space-y-2">
        {availabilities.length === 0 && (
          <li className="text-gray-500">No availability found.</li>
        )}
        {availabilities.map((availability) => (
          <li key={availability.id} className="border p-3 rounded-md shadow-sm">
            <div>
              <strong>Day:</strong> {availability.weekday}
            </div>
            <div>
              <strong>Time:</strong> {availability.start_at} -{" "}
              {availability.end_at}
            </div>
            <Button
              onClick={() => handleDelete(availability)}
              className="bg-red-500 hover:bg-red-600 mt-2"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityList;
