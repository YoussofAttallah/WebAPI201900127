// Handle Imports
const axios = require("axios");
const express = require("express");
const router = express.Router();
const sql = require("mysql");
var connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "TKH_123456",
  database: "todo_list",
});
connection.connect();
// WEATHER API
router.get("/weather/get/:country", function (req, res) {
  let country = req.params.country;
  console.log(country);
  let link =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    "cairo" +
    "&appid=4136858c9330499c48693dc2d4e2555a&units=metric";
  console.log(link);
  axios
    .get(link)
    .then((data) => {
      console.log("Here in API");
      console.log(data);
      res.send(data.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Countries for Database and admin login
//Post => add countries to database
router.post("/countries/add", function (req, res) {
  let CountName = req.body.CountName;
  let Continent = req.body.Continent;
  let FlagAlt = req.body.FlagAlt;
  let FlagPng = req.body.FlagPng;
  let FlagSvg = req.body.FlagSvg;
  let CountLanguage = req.body.Continent;
  console.log(FlagPng);
  connection.query(
    "insert into Countries (CountName, Continent, FlagAlt, FlagPng, FlagSvg, CountLanguage) values (?,?,?,?,?,?)",
    [CountName, Continent, FlagAlt, FlagPng, FlagSvg, CountLanguage],
    // "insert into Countries (CountName,FlagPng) values (?,?)",
    // [CountName, FlagPng],
    (err, result) => {
      if (err) throw err;
      else {
        res.send("New Country is added successfully!");
      }
    }
  );
});
//GET => get country data
router.get("/countries/get/:name", function (req, res) {
  let countryName = req.params.name;
  console.log(countryName);
  connection.query(
    "select * from countries where countName = ?",
    countryName,
    (err, result) => {
      if (err) {
        res.send("error in the connection");
      } else {
        res.send(result);
      }
    }
  );
});

// MEAL API
router.get("/foods/:country", function (req, res) {
  const country = req.params.country;
  connection.query(
    "select * from foods where country = ?",
    country,
    (err, result) => {
      if (err) {
        res.send("error in the connection");
      } else {
        res.send(result);
      }
    }
  );
});
router.get("/meals/:region", function (req, res) {
  const region = req.params.region;
  console.log(region);
  axios
    .get(`www.themealdb.com/api/json/v1/1/filter.php?a=${region}`)
    .then((data) => {
      res.send(data.data);
      console.log(data.data);
    })
    .catch((err) => console.log(err));
});

// Currency API
router.get("/currencies/getdb/:countryname", function (req, res) {
  let countryName = req.params.countryname;
  console.log(countryName);
  connection.query(
    "SELECT * FROM currencies where countryName = ?",
    countryName,
    (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    }
  );
});
router.get("/currencies/getws/:currencyName", function (req, res) {
  let currencyName = req.params.currencyName;
  let link = `https://free.currconv.com/api/v7/convert?q=EGP_${currencyName}&compact=ultra&apiKey=b2b47be62b99cb7b9029`;
  axios
    .get(link)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/currencies/add", function (req, res) {
  let CountName = req.body.CountName;
  let CurrencyName = req.body.CurrencyId;
  let CurrencyID = req.body.CurrencyName;
  let CurrencySymbol = req.body.CurrencySymbol;
  connection.query(
    "insert into currencies (CountryName, currencyName, currencyID ,currencySymbol) values (?,?,?,?)",
    [CountName, CurrencyName, CurrencyID, CurrencySymbol],
    (err, result) => {
      if (err) throw err;
      else {
        res.send("New Currency is added successfully!");
      }
    }
  );
});
// Search
router.get("/search/bybudget/:budget", function (req, res) {
  let budget = req.params.budget;
  console.log(budget);
  let days = req.query.days;
  console.log(days);
  connection.query(
    "select country,city,travelCost,accommodationCost,activitiesCost, sum(travelCost+accommodationCost*?+activitiesCost*?)>? as totalCost from travel group by country,city,travelCost,accommodationCost,activitiesCost",
    [days, days, budget],
    (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    }
  );
});
router.get("/search/bycountry/:country", function (req, res) {
  let countryname = req.params.country;
  console.log(countryname);
  connection.query(
    "select * from travel where country = ?",
    countryname,
    (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    }
  );
});
// const getcountries = () => {
//   axios
//     .get(`https://restcountries.com/v3.1/all`)
//     .then((res) => {
//       console.log(res.data);
//       res.data.forEach((county) => {
//         //console.log(county["continents"]);
//         var countryName = county["name"]["common"];
//         var countryContinent = county["continents"];
//         var flagAlt = county["flags"]["alt"];
//         var flagPng = county["flags"]["png"];
//         var flagSvg = county["flags"]["svg"];
//         // console.log(county["flags"]["svg"]);
//         var countryLanguage = county["language"];
//         var count = [countryName, flagPng];
//         addCountries(
//           countryName,
//           countryContinent,
//           flagAlt,
//           flagPng,
//           flagSvg,
//           countryLanguage
//         );
//       });
//     })
//     .catch((err) => console.log(err));
// };
// to be able to use the API in the index file
module.exports = router;
