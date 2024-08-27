import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import logo2 from "../images/anadolu.png";
import logo from "../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem } from "@mui/material";
import ProfileAvatar from "./ProfileAvatar";
import RegisterButton from "./RegisterButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    "Araç Al",
    "Araç Sat",
    "Filonu Sat",
    "Ekspertiz Al",
    "Lojistik Al",
  ];

  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        p: 2,
        border: "1px solid lightgrey",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          boxSizing: "border-box",
          paddingLeft: { xs: "5%", sm: "15%" },
          paddingRight: { xs: "5%", sm: "17%" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            alt=""
            src={logo}
            style={{
              width: "auto",
              height: "60px",
              cursor: "pointer",
            }}
          />

          <Box
            component="img"
            alt=""
            src={logo2}
            style={{
              width: "auto",
              height: "60px",
              cursor: "pointer",
            }}
            sx={{ display: { xs: "none", md: "block" } }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "rgb(83 98 89)",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  ":hover": {
                    color: " #00CC66",
                    backgroundColor: "white",
                    borderBottom: "2px solid #00CC66",
                  },
                }}
              >
                {item}
              </Button>
            ))}
            {sessionStorage.length > 0 && <ProfileAvatar />}
            {sessionStorage.length === 0 && <RegisterButton />}
          </Box>

          <IconButton
            onClick={toggleMenu}
            sx={{ display: { md: "none" } }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={toggleMenu}
        sx={{
          maxWidth: 500,
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item}
              sx={{
                color: "rgb(83 98 89)",
                cursor: "pointer",
                textTransform: "capitalize",
                fontWeight: "400",
                ":hover": {
                  color: " #00CC66",
                  backgroundColor: "white",
                  borderBottom: "1px solid #00CC66",
                },
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
