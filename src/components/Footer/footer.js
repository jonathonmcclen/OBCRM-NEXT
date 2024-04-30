import { Link } from "react-router-dom";
import Button from "../Button";

function Footer() {
  return (
    <>
      <div className="flex flex-wrap  bg-[#000] py-[100px] px-[50px]">
        <div className="w-full md:w-3/12 uppercase">
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
