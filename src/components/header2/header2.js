import Link from "next/link";
import Button from "../Button";
import SifiRandom from "../SifiRandom";
import { useAuth } from "../../hooks/Auth";
import { useEffect, useState } from "react";
import NewsScroller from "../NewsScroller";
import { TbMoneybag } from "react-icons/tb";
import { supabaseClient as supabase } from "../../config/supabase-client";
import Avatar from "../Avatar";
import NavItem from "../NavItem";
import { RxHamburgerMenu } from "react-icons/rx";

function Header2() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const { signOut } = useAuth();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const handleHamOpen = () => setHamburgerOpen(true);
  const handleHamClose = () => setHamburgerOpen(false);

  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    if (user) {
      const getProfileInfo = async function () {
        let { data, error } = await supabase
          .from("profiles")
          .select(`username, ethercoin,bg , avatars(path)`)
          .eq("id", user.id)
          .single();

        //! FILTER 0's

        setCurrentUser(data);
        console.log(data);
      };

      getProfileInfo();
    }
  }, []);

  return (
    <>
      <NewsScroller />
      <div className="noselect hidden bg-[#000] md:block ">
        <div className="ml-[20px] tracking-widest">
          <div className="inline-block h-[80px] items-center px-[20px] text-[#FFD1B2]">
            <Link to="/">
              <p className="mt-[30px]  text-4xl font-thin">SIMULATION MINERS</p>
            </Link>
          </div>
          <NavItem title="SIMULATOR" link="/simulator" />{" "}
          <NavItem title="SHOP" link="/shop" />
          <NavItem title="BLACK MARKET" link="/black-market" />
          <Link to="/profile">
            <div className="float-right inline-block h-[80px] px-[20px] hover:text-[#22FC37]">
              {currentUser && (
                <div className="mt-[30px]">
                  <Avatar
                    title={currentUser?.username}
                    subTitle={currentUser?.ethercoin.toLocaleString() + " eC"}
                    img={currentUser?.avatars.path}
                    bgColor={`#${currentUser["bg"]}`}
                  />
                </div>
              )}
            </div>
          </Link>
          <div
            onClick={handleSignOut}
            className="float-right inline-block h-[80px] items-center px-[20px]"
          >
            <div className="mt-[30px]">
              <Button title={"LOGOUT"} color="#ffc700" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[80px] bg-[#000] tracking-widest md:hidden">
        <div className="ml-[20px]">
          <div className="inline-block h-[80px] items-center px-[20px] text-[#FFD1B2]">
            <Link to="/">
              <p className="mt-[30px] text-3xl font-thin">SIMULATION MINERS</p>
            </Link>
          </div>
          <div
            onClick={handleHamOpen}
            className="absolute right-0 top-0 h-[80px] items-center px-[20px] text-[#FFD1B2]"
          >
            <RxHamburgerMenu
              className="mt-[62px]"
              style={{ fontSize: "30px" }}
            />
          </div>
        </div>
      </div>

      {/* ----------HAMBERGER MENUE---------- */}
      {hamburgerOpen && (
        <div className="fixed right-0 top-0 z-50 h-[120vh] w-full bg-black p-[40px]">
          <p
            className="absolute right-0 top-0 mr-[25px] mt-[35px] text-3xl"
            onClick={handleHamClose}
          >
            X
          </p>
          <div>
            <Link onClick={handleHamClose} to="/">
              HOME
            </Link>
          </div>
          <div>
            <Link onClick={handleHamClose} to="/simulator">
              SIMULATOR
            </Link>
          </div>
          <div>
            <Link onClick={handleHamClose} to="/shop">
              SHOP
            </Link>
          </div>
          <div>
            <Link onClick={handleHamClose} to="/black-market">
              BLACK MARKET
            </Link>
          </div>
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <SifiRandom length={1000} delay={1000} chars={"- "} />
            <SifiRandom length={1000} delay={1000} chars={"- "} />
            <SifiRandom length={1000} delay={1000} chars={" □"} />

            <SifiRandom length={100} chars={"_- "} delay={2000} />
          </div>
          {currentUser && (
            <Link to="/profile" onClick={handleHamClose}>
              <div className="mt-[30px]">
                <Avatar
                  title={currentUser?.username}
                  subTitle={currentUser?.ethercoin.toLocaleString() + " eC"}
                  img={currentUser?.avatars.path}
                  bgColor={`#${currentUser["bg"]}`}
                />
              </div>
            </Link>
          )}
          <div
            onClick={handleSignOut}
            className="mx-auto h-[80px] w-full px-[20%] text-center"
          >
            <div className="mt-[30px]">
              <Button title={"LOGOUT"} color="#ffc700" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header2;
