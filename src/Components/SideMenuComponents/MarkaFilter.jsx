import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import GreenCheckBox from "../SideMenuHelpers/GreenCheckBox";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { setMarka } from "../../redux/reducers/carSlice";

function MarkaFilter() {
  const [openMarkaModel, setOpenMarkaModel] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const dispatch = useDispatch();
  const selectedMarka = useSelector((state) => state.cars.marka);

  const [filterOptionsMarkaModel, setFilterOptionsMarkaModel] = useState([
    { label: "Tümü", checked: false },
    { label: "CHEVROLET", checked: false },
    { label: "DACIA", checked: false },
    { label: "BMW", checked: false },
    { label: "TOYOTA", checked: false },
    { label: "HYUNDAI", checked: false },
  ]);

  const handleChange = (e, index) => {
    const activeData = e.target.checked;
    const value = e.target.value;

    // Tümü seçeneği için özel işlem
    if (value === "Tümü") {
      // Tümü seçeneği seçildiyse, tüm diğer seçeneklerin durumunu güncelle
      const updatedOptions = filterOptionsMarkaModel.map((option) => ({
        ...option,
        checked: activeData,
      }));
      setFilterOptionsMarkaModel(updatedOptions);

      // Marka listesini güncelle
      const selectedMarkas = activeData
        ? filterOptionsMarkaModel.slice(1).map((option) => option.label)
        : [];
      dispatch(setMarka(selectedMarkas));
    } else {
      const filteredData = activeData
        ? [...selectedMarka, value]
        : selectedMarka.filter((values) => values !== value);

      dispatch(setMarka(filteredData));
    }
  };

  const handleToggleMarkaModel = () => {
    setOpenMarkaModel(!openMarkaModel);
    setArrowIcon(openMarkaModel ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleCheckboxChangeMarkaModel = (index) => {
    const updatedOptions = [...filterOptionsMarkaModel];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setFilterOptionsMarkaModel(updatedOptions);
  };

  // Tümü seçeneğinin değişikliğini işleyen işlev
  const handleAllCheckboxChange = () => {
    if (filterOptionsMarkaModel[0]) {
      // filterOptionsMarkaModel[0] elemanı varsa
      const allChecked = filterOptionsMarkaModel[0].checked; // null veya undefined olabilir
      const updatedOptions = filterOptionsMarkaModel.map((option, index) => ({
        ...option,
        checked: allChecked ? true : false,
      }));
      setFilterOptionsMarkaModel(updatedOptions);

      // Boş bir event nesnesi ile handleChange işlevini çağırarak işlemi gerçekleştir
      handleChange(
        {
          target: {
            value: filterOptionsMarkaModel[0].label,
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
        {/* Marka Filter */}
        <Button
          onClick={handleToggleMarkaModel}
          aria-expanded={openMarkaModel}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{
              textTransform: "capitalize",
              color: "rgb(83 98 89)",
            }}
          >
            Marka
          </Typography>
          {arrowIcon}
        </Button>

        {/* Marka Filter options */}

        <Collapse in={openMarkaModel} unmountOnExit>
          <div>
            <label>
              <GreenCheckBox
                checked={filterOptionsMarkaModel[0].checked}
                value={filterOptionsMarkaModel[0].label}
                onChange={(e) => {
                  handleAllCheckboxChange();
                  handleChange(e);
                }}
              />
              <span>{filterOptionsMarkaModel[0].label}</span>
            </label>

            {filterOptionsMarkaModel.slice(1).map((option, index) => (
              <div key={index}>
                <label>
                  <GreenCheckBox
                    id={index}
                    checked={option.checked}
                    value={option.label}
                    onChange={(e) => {
                      handleCheckboxChangeMarkaModel(index + 1);
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

export default MarkaFilter;
