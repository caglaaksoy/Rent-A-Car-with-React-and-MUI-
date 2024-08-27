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
import {
  setMinModelYili,
  setMaxModelYili,
} from "../../redux/reducers/carSlice";

function ModelYiliFilter() {
  const [openModelYili, setOpenModelYili] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);
  const [minYil, setMinYil] = useState("");
  const [maxYil, setMaxYil] = useState("");

  const dispatch = useDispatch();
  const minModelYili = useSelector((state) => state.cars.minModelYili);
  const maxModelYili = useSelector((state) => state.cars.maxModelYili);

  const cars = useSelector((state) => state.cars.cars);

  const handleToggleModelYili = () => {
    setOpenModelYili(!openModelYili);
    setArrowIcon(openModelYili ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleMinYilChange = (e) => {
    setMinYil(e.target.value);
    dispatch(setMinModelYili(parseInt(e.target.value)));
  };

  const handleMaxYilChange = (e) => {
    setMaxYil(e.target.value);
    dispatch(setMaxModelYili(parseInt(e.target.value)));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Model yılı Filter */}
        <Button
          onClick={handleToggleModelYili}
          aria-expanded={openModelYili}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Model Yılı
          </Typography>
          {arrowIcon}
        </Button>

        {/* Model yılı Filter options */}
        <Collapse in={openModelYili} unmountOnExit>
          <div>
            <FormControl
              sx={{ m: 1, marginRight: "30px", width: "95px" }}
              variant="standard"
            >
              <InputLabel sx={{ m: 0, zIndex: 1 }}>Min Model Yılı</InputLabel>
              <BootstrapInput value={minYil} onChange={handleMinYilChange} />
            </FormControl>
            <FormControl sx={{ m: 1, width: "95px" }} variant="standard">
              <InputLabel sx={{ m: 0, zIndex: 1 }}>Max Model Yılı</InputLabel>
              <BootstrapInput value={maxYil} onChange={handleMaxYilChange} />
            </FormControl>
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default ModelYiliFilter;
