import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid";
import GreenCheckBox from "../SideMenuHelpers/GreenCheckBox";

function LokasyonFilter() {
  const [openLokasyon, setOpenLokasyon] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const [filterOptionsLokasyon, setFilterOptionsLokasyon] = useState([
    { label: "Tümü", checked: false },
    { label: "Adana", checked: false },
    { label: "İstanbul", checked: false },
    { label: "Ankara", checked: false },
  ]);

  const handleToggleLokasyon = () => {
    setOpenLokasyon(!openLokasyon);
    setArrowIcon(openLokasyon ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleCheckboxChangeLokasyon = (index) => {
    const updatedOptions = [...filterOptionsLokasyon];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setFilterOptionsLokasyon(updatedOptions);
  };

  const handleAllCheckboxChange = () => {
    const allChecked = filterOptionsLokasyon[0].checked;
    const updatedOptions = filterOptionsLokasyon.map((option, index) => ({
      ...option,
      checked: !allChecked,
    }));
    setFilterOptionsLokasyon(updatedOptions);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Lokasyon Filter */}
        <Button
          onClick={handleToggleLokasyon}
          aria-expanded={openLokasyon}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Lokasyon
          </Typography>
          {arrowIcon}
        </Button>

        {/* Lokasyon Filter options */}
        <Collapse in={openLokasyon} unmountOnExit>
          <div>
            <label>
              <GreenCheckBox
                checked={filterOptionsLokasyon[0].checked}
                onChange={handleAllCheckboxChange}
              />
              <span>{filterOptionsLokasyon[0].label}</span>
            </label>
            {filterOptionsLokasyon.slice(1).map((option, index) => (
              <div key={index}>
                <label>
                  <GreenCheckBox
                    checked={option.checked}
                    onChange={() => handleCheckboxChangeLokasyon(index + 1)}
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default LokasyonFilter;
