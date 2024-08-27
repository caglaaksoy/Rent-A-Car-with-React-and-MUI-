import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import Typography from "@mui/material/Typography";
import Logo from "../images/login2.png";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");

  const navigate = useNavigate();

  // const IsValidate = () => {
  //   let isproceed = true;
  //   let errormessage = "Please enter the value in ";
  //   if (id === null || id === "") {
  //     isproceed = false;
  //     errormessage += " Username";
  //   }
  //   if (username === null || username === "") {
  //     isproceed = false;
  //     errormessage += " Fullname";
  //   }
  //   if (password === null || password === "") {
  //     isproceed = false;
  //     errormessage += " Password";
  //   }
  //   if (email === null || email === "") {
  //     isproceed = false;
  //     errormessage += " Email";
  //   }

  //   if (!isproceed) {
  //     toast.warning(errormessage);
  //   } else {
  //     if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
  //     } else {
  //       isproceed = false;
  //       toast.warning("Please enter the valid email");
  //     }
  //   }
  //   return isproceed;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, email, password };
    console.log(regobj);
    // if (IsValidate()) {
    //console.log(regobj);
    fetch("http://localhost:8080/users/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => {
        toast.success("Registered successfully.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed :" + err.message);
      });
    // }
  };
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: { xs: "50vh", sm: "100vh" },
              width: { xs: "90%", sm: "50%" },
              objectFit: "contain",
              margin: "auto",
            }}
            image={Logo}
            alt=""
          />
          <Box
            sx={{
              width: { xs: "80%", sm: "30%" },
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", sm: "center" },
              alignItems: "center",
              marginLeft: "10%",
              marginRight: "5%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 2.5 }}
                />
                <Typography sx={{ mr: 1, my: 2.5, color: "action.active" }}>
                  Kullanıcı adınız <span>*</span>
                </Typography>
              </Box>
              <TextField
                id="input-username"
                label="Kullanıcı Adı"
                variant="outlined"
                sx={{ width: "100%" }}
                name="username"
                value={id}
                onChange={(e) => idchange(e.target.value)}
                required
              />

              <Box sx={{ display: "flex" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 2.5 }}
                />
                <Typography sx={{ mr: 1, my: 2.5, color: "action.active" }}>
                  Ad soyad <span>*</span>
                </Typography>
              </Box>
              <TextField
                id="input-username"
                label="Ad soyad"
                variant="outlined"
                sx={{ width: "100%" }}
                name="username"
                value={name}
                onChange={(e) => namechange(e.target.value)}
                required
              />

              <Box sx={{ display: "flex" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 2.5 }}
                />
                <Typography sx={{ mr: 1, my: 2.5, color: "action.active" }}>
                  Email Adresiniz <span>*</span>
                </Typography>
              </Box>
              <TextField
                id="input-email"
                label="Email Adresiniz"
                variant="outlined"
                sx={{ width: "100%" }}
                name="email"
                value={email}
                onChange={(e) => emailchange(e.target.value)}
                required
              />

              <Box sx={{ display: "flex" }}>
                <HttpsIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 2.5,
                  }}
                />
                <Typography sx={{ mr: 1, my: 2.5, color: "action.active" }}>
                  Şifreniz <span>*</span>
                </Typography>
              </Box>
              <TextField
                id="input-password"
                label="Şifre"
                variant="outlined"
                sx={{ width: "100%" }}
                type="password"
                name="password"
                value={password}
                onChange={(e) => passwordchange(e.target.value)}
                required
              />

              <Button
                type="submit"
                sx={{
                  backgroundColor: "#00bc70",
                  color: "white",
                  borderRadius: "30px",
                  padding: 2,
                  textTransform: "uppercase",
                  margin: "5px 0 5px 0",
                  fontWeight: "bold",
                  fontSize: "10px",
                  cursor: "pointer",
                  ":hover": {
                    color: "white",
                    backgroundColor: "#00CC66",
                    borderBottom: "1px solid #00CC66",
                  },
                }}
              >
                Kayıt ol
              </Button>

              <Button
                component={Link} // Button bileşeninin bir bağlantı olduğunu belirtiyoruz
                to="/login" // Yönlendirilecek URL adresi
                sx={{
                  backgroundColor: "#00bc70",
                  color: "white",
                  borderRadius: "30px",
                  padding: 2,
                  textTransform: "uppercase",
                  margin: "5px 0 5px 0",
                  fontWeight: "bold",
                  fontSize: "10px",
                  cursor: "pointer",
                  ":hover": {
                    color: "white",
                    backgroundColor: "#00CC66",
                    borderBottom: "1px solid #00CC66",
                  },
                }}
              >
                Giriş Yap
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
