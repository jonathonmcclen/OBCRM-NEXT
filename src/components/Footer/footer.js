import Link from "next/link";
import Button from "../Button";

function Footer() {
  return (
    <>
      <div className="flex flex-wrap  bg-[#000] px-[50px] py-[100px]">
        <div className="w-full uppercase md:w-3/12">
          <p>Simulation Miners</p>
        </div>
        <div className="w-full md:w-3/12">
          <ul>
            <li>About</li>
            <li>Kick-starter</li>
            <li>Email@Email.com</li>
          </ul>
        </div>
        <div className="w-full md:w-3/12">
          <ul>
            <li>About</li>
            <li>Kick-starter</li>
            <li>Email@Email.com</li>
          </ul>
        </div>
        <div className="w-full md:w-3/12">
          <ul>
            <li>About</li>
            <li>Kick-starter</li>
            <li>Email@Email.com</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
