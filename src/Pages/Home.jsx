import React, { useEffect } from "react";
import Main from "../Components/Main";
import SideMenu from "../Components/SideMenu";
import Grid from "@mui/material/Grid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  //  const usenavigate = useNavigate();

  // useEffect(() => {
  //   let username = sessionStorage.getItem("username");
  //   if (username === "" || username === null) {
  //     usenavigate("/");
  //   }
  // }, []);

  const navigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/");
    }
  }, [navigate]); // 'navigate' bağımlılığı eklendi

  return (
    <div>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "17%", paddingRight: "17%" }}
      >
        {/* Sol kısım */}
        <Grid item xs={12} md={3}>
          <SideMenu />
        </Grid>

        {/* Sağ kısım  */}
        <Grid item xs={12} md={9}>
          <Main />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
