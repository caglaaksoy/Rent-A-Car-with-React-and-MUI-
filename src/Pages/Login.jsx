import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import Typography from "@mui/material/Typography";
import Logo from "../images/login2.png";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux store'dan veri almak için
import { useSnackbar } from "notistack";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const loggedInUsername = useSelector((state) => state.user.username);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant, message) => () => {
    enqueueSnackbar(message, { variant });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      fetch("http://localhost:8080/users/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
            handleClickVariant(
              "warning",
              "Please enter valid username and password.1"
            )();
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", JSON.stringify(resp));
              navigate("/");
              handleClickVariant(
                "success",
                "Giriş işlemi başarılı!Hoşgeldiniz " + resp.id
              )();
            } else {
              toast.error("Please Enter valid credentials");
              handleClickVariant("error", "Şifrenizi doğru giriniz!")();
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
          handleClickVariant(
            "error",
            "Giriş işlemi başarısız! Tekrar deneyiniz."
          )();
        });
    }
  };

  const validate = () => {
    let result = true;
    if (!username) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (!password) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <Container maxWidth="xl">
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
            alignItems: "start",
            marginLeft: "10%",
            marginRight: "5%",
          }}
        >
          {/* {loggedInUsername && (
            <Typography variant="h4">
              Hoş geldin, {loggedInUsername}!
            </Typography>
          )} */}
          <form onSubmit={handleLogin}>
            <Box sx={{ display: "flex" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 2.5 }} />
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Box sx={{ display: "flex" }}>
              <HttpsIcon sx={{ color: "action.active", mr: 1, my: 2.5 }} />
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
              onChange={(e) => setPassword(e.target.value)}
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
              Giriş Yap
            </Button>

            <Button
              component={Link}
              to="/register"
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
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
