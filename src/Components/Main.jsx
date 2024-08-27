import React, { useState, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setCars } from "../redux/reducers/carSlice";
import { setFilteredCarCount } from "../redux/reducers/carSlice";

function Main() {
  const dispatch = useDispatch();
  // Redux'tan arabaları al
  const carsTumu = useSelector((state) => state.cars.cars);

  const selectedMarkalar = useSelector((state) => state.cars.marka);

  const selectedVites = useSelector((state) => state.cars.vites);

  const selectedYakit = useSelector((state) => state.cars.yakit);

  const selectedMinFiyat = useSelector((state) => state.cars.minFiyat);

  const selectedMaxFiyat = useSelector((state) => state.cars.maxFiyat);

  const selectedMinYil = useSelector((state) => state.cars.minModelYili);

  const selectedMaxYil = useSelector((state) => state.cars.maxModelYili);

  const selectedMinKm = useSelector((state) => state.cars.minKm);

  const selectedMaxKm = useSelector((state) => state.cars.maxKm);

  const selectedRenk = useSelector((state) => state.cars.renk);

  useEffect(() => {
    // JSON verilerini Redux'tan al
    fetch("http://localhost:8080/cars")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCars(data));
        //console.log(data[0].carName);
      })
      .catch((error) => {
        console.error("araba fetchleme hatası:", error);
      });
  }, [dispatch]);

  const currentCards = carsTumu;

  const filteredCars = currentCards.filter((car) => {
    // Markalar ve vites tiplerine göre filtreleme yap
    const yakitMatch =
      selectedYakit.length === 0 || selectedYakit.includes(car.yakitTipi);
    const markaMatch =
      selectedMarkalar.length === 0 || selectedMarkalar.includes(car.marka);
    const vitesMatch =
      selectedVites.length === 0 || selectedVites.includes(car.vitesTipi);

    const minFiyatMatch = selectedMinFiyat <= car.fiyat;
    const maxFiyatMatch = selectedMaxFiyat >= car.fiyat;

    // Model yılına göre filtreleme yap
    const minModelMatch = selectedMinYil <= car.modelYili;
    const maxModelMatch = selectedMaxYil >= car.modelYili;

    const minKmMatch = selectedMinKm <= car.km;
    const maxKmMatch = selectedMaxKm >= car.km;

    const renkMatch =
      selectedRenk.length === 0 || selectedRenk.includes(car.renk);

    // Markalar ve vites tipleri filtre kriterlerine uygunsa arabayı listeye ekle
    return (
      yakitMatch &&
      markaMatch &&
      vitesMatch &&
      minFiyatMatch &&
      maxFiyatMatch &&
      minModelMatch &&
      maxModelMatch &&
      minKmMatch &&
      maxKmMatch &&
      renkMatch
    );
  });

  // filteredCars'ın uzunluğunu Redux store'a geçirme
  useEffect(() => {
    dispatch(setFilteredCarCount(filteredCars.length)); //setFilteredCarCount statei değişeceği için dispatch kullanıldı.
  }, [filteredCars.length]); //filteredCars.length değiştiğinde bu hook çalışacak

  // if (filteredCars.length === 0) {
  //   alert("Filtrelerinize uygun araba bulunamadı!");
  // }

  console.log("selectedMarkalar:", selectedMarkalar);
  console.log("selectedVites:", selectedVites);
  console.log("selectedYakit:", selectedYakit);
  console.log("filteredCars", filteredCars);

  return (
    <Box>
      <Box
        bgcolor="#BAD0D5"
        p={2}
        sx={{
          borderRadius: "15px",
          marginTop: { xs: "40px", md: "130px" },
          marginBottom: "10px",
        }}
      >
        <Box
          color="rgb(9 102 170)"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <InfoOutlinedIcon
            fontSize="small"
            sx={{
              marginRight: "15px",
              boxShadow: "1px 3px 20px 5px rgb(9 102 170)",
              borderRadius: "50px",
            }}
          ></InfoOutlinedIcon>
          Hemen Al Fiyatlarımıza KDV ve tüm hizmet bedelleri dahildir.
        </Box>
      </Box>

      <div>
        {filteredCars == "" && "Filtrelerinize uygun araba bulunamadı!"}

        {filteredCars != "" &&
          filteredCars.map((car, index) => (
            <Card key={index} sx={{ display: "flex", boxShadow: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                  height: { xs: "320px", md: "200px" },
                  borderBottom: "1px solid lightgrey",
                  marginBottom: "15px",
                  boxSizing: "border-box",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: "60%", md: "100%" },
                    width: { xs: "100%", md: "35%" },
                    objectFit: { xs: "contain", md: "fill" },
                  }}
                  image={car.carPhoto}
                  alt=""
                />

                <CardContent
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="black"
                      component="div"
                      sx={{ fontSize: "25px", fontWeight: "600" }}
                    >
                      {car.carName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="black"
                      component="div"
                      sx={{
                        display: { xs: "none", md: "block" },
                        fontSize: "12px",
                      }}
                    >
                      Satış Fiyatı/TL
                      <InfoOutlinedIcon fontSize="small" color="success" />
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="black"
                      component="div"
                      sx={{
                        display: { xs: "none", md: "block" },
                        fontSize: "13px",
                      }}
                    >
                      {car.model}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="black"
                      component="div"
                      sx={{ fontWeight: 600, fontSize: "18px" }}
                    >
                      {car.fiyat} TL
                      <InfoOutlinedIcon fontSize="small" color="success" />
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="black"
                      component="div"
                      sx={{
                        display: { xs: "none", md: "block" },
                        fontSize: "15px",
                      }}
                    >
                      {car.modelYili} | {car.km} KM | {car.vitesTipi} |{" "}
                      {car.yakitTipi} | {car.renk} | {car.lokasyon}
                    </Typography>

                    <Button
                      sx={{
                        backgroundColor: "#00bc70",
                        color: "white",
                        borderRadius: "30px",
                        padding: 1,
                        fontWeight: "bold",
                        fontSize: "10px",
                        textTransform: "capitalize",
                        cursor: "pointer",
                      }}
                    >
                      Hemen Al
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
      </div>
    </Box>
  );
}

export default Main;
