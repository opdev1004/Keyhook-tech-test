import Button from "@/components/Button";

const Sidebar = () => {
  const sidebarMenu = [
    { label: "Book viewing", href: "/tenant" },
    { label: "Your Booking", href: "/tenant/booking_list" },
    { label: "Chat", href: "/tenant/chat" },
  ];

  return (
    <div className="w-[250px] min-h-full bg-brand-25 border-r border-brand-75 flex flex-col items-center">
      <div className="w-full h-[71px] bg-brand-25 border-b border-brand-75 flex items-center justify-center">
        <Button href="/">Home</Button>
      </div>
      <div className="w-full p-3 flex flex-col gap-2">
        {sidebarMenu.map(({ label, href }) => (
          <Button key={href} href={href} className="rounded-xl text-sm">
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
