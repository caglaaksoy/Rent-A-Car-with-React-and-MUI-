// RegisterButton.js

import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function RegisterButton() {
  return (
    <Button
      component={Link}
      to="/register"
      sx={{
        backgroundColor: "#00bc70",
        color: "white",
        borderRadius: "30px",
        padding: 1,
        fontWeight: "bold",
        textTransform: "capitalize",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#00CC66",
        },
        display: { xs: "none", md: "block" },
      }}
    >
      Kayıt Ol
    </Button>
  );
}

export default RegisterButton;
