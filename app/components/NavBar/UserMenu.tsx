"use client";

import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import Link from "next/link";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react"; // Import signOut

interface UserMenuProps {
  currentUser: SafeUser | null; // Allow null if the user isn't logged in
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-1 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-sm transition text-slate-700"
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm cursor-pointer flex flex-col">
            {currentUser ? (
              <div>
                <Link href="/your-playLists">
                  <MenuItem onClick={toggleOpen}>Your playlists</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>
                    Manage your playlists
                  </MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut(); // Logout function
                  }}
                >
                  Log out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Log in</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
