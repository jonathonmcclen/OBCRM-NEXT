import { NavLink } from "react-router-dom";
import { Button, IconButton, Nav, Navbar, Tag } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import { useAuth } from "../hooks/Auth";
import OffRoundIcon from "@rsuite/icons/OffRound";
import AdminIcon from "@rsuite/icons/Admin";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../config/supabase-client";
import { TbMoneybag } from "react-icons/tb";
import NewsScroller from "./NewsScroller";

function MainNavigation() {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <NewsScroller />
      <Navbar>
        <Nav>
          <Nav.Item to={"/"} as={NavLink} icon={<HomeIcon />}>
            Home
          </Nav.Item>
          <Nav.Item to={"/simulator"} as={NavLink}>
            Simulator
          </Nav.Item>
          <Nav.Item to={"/challenges"} as={NavLink}>
            Challenges
          </Nav.Item>
          <Nav.Item to={"/black-market"} as={NavLink}>
            Black Market
          </Nav.Item>
          {/* <Nav.Item to={'/black-market'} as={NavLink}>Black Market</Nav.Item> */}
          {user ? (
            <Nav.Item as={NavLink} to="#">
              <IconButton
                size="sm"
                onClick={handleLogout}
                appearance="primary"
                icon={<OffRoundIcon />}
              >
                Logout
              </IconButton>
            </Nav.Item>
          ) : (
            <Nav.Item as={NavLink} to="/login">
              <Tag color="red">Not Logged In</Tag>
            </Nav.Item>
          )}
        </Nav>
        <Nav pullRight>
          {user ? (
            <>
              <Nav.Item as={NavLink} to="/profile">
                {/* <p>{user?.email}</p> */}
                {currentUser && (
                  <div style={{ backgroundColor: `#${currentUser["bg"]}` }}>
                    <img className="h-[40px]" src={currentUser?.avatars.path} />
                  </div>
                )}
              </Nav.Item>
              <Nav.Item as={NavLink} to="/inventory" icon={<TbMoneybag />}>
                {" "}
                <p>
                  <strong>{currentUser?.ethercoin.toLocaleString()}</strong> eC
                </p>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item as={NavLink} to="/login">
                <p color="red">Log In</p>
              </Nav.Item>
              <Nav.Item as={NavLink} to="/signup">
                <Button size="lg">Sign Up</Button>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default MainNavigation;
