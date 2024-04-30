import { Link } from "react-router-dom";
import Button from "../Button";

function NavItem({ title, link }) {
  return (
    <>
      <Link to={link}>
        <div className="inline-block px-[20px] h-[80px] hover:text-[#FFD1B2] items-center hover:underline underline-offset-8">
          <p className="mt-[30px] ">{title}</p>
        </div>
      </Link>
    </>
  );
}

export default NavItem;
