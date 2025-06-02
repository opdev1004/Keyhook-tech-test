"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

type Booking = {
  booking_id: number;
  tenant_id: string;
  booked_date: string;
  weekday: string;
  start_at: string;
  end_at: string;
};

type Props = {
  propertyId: number;
};

const BookingList = ({ propertyId }: Props) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = () => {
    fetch(`http://localhost:4000/api/booking/property/${propertyId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();
  }, [propertyId]);

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
      <h2 className="text-lg font-bold mb-4">
        Bookings for Property {propertyId}
      </h2>
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
              <strong>Tenant:</strong> {booking.tenant_id}
            </div>
            <div>
              <strong>Date:</strong> {booking.booked_date} ({booking.weekday})
            </div>
            <div>
              <strong>Time:</strong> {booking.start_at} - {booking.end_at}
            </div>
            <Button
              onClick={() => handleCancel(booking.booking_id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
