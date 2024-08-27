import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

function ProfileAvatar({ username }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Session storage'ı temizle
    sessionStorage.clear();
    // /login sayfasına yönlendir
    navigate("/login");
    handleClose();
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{ bgcolor: "#00bc70", marginRight: "10px", cursor: "pointer" }}
          onClick={handleAvatarClick}
        >
          {username}
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default ProfileAvatar;
