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

  /**
   * 결과값 array
   * 1. dustDataArray = 미세먼지 결과
   * 2. dustFcstDataArray = 미세먼지 예보 결과
   * 3. fcstDataArray = 일기예보 결과
   */
  const dustDataArray = dustData?.response.body.items;
  const dustFcstDataArray = dustFcstData?.response.body.items;
  const fcstDataArray = fcstData?.response.body.items.item;

  console.log("일기예보", fcstData, ", ", fcstIsLoading);
  console.log("미세먼지", dustData, ", ", dustIsLoading);
  console.log("먼지예보", dustFcstData, ", ", dustFcstIsLoading);
  return (
    <>
      <div>
        <h1>FcstData</h1>
        <div>
          {fcstDataArray?.map((item, key) => (
            <div>
              <p>기본시각: {item.baseTime}</p>
              <p>카테고리: {item.category}</p>
              <p>nx: {item.nx}</p>
              <p>ny: {item.ny}</p>
              <p>관측값: {item.obsrValue}</p>
            </div>
          ))}
          <p>{fcstData?.response.body.items.item[0].category}</p>
          <p>{fcstData?.response.body.items.item[0].baseTime}</p>
          <p>{fcstData?.response.body.items.item[0].nx}</p>
          <p>{fcstData?.response.body.items.item[0].ny}</p>
          <p>{fcstData?.response.body.items.item[0].obsrValue}</p>
        </div>
      </div>
      ;
      <div>
        <h1>DustData</h1>
        <div>
          {dustDataArray?.map((item, key) => (
            <div>
              <h1>{item.stationName}의 미세먼지 데이터</h1>
              <p>데이터타임: {item.dataTime}</p>
              <p>미세먼지10 등급: {item.pm10Grade}</p>
              <p>미세먼지10 1시간 등급: {item.pm10Grade1h}</p>
              <p>미세먼지10 값: {item.pm10Value}</p>
              <p>미세먼지10 24시간 값: {item.pm10Value24}</p>
              <p>미세먼지25 등급: {item.pm25Grade}</p>
              <p>미세먼지25 1시간 등급: {item.pm25Grade1h}</p>
              <p>미세먼지25 값: {item.pm25Value}</p>
              <p>미세먼지25 값: {item.pm25Value24}</p>
              <p>??: {item.khaiGrade}</p>
              <p>??: {item.khaiValue}</p>
              <p>측정소 이름: {item.stationName}</p>
            </div>
          ))}
          ;
        </div>
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
