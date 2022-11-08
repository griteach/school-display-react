const API_KEY =
  "l72zwz6RqrexXr8a4wslQsw%2Bx0zTGnE5R1sSf26aPRPOQytFjk3AkCOTfssOo1TQ8xQoimJbfkfYL6YZr%2FssIw%3D%3D";
const WEATHER_PATH =
  "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

const DUST_PATH =
  "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

//?&returnType=json&numOfRows=100&pageNo=1&stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=DAILY&ver=1.0

//일기예보 interface
interface IFcst {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

interface IDust {
  dataTime: string;
  khaiGrade: string; //통합대기환경수치 1좋음 2보통 3나쁨 4매우나쁨
  khaiValue: string;
  pm10Grade: string; //미세먼지 PM10 24시간 등급 자료
  pm10Grade1h: string; //미세먼지 PM10 1시간 등급 자료
  pm10Value: string;
  pm10Value24: string;
  pm25Grade: string;
  pm25Grade1h: string;
  pm25Value: string;
  pm25Value24: string;
  sidoName: string;
  stationName: string;
}

export interface IGetFcstResult {
  response: {
    body: {
      items: {
        item: IFcst[];
      };
    };
  };
}

export interface IGetDustResult {
  response: {
    body: {
      items: IDust[];
    };
  };
}

export function getFcst() {
  return fetch(
    `${WEATHER_PATH}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20221108&base_time=1900&nx=55&ny=127`
  ).then((response) => response.json());
}

export function getDust() {
  return fetch(
    `${DUST_PATH}?serviceKey=${API_KEY}&numOfRows=100&returnType=json&ver=1.3&sidoName=${encodeURIComponent(
      "강원"
    )}`
  ).then((response) => response.json());
}
