import React from "react";
import { useQuery } from "react-query";
import { getDust, getFcst, IGetFcstResult, IGetDustResult } from "./api";

function App() {
  const { data: fcstData, isLoading: fcstIsLoading } = useQuery<IGetFcstResult>(
    "fcst",
    getFcst
  );
  const { data: dustData, isLoading: dustIsLoading } = useQuery<IGetDustResult>(
    "dust",
    getDust
  );
  console.log(fcstData, fcstIsLoading);
  console.log(dustData, dustIsLoading);
  return (
    <>
      <div>{fcstData?.response.body.items.item[0].category}</div>;
      <div>{dustData?.response.body.items[0].pm10Value}</div>;
    </>
  );
}

export default App;
