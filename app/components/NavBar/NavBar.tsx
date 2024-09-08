import { Redressed } from "next/font/google";
import Container from "../Container";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="bg-blue-50 sticky top-0 w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1.5px]">
        <Container>
          <div className="flex justify-between items-center gap-3 md:gap-0">
            <div className={`${redressed.className} font-semibold text-2xl`}>
              <Link href="/">Music </Link>
            </div>
            <div className="hidden md:block">search</div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
