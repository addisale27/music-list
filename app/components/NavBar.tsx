import { Redressed } from "next/font/google";
import Container from "../components/Container";
import Link from "next/link";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = () => {
  return (
    <div className="bg-blue-50 sticky top-0 w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1.5px]">
        <Container>
          <div className="flex justify-between items-center gap-3 md:gap-0">
            <div className={`${redressed.className} font-semibold text-2xl`}>
              <Link href="/">Music </Link>
            </div>
            <div className="hidden md:block">search</div>
            <div>account</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
