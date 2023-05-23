import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
//import DatePicker from "react-date-picker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

//import $, { data } from "jquery";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import { create } from "@mui/material/styles/createTransitions";
const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const ByCountry = () => {
  const navigate = useNavigate();
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
  const [EndDate, setEndDate] = useState(new Date());
  const [StartDate, setStartDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState();
  const [budget, setBudget] = useState(0);
  const getCountryInfo = async () => {
    await axios
      .get(`http://localhost:8080/api/countries/get/${country}`)
      .then((res) => {
        CountryInfo = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountryPrice = async () => {
    await axios
      .get(`http://localhost:8080/api/search/bycountry/${country}`)
      .then((res) => {
        CountryPrice = res.data;
      })
      .catch((err) => console.log(err));
  };
  const getCountryBudget = async () => {
    await axios
      .get(`http://localhost:8080/api/search/bybudget/${budget}`, {
        params: { days: Days },
      })
      .then((res) => {
        Budget = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getWeather = async () => {
    await axios
      .get(`http://localhost:8080/api//weather/get/${country}`, {
        params: { country: country },
      })
      .then((res) => {
        Weather = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCurrencyName = async () => {
    await axios
      .get(`http://localhost:8080/api//currencies/getdb/${country}`)
      .then((res) => {
        CurrencyName = res.data[0]["currencyName"];
        CurrencySymbol = res.data[0]["currencySymbol"];
      })
      .catch((err) => console.log(err));
  };
  const getCurrencyConversion = async () => {
    await getCurrencyName();
    await axios
      .get(`http://localhost:8080/api//currencies/getws/${CurrencyName}`)
      .then((res) => {
        currencyData = res.data;
      })
      .catch((err) => console.log(err));
  };
  const getFood = async () => {
    await axios
      .get(`http://localhost:8080/api/foods/${country}`)
      .then((res) => {
        FoodType = res.data[0]["food"];
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMeal = async () => {
    await getFood();
    await axios
      .get(`http://localhost:8080/api/meals/${FoodType}`)
      .then((res) => {
        Meals = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1></h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Country"
          value={country}
          onChange={(country) => {
            setCountry(country.target.value);
            console.log(country.target.value);
          }}
        >
          <MenuItem value={"Egypt"}>Egypt</MenuItem>
          <MenuItem value={"London"}>London</MenuItem>
          <MenuItem value={"Berlin"}>Berlin</MenuItem>
          <MenuItem value={"India"}>India</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          views={["year", "month", "day"]}
          label="Start Date"
          onChange={(startDate) => {
            setStartDate(startDate);
            console.log(StartDate);
          }}
        />
        <DatePicker
          disablePast
          views={["year", "month", "day"]}
          label="End Date"
          onChange={(endDate) => {
            setEndDate(endDate);
          }}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Budget</InputLabel>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Budget"
          value={budget}
          onChange={(budget) => {
            setBudget(budget.target.value);
            console.log(budget.target.value);
          }}
        >
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={25000}>25000</MenuItem>
          <MenuItem value={50000}>50000</MenuItem>
        </Select> */}
      </FormControl>
      <Button
        onClick={async () => {
          await getCountryInfo();
          await getCountryPrice();
          await getCurrencyConversion();
          await getWeather();
          const daysBetween = dayjs(EndDate["$d"]) - dayjs(StartDate["$d"]);
          Days = daysBetween / (1000 * 60 * 60 * 24);
          // await getCountryBudget();
          //await getMeal();
          navigate("/Results", {
            state: {
              symbol: CurrencySymbol,
              country: CountryInfo,
              weather: Weather,
              price: CountryPrice,
              currency: currencyData,
              days: daysBetween / (1000 * 60 * 60 * 24),
            },
          });
        }}
      ></Button>
      <h1>{weather}</h1>
      {/* <Card>
          <CardBody>
            <CardTitle tag="h5">Feeds</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Widget you can use
            </CardSubtitle>
            <ListGroup flush className="mt-4">
              {FeedData.map((feed, index) => (
                <ListGroupItem
                  key={index}
                  action
                  href="/"
                  tag="a"
                  className="d-flex align-items-center p-3 border-0"
                >
                  <Button
                    className="rounded-circle me-3"
                    size="sm"
                    color={feed.color}
                  >
                    <i className={feed.icon}></i>
                  </Button>
                  {feed.title}
                  <small className="ms-auto text-muted text-small">
                    {feed.date}
                  </small>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card> */}
    </div>
  );
};

export default ByCountry;
// const getAllCurrencies = () => {
//   axios
//     .get(
//       "https://free.currconv.com/api/v7/countries?&apiKey=b2b47be62b99cb7b9029"
//     )
//     .then((res) => {
//       Object.keys(res.data.results).map((key) => {
//         let county = res.data.results[key];
//         console.log(county);

//         console.log("HEre in map");
//         var countryName = county["name"];
//         console.log(countryName);
//         var currencyName = county["currencyName"];
//         var currencyID = county["currencyId"];
//         var currencySymbol = county["currencySymbol"];
//         addCurrency(countryName, currencyID, currencyName, currencySymbol);
//       });
//     })
//     .catch((err) => console.log(err));
// };
// const addCountries = (
//   countName,
//   continent,
//   flagAlt,
//   flagPng,
//   flagSvg,
//   countLanguage
// ) => {
//   console.log("In addCOuntries", countName);
//   axios
//     .post("http://localhost:8080/api/countries", {
//       CountName: countName,
//       Continent: continent,
//       FlagAlt: flagAlt,
//       FlagPng: flagPng,
//       FlagSvg: flagSvg,
//       CountLanguage: countLanguage,
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// };
// const addCurrency = (countName, currencyId, currencyName, currencySymbol) => {
//   axios
//     .post("http://localhost:8080/api/currencies", {
//       CountName: countName,
//       CurrencyId: currencyId,
//       CurrencyName: currencyName,
//       CurrencySymbol: currencySymbol,
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// };
