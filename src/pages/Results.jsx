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

const Results = () => {
  const location = useLocation();
  const [value, setValue] = useState();
  const handleValue = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setValue(result);
  };
  return (
    <div>
      {location.state.price.map((city) => {
        console.log(city);
        return (
          <Card>
            <CardImg
              alt={location.state.country[0]["FlagAlt"]}
              src={location.state.country[0]["FlagSvg"]}
            />
            <CardBody className="p-4">
              <CardTitle tag="h5">
                {city["country"]}
                {", " + city["city"]}
              </CardTitle>
              <CardSubtitle>{}</CardSubtitle>
              <CardText className="mt-3">
                Travel Cost: {city["travelCost"]} Round Trip
              </CardText>
              <CardText className="mt-3">
                Accommodations Cost: {city["accommodationCost"]} Per Night
              </CardText>
              <CardText className="mt-3">
                Accommodations Total:
                {city["accommodationCost"] * location.state.days}
              </CardText>
              <CardText className="mt-3">
                Activities Cost: {city["activitiesCost"]} Per Night
              </CardText>
              <CardText className="mt-3">
                Activities Total: {city["activitiesCost"] * location.state.days}{" "}
              </CardText>
              <CardText className="mt-3">
                Average Temperature: {location.state.weather["main"]["temp"]}
              </CardText>
              <CardText className="mt-3">
                Feels Like: {location.state.weather["main"]["feels_like"]}
              </CardText>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">EGP</InputAdornment>
                  ),
                }}
                keyboardType="numeric"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={value}
                onChange={handleValue}
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                disabled
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {location.state.symbol}
                    </InputAdornment>
                  ),
                }}
                value={
                  value *
                  location.state.currency[Object.keys(location.state.currency)]
                }
              />
              <Button onClick={console.log(location.state.symbol)}>
                Read More
              </Button>
            </CardBody>
          </Card>
        );
      })}

      <Button onClick={() => console.log(location.state.days)}>
        Read More
      </Button>
    </div>
  );
};

export default Results;
