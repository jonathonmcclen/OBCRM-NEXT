import Link from "next/link";
import Button from "../Button";

function NavItem({ title, link }) {
  return (
    <>
      <Link href={link}>
        <div className="inline-block h-[80px] items-center px-[20px] underline-offset-8 hover:text-[#FFD1B2] hover:underline">
          <p className="mt-[30px] ">{title}</p>
        </div>
      </Link>
    </>
  );
}

export default NavItem;
