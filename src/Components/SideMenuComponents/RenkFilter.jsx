import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid";
import GreenCheckBox from "../SideMenuHelpers/GreenCheckBox";
import { useSelector, useDispatch } from "react-redux";
import { setRenk } from "../../redux/reducers/carSlice";

function RenkFilter() {
  const [openRenk, setOpenRenk] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);

  const dispatch = useDispatch();
  const selectedRenk = useSelector((state) => state.cars.renk);

  const [filterOptionsRenk, setFilterOptionsRenk] = useState([
    { label: "Tümü", checked: false },
    { label: "Beyaz", checked: false },
    { label: "Siyah", checked: false },
    { label: "Kırmızı", checked: false },
    { label: "Siyah(Mat)", checked: false },
  ]);

  const handleChange = (e, index) => {
    const activeData = e.target.checked;
    const value = e.target.value;

    // Tümü seçeneği için özel işlem
    if (value === "Tümü") {
      // Tümü seçeneği seçildiyse, tüm diğer seçeneklerin durumunu güncelle
      const updatedOptions = filterOptionsRenk.map((option) => ({
        ...option,
        checked: activeData,
      }));
      setFilterOptionsRenk(updatedOptions);

      // Marka listesini güncelle
      const selectedRenkss = activeData
        ? filterOptionsRenk.slice(1).map((option) => option.label)
        : [];
      dispatch(setRenk(selectedRenkss));
    } else {
      const filteredData = activeData
        ? [...selectedRenk, value]
        : selectedRenk.filter((values) => values !== value);

      dispatch(setRenk(filteredData));
    }
  };

  const handleToggleRenk = () => {
    setOpenRenk(!openRenk);
    setArrowIcon(openRenk ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />);
  };

  const handleCheckboxChangeRenk = (index) => {
    const updatedOptions = [...filterOptionsRenk];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setFilterOptionsRenk(updatedOptions);
  };

  // Tümü seçeneğinin değişikliğini işleyen işlev
  const handleAllCheckboxChange = () => {
    if (filterOptionsRenk[0]) {
      // filterOptionsMarkaModel[0] elemanı varsa
      const allChecked = filterOptionsRenk[0].checked; // null veya undefined olabilir
      const updatedOptions = filterOptionsRenk.map((option, index) => ({
        ...option,
        checked: allChecked ? true : false,
      }));
      setFilterOptionsRenk(updatedOptions);

      // Boş bir event nesnesi ile handleChange işlevini çağırarak işlemi gerçekleştir
      handleChange(
        {
          target: {
            value: filterOptionsRenk[0].label,
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
        {/* Renk Filter */}
        <Button
          onClick={handleToggleRenk}
          aria-expanded={openRenk}
          sx={{ borderBottom: "1px solid lightgrey", width: "90%" }}
        >
          <Typography
            flex="1"
            align="left"
            sx={{ textTransform: "capitalize", color: "rgb(83 98 89)" }}
          >
            Renk
          </Typography>
          {arrowIcon}
        </Button>

        {/* Renk Filter options */}
        <Collapse in={openRenk} unmountOnExit>
          <div>
            <label>
              <GreenCheckBox
                checked={filterOptionsRenk[0].checked}
                value={filterOptionsRenk[0].label}
                onChange={(e) => {
                  handleAllCheckboxChange();
                  handleChange(e);
                }}
              />
              <span>{filterOptionsRenk[0].label}</span>
            </label>

            {filterOptionsRenk.slice(1).map((option, index) => (
              <div key={index}>
                <label>
                  <GreenCheckBox
                    id={index}
                    checked={option.checked}
                    value={option.label}
                    onChange={(e) => {
                      handleCheckboxChangeRenk(index + 1);
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

export default RenkFilter;
