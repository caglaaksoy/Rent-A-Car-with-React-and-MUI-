import { Grid } from "@mui/material";
import BootstrapInput from "../SideMenuHelpers/BootstrapInput";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useSelector, useDispatch } from "react-redux";
import { setMinKm, setMaxKm } from "../../redux/reducers/carSlice";

function KmFilter() {
  const [openKm, setOpenKm] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const [minKmsi, setMinKmsi] = useState("");
  const [maxKmsi, setMaxKmsi] = useState("");

  const dispatch = useDispatch();

  const handleToggleKm = () => {
    setOpenKm(!openKm);
    setArrowIcon(openKm ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleMinKmChange = (e) => {
    setMinKmsi(e.target.value);
    dispatch(setMinKm(parseInt(e.target.value)));
  };

  const handleMaxKmChange = (e) => {
    setMaxKmsi(e.target.value);
    dispatch(setMaxKm(parseInt(e.target.value)));
  };
  console.log("min KM.", minKmsi);
  console.log("max KM.", maxKmsi);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* km Filter */}
        <Button
          onClick={handleToggleKm}
          aria-expanded={openKm}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Km
          </Typography>
          {arrowIcon}
        </Button>

        {/* km Filter options */}
        <Collapse in={openKm} unmountOnExit>
          <div>
            <FormControl
              sx={{ m: 1, marginRight: "30px", width: "95px" }}
              variant="standard"
            >
              <InputLabel sx={{ m: 0, zIndex: 1 }}>400</InputLabel>
              <BootstrapInput value={minKmsi} onChange={handleMinKmChange} />
            </FormControl>
            <FormControl sx={{ m: 1, width: "95px" }} variant="standard">
              <InputLabel sx={{ m: 0, zIndex: 1 }}>248800</InputLabel>
              <BootstrapInput value={maxKmsi} onChange={handleMaxKmChange} />
            </FormControl>
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default KmFilter;
