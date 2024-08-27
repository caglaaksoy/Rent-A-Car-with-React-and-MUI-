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
import { setMinFiyat, setMaxFiyat } from "../../redux/reducers/carSlice";

function FiyatFilter() {
  const [openFiyat, setOpenFiyat] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const [minFiyatı, setMinFiyatı] = useState("");
  const [maxFiyatı, setMaxFiyatı] = useState("");

  const dispatch = useDispatch();
  //const selectedFiyatMin = useSelector((state) => state.cars.minFiyat);
  //const selectedFiyatMax = useSelector((state) => state.cars.maxFiyat);

  const handleToggleFiyat = () => {
    setOpenFiyat(!openFiyat);
    setArrowIcon(openFiyat ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleMinFiyatChange = (e) => {
    setMinFiyatı(e.target.value);
    dispatch(setMinFiyat(parseFloat(e.target.value)));
  };

  const handleMaxFiyatChange = (e) => {
    setMaxFiyatı(e.target.value);
    dispatch(setMaxFiyat(parseFloat(e.target.value)));
  };
  console.log("minfiyat.", minFiyatı);
  console.log("maxfiyat.", maxFiyatı);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Fiyat Filter */}
        <Button
          onClick={handleToggleFiyat}
          aria-expanded={openFiyat}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Fiyat
          </Typography>
          {arrowIcon}
        </Button>

        {/* Fiyat Filter options */}
        <Collapse in={openFiyat} unmountOnExit>
          <div>
            <FormControl
              sx={{ m: 1, marginRight: "30px", width: "95px" }}
              variant="standard"
            >
              <InputLabel sx={{ m: 0, zIndex: 1 }}>Min Fiyat</InputLabel>
              <BootstrapInput
                value={minFiyatı}
                onChange={handleMinFiyatChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "95px" }} variant="standard">
              <InputLabel sx={{ m: 0, zIndex: 1 }}>Max Fiyat</InputLabel>
              <BootstrapInput
                value={maxFiyatı}
                onChange={handleMaxFiyatChange}
              />
            </FormControl>
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default FiyatFilter;
