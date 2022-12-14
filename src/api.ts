import dayjs from "dayjs";

/**
 * 오늘 날짜 가져오기
 * day.js
 * format YYYYMMDD or YYYY-MM-DD
 * hour get(hour)-1 (결과발표 시관 관련)
 */
const today = dayjs().format("YYYYMMDD");
const todayFormatDash = dayjs().format("YYYY-MM-DD");
const currentHour = dayjs().get("hour") - 1;
console.log(today);
console.log(todayFormatDash);
console.log(currentHour);

/**
 * 현재 위치가져오기
 */
function getGeo() {
  console.log("지역 탐색 시작");
  // Geolocation API에 액세스할 수 있는지를 확인
  if (navigator.geolocation) {
    //위치 정보를 얻기
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos.coords.latitude); // 위도
      console.log(pos.coords.longitude); // 위도
    });
  } else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  }
}

getGeo();
console.log("지역 탐색 종료");
const API_KEY =
  "l72zwz6RqrexXr8a4wslQsw%2Bx0zTGnE5R1sSf26aPRPOQytFjk3AkCOTfssOo1TQ8xQoimJbfkfYL6YZr%2FssIw%3D%3D";

//측정소 위치 찾기
const STATION_NAME_BASIC = "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc";

const TM_geo = "/getTMStdrCrdnt";

//일기예보 기본 패쓰
const WEATHER_PATH_BASIC =
  "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

//미세먼지 기본 패쓰
const DUST_PATH_BASIC = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

//측정소별 실시간 미세먼지 데이터
const DUST_URL = "/getCtprvnRltmMesureDnsty";

//미세먼지 예측 예보
const Frcst_URL = "/getMinuDustFrcstDspth";

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

interface IDustFcst {
  dataTime: string;
  informCause: string; //"○ [미세먼지] 원활한 대기 확산으로 대기 상태가 청정할 것으로 예상됩니다."
  informCode: string; // "PM10" or "PM25" or "O3"
  informData: string; //"2022-10-10" //예측을 한 날짜
  informGrade: string; // "서울 : 좋음,제주 : 좋음,전남 : 좋음,전북 : 좋음,광주 : 좋음,경남 : 좋음,경북 : 좋음,울산 : 좋음,대구 : 좋음,부산 : 좋음,충남 : 좋음,충북 : 좋음,세종 : 좋음,대전 : 좋음,영동 : 좋음,영서 : 좋음,경기남부 : 좋음,경기북부 : 좋음,인천 : 좋음"
  informOverall: string; //"○ [미세먼지] 전 권역이 '좋음'으로 예상됩니다."
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

export interface IGetDustFcstResult {
  response: {
    body: {
      items: IDustFcst[];
    };
  };
}

export function getWeatherFcst() {
  return fetch(
    `${WEATHER_PATH_BASIC}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=${
      currentHour < 10 ? `0` + currentHour : currentHour
    }00&nx=55&ny=127`
  ).then((response) => response.json());
}

export function getDust() {
  return fetch(
    `${DUST_PATH_BASIC}${DUST_URL}?serviceKey=${API_KEY}&numOfRows=100&returnType=json&ver=1.3&sidoName=${encodeURIComponent(
      "강원"
    )}`
  ).then((response) => response.json());
}

export function getDustFcst() {
  return fetch(
    `${DUST_PATH_BASIC}${Frcst_URL}?serviceKey=${API_KEY}&numOfRows=100&returnType=json&searchDate=${todayFormatDash}&InformCode=PM10`
  ).then((response) => response.json());
}

export function getStationNAme() {
  return fetch(`${STATION_NAME_BASIC}${TM_geo}`);
}
