import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid";
import GreenCheckBox from "../SideMenuHelpers/GreenCheckBox";
import { useSelector, useDispatch } from "react-redux";
import { setVites } from "../../redux/reducers/carSlice";

function VitesFilter() {
  const [openVites, setOpenVites] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const dispatch = useDispatch();
  const selectedVites = useSelector((state) => state.cars.vites);

  const [filterOptionsVites, setFilterOptionsVites] = useState([
    { label: "Tümü", checked: false },
    { label: "Manuel", checked: false },
    { label: "Otomatik", checked: false },
  ]);

  // const handleChange = (e, index) => {
  //   console.log(e.target.value);
  //   const activeData = document.getElementById(index).checked;
  //   console.log(activeData, "activeeVites", e.target.value);
  //   if (activeData == true) {
  //     // setSelected((oldData) => [...oldData, e.target.value]);
  //     // console.log(selected);

  //     dispatch(setVites([...selectedVites, e.target.value]));
  //   } else {
  //     //setSelected(selected.filter((values) => values !== e.target.value));

  //     const filteredData = selectedVites.filter(
  //       (values) => values !== e.target.value
  //     );

  //     console.log(filteredData);
  //     dispatch(setVites(filteredData));
  //     console.log(filteredData);
  //   }
  // };
  const handleChange = (e, index) => {
    const activeData = e.target.checked;
    const value = e.target.value;

    // Tümü seçeneği için özel işlem
    if (value === "Tümü") {
      // Tümü seçeneği seçildiyse, tüm diğer seçeneklerin durumunu güncelle
      const updatedOptions = filterOptionsVites.map((option) => ({
        ...option,
        checked: activeData,
      }));
      setFilterOptionsVites(updatedOptions);

      // Marka listesini güncelle
      const selectedVitess = activeData
        ? filterOptionsVites.slice(1).map((option) => option.label)
        : [];
      dispatch(setVites(selectedVitess));
    } else {
      const filteredData = activeData
        ? [...selectedVites, value]
        : selectedVites.filter((values) => values !== value);

      dispatch(setVites(filteredData));
    }
  };

  const handleToggleVites = () => {
    setOpenVites(!openVites);
    setArrowIcon(openVites ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleCheckboxChangeVites = (index) => {
    const updatedOptions = [...filterOptionsVites];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setFilterOptionsVites(updatedOptions);
  };

  // const handleAllCheckboxChange = () => {
  //   const allChecked = filterOptionsVites[0].checked;
  //   const updatedOptions = filterOptionsVites.map((option, index) => ({
  //     ...option,
  //     checked: !allChecked,
  //   }));
  //   setFilterOptionsVites(updatedOptions);
  // };

  const handleAllCheckboxChange = () => {
    if (filterOptionsVites[0]) {
      // filterOptionsMarkaModel[0] elemanı varsa
      const allChecked = filterOptionsVites[0].checked; // null veya undefined olabilir
      const updatedOptions = filterOptionsVites.map((option, index) => ({
        ...option,
        checked: allChecked ? true : false,
      }));
      setFilterOptionsVites(updatedOptions);

      // Boş bir event nesnesi ile handleChange işlevini çağırarak işlemi gerçekleştir
      handleChange(
        {
          target: {
            value: filterOptionsVites[0].label,
            checked: allChecked,
          },
        },
        -1,
        allChecked
      ); // -1 sabit değerini kullanıyoruz
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        {/* Vites Filter */}
        <Button
          onClick={handleToggleVites}
          aria-expanded={openVites}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Vites Tipi
          </Typography>
          {arrowIcon}
        </Button>

        {/* Vites Filter options */}
        <Collapse in={openVites} unmountOnExit>
          <div>
            <label>
              <GreenCheckBox
                checked={filterOptionsVites[0].checked}
                value={filterOptionsVites[0].label}
                onChange={(e) => {
                  handleAllCheckboxChange();
                  handleChange(e);
                }}
              />
              <span>{filterOptionsVites[0].label}</span>
            </label>
            {filterOptionsVites.slice(1).map((option, index) => (
              <div key={index}>
                <label>
                  <GreenCheckBox
                    id={index}
                    checked={option.checked}
                    value={option.label}
                    onChange={(e) => {
                      handleCheckboxChangeVites(index + 1);
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

export default VitesFilter;
