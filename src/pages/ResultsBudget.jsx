import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const ResultsBudget = () => {
  var Weather;
  var CountryInfo;
  var CountryPrice;
  var CurrencyName;
  var currencyData;
  var CurrencySymbol;
  var Days;
  var Budget;
  var FoodType;
  var Meals;
  const getCountryInfo = async (country) => {
    await axios
      .get(`http://localhost:8080/api/countries/get/${country}`)
      .then((res) => {
        console.log(res.data);
        CountryInfo = res.data;
        console.log(CountryInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const getCountryPrice = async (country) => {
  //   await axios
  //     .get(`http://localhost:8080/api/search/bycountry/${country}`)
  //     .then((res) => {
  //       CountryPrice = res.data;
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const getWeather = async (country) => {
  //   await axios
  //     .get(`http://localhost:8080/api//weather/get/${country}`)
  //     .then((res) => {
  //       Weather = res.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const getCurrencyName = async (country) => {
  //   await axios
  //     .get(`http://localhost:8080/api//currencies/getdb/${country}`)
  //     .then((res) => {
  //       CurrencyName = res.data[0]["currencyName"];
  //       CurrencySymbol = res.data[0]["currencySymbol"];
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const getCurrencyConversion = async () => {
  //   await getCurrencyName(CurrencyName);
  //   await axios
  //     .get(`http://localhost:8080/api//currencies/getws/${CurrencyName}`)
  //     .then((res) => {
  //       currencyData = res.data;
  //     })
  //     .catch((err) => console.log(err));
  // };
  const location = useLocation();
  const [value, setValue] = useState();
  const elements = [];
  const handleValue = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setValue(result);
  };
  return (
    <div>
      {/* {location.state.country.map(async (country) => {
        console.log(country);
        return (
          <Card>
            <CardBody>{country["country"]}</CardBody>
          </Card>
        );
      })} */}
      <Button onClick={() => console.log(location.state.country)}></Button>
      {location.state.country.forEach((country) => {
        return <h1>{country["country"]}</h1>;
      })}
    </div>
  );
};

export default ResultsBudget;
// {
//   location.state.country.map(async (country) => {
//     console.log(country["country"]);
//     <Card>
//       <CardImg />
//       {/* <CardBody className="p-4">
//             <CardTitle tag="h5">
//               {CountryInfo["country"]}
//               {", " + CountryInfo["city"]}
//             </CardTitle>
//             <CardSubtitle>{}</CardSubtitle>
//             <CardText className="mt-3">
//               Travel Cost: {CountryInfo["travelCost"]} Round Trip
//             </CardText>
//             <CardText className="mt-3">
//               Accommodations Cost: {CountryInfo["accommodationCost"]} Per
//               Night
//             </CardText>
//             <CardText className="mt-3">
//               Accommodations Total:
//               {CountryInfo["accommodationCost"] * location.state.days}
//             </CardText>
//             <CardText className="mt-3">
//               Activities Cost: {CountryInfo["activitiesCost"]} Per Night
//             </CardText>
//             <CardText className="mt-3">
//               Activities Total:{" "}
//               {CountryInfo["activitiesCost"] * location.state.days}{" "}
//             </CardText>
//             <CardText className="mt-3">
//               Average Temperature: {Weather["main"]["temp"]}
//             </CardText>
//             <CardText className="mt-3">
//               Feels Like: {Weather["main"]["feels_like"]}
//             </CardText>
//             <TextField
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">EGP</InputAdornment>
//                 ),
//               }}
//               keyboardType="numeric"
//               id="outlined-basic"
//               label="Outlined"
//               variant="outlined"
//               value={value}
//               onChange={handleValue}
//             />
//             <TextField
//               id="outlined-basic"
//               label="Outlined"
//               disabled
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     {location.state.symbol}
//                   </InputAdornment>
//                 ),
//               }}
//               // value={
//               //   value *
//               //   location.state.currency[Object.keys(location.state.currency)]
//               // }
//             />
//             <Button onClick={console.log(location.state.symbol)}>
//               Read More
//             </Button>
//           </CardBody> */}
//     </Card>;
//   });
// }
