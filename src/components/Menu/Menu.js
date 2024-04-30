import React from "react";
import { Navbar, Button, Text, Card, Radio, useTheme } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Menu({loggedIn}) {
  const [variant, setVariant] = React.useState("static");
  const {isDark} = useTheme();
  
  return (
      <Navbar isBordered={isDark} variant={"floating"}>
        <Navbar.Brand>
          <h1>META Miners</h1>
        </Navbar.Brand>
        {loggedIn && 
        <>
        <Navbar.Content hideIn="xs">
            <Link to="/profile">Profile</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/simulator">Simulator</Link>
          <Link to="/simulator">Black Market</Link>
        </Navbar.Content>
        <Navbar.Content>

        </Navbar.Content>
        </>
        }
        {!loggedIn && 
        <Navbar.Content>
          <Link color="inherit" to="/login-signup">
            Login
          </Link>
          <Navbar.Item>
            <Button auto flat as={Link} to="/login-signup">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        }
      </Navbar>    
  )
}

export default Menu
