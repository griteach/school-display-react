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
          {fcstDataArray
            ? fcstDataArray?.map((item, key) => (
                <div key={key}>
                  <p>기본시각: {item.baseTime}</p>
                  <p>카테고리: {item.category}</p>
                  <p>nx: {item.nx}</p>
                  <p>ny: {item.ny}</p>
                  <p>관측값: {item.obsrValue}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      ;
      <div>
        <h1>DustData</h1>
        <div>
          {dustDataArray
            ? dustDataArray?.map((item, key) => (
                <div key={key}>
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
              ))
            : null}
          ;
        </div>
      </div>
      ;
      <div>
        <h1>DustFcstData</h1>
        <div>
          {dustFcstDataArray
            ? dustFcstDataArray.map((item, key) => (
                <div key={key}>
                  <p>{item.informCause}</p>
                  <p>{item.informCode}</p>
                  <p>{item.informData}</p>
                  <p>{item.informGrade}</p>
                  <p>{item.informOverall}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      ;
    </>
  );
}

export default App;
