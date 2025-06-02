import BookingList from "@/components/tenant/booking_list/BookingList";

export const metadata = {
  title: "Keyhook Tenant Booking List Page",
};

export default function BookingListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Some booking list page</h1>
      <BookingList />
    </div>
  );
}
