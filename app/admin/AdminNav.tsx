"use client";
import Link from "next/link";
import AdminNavItem from "./AdiminNavItem";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import Container from "../components/Container";

const AdminNav = () => {
  const pathName = usePathname();
  return (
    <Container>
      <div className="fixed top-40 ">
        <div className="flex flex-col items-start justify-center  gap-8 md:gap-12 overflow-hidden ">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === "/admin"}
            />
          </Link>

          <Link href="/admin/add-list">
            <AdminNavItem
              label="Add Playlist"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-list"}
            />
          </Link>

          <Link href="/admin/manage-lists">
            <AdminNavItem
              label="Manage Playlists"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-lists"}
            />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default AdminNav;
