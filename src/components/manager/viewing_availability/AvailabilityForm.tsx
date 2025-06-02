import { useState } from "react";
import Button from "@/components/Button";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Props = {
  managerId: string;
  propertyId: number;
  onCreated: () => void;
};

const AvailabilityForm = ({ managerId, propertyId, onCreated }: Props) => {
  const [weekday, setWeekday] = useState("Monday");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const handleSubmit = async () => {
    if (!startAt || !endAt) {
      alert("Please fill in both start and end times.");
      return;
    }

    const res = await fetch("http://localhost:4000/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manager_id: managerId,
        property_id: propertyId,
        weekday,
        start_at: startAt,
        end_at: endAt,
      }),
    });

    if (res.ok) {
      alert("Availability added.");
      setStartAt("");
      setEndAt("");
      onCreated();
    } else {
      alert("Failed to add availability.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Add Viewing Availability</h2>
      <label>
        Weekday:
        <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
          {weekdays.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <div>
        <label>
          Start Time:
          <input
            type="time"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          End Time:
          <input
            type="time"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
        </label>
      </div>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AvailabilityForm;
