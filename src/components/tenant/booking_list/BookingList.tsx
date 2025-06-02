"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

type Booking = {
  booking_id: number;
  booked_date: string;
  weekday: string;
  start_at: string;
  end_at: string;
  property_id: number;
};

const TenantBookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tenantId, setTenantId] = useState("tenant1");

  const fetchBookings = () => {
    fetch(`http://localhost:4000/api/booking/tenant/${tenantId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();
  }, [tenantId]);

  const handleCancel = async (bookingId: number) => {
    const confirmed = confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:4000/api/booking/${bookingId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Booking cancelled.");
      fetchBookings();
    } else {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="mt-8">
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

      <h2 className="text-lg font-bold mb-4">Your Bookings</h2>
      <ul className="space-y-2">
        {bookings.length === 0 && (
          <li className="text-gray-500">No bookings found.</li>
        )}
        {bookings.map((booking) => (
          <li
            key={booking.booking_id}
            className="border p-3 rounded-md shadow-sm"
          >
            <div>
              <strong>Property:</strong> {booking.property_id}
            </div>
            <div>
              <strong>Date:</strong> {booking.booked_date} ({booking.weekday})
            </div>
            <div>
              <strong>Time:</strong> {booking.start_at} - {booking.end_at}
            </div>
            <Button
              onClick={() => handleCancel(booking.booking_id)}
              className="bg-red-500 hover:bg-red-600 mt-2"
            >
              Cancel
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantBookingList;
