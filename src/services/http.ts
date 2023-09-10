import axios from "axios";

const http = axios.create({
  //   baseURL: process.env.BASE_URL,
  timeout: 9000,
});

http.defaults.baseURL = process.env.NEXT_APP_BASE_URL;

// if (window && window.localStorage) {
//   http.defaults.headers.common["Authorization"] =
//     localStorage.getItem("access_token");
// }

export default http;
