import React from "react";
import { useQuery } from "react-query";
import {
  getDust,
  getWeatherFcst,
  IGetFcstResult,
  IGetDustResult,
  getDustFcst,
  IGetDustFcstResult,
} from "./api";

function App() {
  const { data: fcstData, isLoading: fcstIsLoading } = useQuery<IGetFcstResult>(
    "fcst",
    getWeatherFcst
  );
  const { data: dustData, isLoading: dustIsLoading } = useQuery<IGetDustResult>(
    "dust",
    getDust
  );
  const { data: dustFcstData, isLoading: dustFcstIsLoading } =
    useQuery<IGetDustFcstResult>("dustFcst", getDustFcst);
  console.log(fcstData, fcstIsLoading);
  console.log(dustData, dustIsLoading);
  console.log(dustFcstData, dustFcstIsLoading);
  return (
    <>
      <div>{fcstData?.response.body.items.item[0].category}</div>;
      <div>{dustData?.response.body.items[0].pm10Value}</div>;
      <div>{dustFcstData?.response.body.items[0].informOverall}</div>;
    </>
  );
}

export default App;
