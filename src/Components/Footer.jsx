import { Box } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Logo from "../images/logoremovebg.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  const [spacing] = React.useState(2);

  return (
    <Box
      sx={{
        backgroundColor: "lightgrey",
        p: 2,
        border: "1px solid lightgrey",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
      }}
    >
      <Box
        sx={{
          paddingLeft: "19%",
          paddingRight: "15%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={Logo} alt="" style={{ height: "60px" }} />
        <Box>
          <FacebookIcon />
          <TwitterIcon />
          <LinkedInIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </Box>
      </Box>
      <Box>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={spacing}>
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <Paper
                    sx={{
                      height: 200,
                      width: 250,
                      boxShadow: "none",
                      borderRight: "1px solid grey",
                      borderRadius: "0",
                      textAlign: "center",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                    <p>xxxxxxx</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
