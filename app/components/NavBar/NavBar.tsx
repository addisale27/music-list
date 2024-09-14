import { Redressed } from "next/font/google";
import Container from "../Container";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  // Ensure currentUser is either null or defined (not undefined)
  const safeCurrentUser = currentUser ?? null;

  return (
    <div className="bg-blue-50 sticky top-0 w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1.5px]">
        <Container>
          <div className="flex justify-between items-center gap-3 md:gap-0">
            <div className={`${redressed.className} font-semibold text-2xl`}>
              <Link href="/">Music </Link>
            </div>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <UserMenu currentUser={safeCurrentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
