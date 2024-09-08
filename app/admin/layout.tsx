import AdminNav from "./AdminNav";

export const metadata = {
  title: "Manage Your Lists",
  description: "Manage Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <nav className=" md:w-[25%] xl:w-[20%] 2xl:w-[17%] h-full border-r-[2px] overflow-hidden">
        <AdminNav />
      </nav>

      {/* Main content on the right side */}
      <main className="flex-grow p-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
