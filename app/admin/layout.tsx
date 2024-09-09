import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminNav from "./AdminNav";
import NullData from "../components/NullData";

export const metadata = {
  title: "Manage Your Lists",
  description: "Manage Dashboard",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <NullData title="Oops Access Denied, sign up first" />;
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
