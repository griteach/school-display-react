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
      <div>
        <h1>FcstData</h1>
        <p>
          <p>{fcstData?.response.body.items.item[0].category}</p>
          <p>{fcstData?.response.body.items.item[0].baseTime}</p>
          <p>{fcstData?.response.body.items.item[0].nx}</p>
          <p>{fcstData?.response.body.items.item[0].ny}</p>
          <p>{fcstData?.response.body.items.item[0].obsrValue}</p>
        </p>
      </div>
      ;
      <div>
        <h1>DustData</h1>
        <p>
          <p>{dustData?.response.body.items[0]?.dataTime}</p>
          <p>{dustData?.response.body.items[0].pm10Grade}</p>
          <p>{dustData?.response.body.items[0].pm10Grade1h}</p>
          <p>{dustData?.response.body.items[0].pm10Value}</p>
          <p>{dustData?.response.body.items[0].pm10Value24}</p>
          <p> {dustData?.response.body.items[0].pm25Grade}</p>
          <p>{dustData?.response.body.items[0].pm25Grade1h}</p>
          <p>{dustData?.response.body.items[0].pm25Value}</p>
          <p>{dustData?.response.body.items[0].pm25Value24}</p>
          <p>{dustData?.response.body.items[0].khaiGrade}</p>
          <p>{dustData?.response.body.items[0].khaiValue}</p>
        </p>
      </div>
      ;
      <div>
        <h1>DustFcstData</h1>
        <p>{dustFcstData?.response.body.items[0].informOverall}</p>
      </div>
      ;
    </>
  );
}

export default App;
