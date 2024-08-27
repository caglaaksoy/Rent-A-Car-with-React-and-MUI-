import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid";
import GreenCheckBox from "../SideMenuHelpers/GreenCheckBox";
import { useSelector, useDispatch } from "react-redux";
import { setYakit } from "../../redux/reducers/carSlice";

function YakitTipiFilter() {
  const [openYakit, setOpenYakit] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const dispatch = useDispatch();

  const selectedYakit = useSelector((state) => state.cars.yakit);

  // const handleChange = (e, index) => {
  //   console.log(e.target.value);
  //   const activeData = document.getElementById(index).checked;
  //   console.log(activeData, "activeeYakit", e.target.value);
  //   if (activeData == true) {
  //     dispatch(setYakit([...selectedYakit, e.target.value]));
  //   } else {
  //     const filteredData = selectedYakit.filter(
  //       (values) => values !== e.target.value
  //     );
  //     console.log(filteredData);
  //     dispatch(setYakit(filteredData));
  //     console.log(filteredData);
  //   }
  // };

  const handleChange = (e, index) => {
    const activeData = e.target.checked;
    const value = e.target.value;

    // Tümü seçeneği için özel işlem
    if (value === "Tümü") {
      // Tümü seçeneği seçildiyse, tüm diğer seçeneklerin durumunu güncelle
      const updatedOptions = filterOptionsYakit.map((option) => ({
        ...option,
        checked: activeData,
      }));
      setFilterOptionsYakit(updatedOptions);

      // Marka listesini güncelle
      const selectedYakits = activeData
        ? filterOptionsYakit.slice(1).map((option) => option.label)
        : [];
      dispatch(setYakit(selectedYakits));
    } else {
      const filteredData = activeData
        ? [...selectedYakit, value]
        : selectedYakit.filter((values) => values !== value);

      dispatch(setYakit(filteredData));
    }
  };

  const [filterOptionsYakit, setFilterOptionsYakit] = useState([
    { label: "Tümü", checked: false },
    { label: "Benzin", checked: false },
    { label: "Dizel", checked: false },
  ]);

  const handleToggleYakit = () => {
    setOpenYakit(!openYakit);
    setArrowIcon(openYakit ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleCheckboxChangeYakit = (index) => {
    const updatedOptions = [...filterOptionsYakit];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setFilterOptionsYakit(updatedOptions);
  };

  // const handleAllCheckboxChange = () => {
  //   const allChecked = filterOptionsYakit[0].checked;
  //   const updatedOptions = filterOptionsYakit.map((option, index) => ({
  //     ...option,
  //     checked: !allChecked,
  //   }));
  //   setFilterOptionsYakit(updatedOptions);
  // };

  const handleAllCheckboxChange = () => {
    if (filterOptionsYakit[0]) {
      // filterOptionsMarkaModel[0] elemanı varsa
      const allChecked = filterOptionsYakit[0].checked; // null veya undefined olabilir
      const updatedOptions = filterOptionsYakit.map((option, index) => ({
        ...option,
        checked: allChecked ? true : false,
      }));
      setFilterOptionsYakit(updatedOptions);

      // Boş bir event nesnesi ile handleChange işlevini çağırarak işlemi gerçekleştir
      handleChange(
        {
          target: {
            value: filterOptionsYakit[0].label,
            checked: allChecked,
          },
        },
        -1,
        allChecked
      ); // -1 sabit değerini kullanıyoruz
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Yakit Filter */}
        <Button
          onClick={handleToggleYakit}
          aria-expanded={openYakit}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Yakıt Tipi
          </Typography>
          {arrowIcon}
        </Button>

        {/* Yakit Filter options */}
        <Collapse in={openYakit} unmountOnExit>
          <div>
            <label>
              <GreenCheckBox
                checked={filterOptionsYakit[0].checked}
                value={filterOptionsYakit[0].label}
                onChange={(e) => {
                  handleAllCheckboxChange();
                  handleChange(e);
                }}
              />
              <span>{filterOptionsYakit[0].label}</span>
            </label>
            {filterOptionsYakit.slice(1).map((option, index) => (
              <div key={index}>
                <label>
                  <GreenCheckBox
                    id={index}
                    checked={option.checked}
                    value={option.label}
                    onChange={(e) => {
                      handleCheckboxChangeYakit(index + 1);
                      handleChange(e, index);
                    }}
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

export default YakitTipiFilter;
