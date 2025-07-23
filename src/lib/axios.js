import Axios from "axios";

Axios.defaults.withCredentials = true;
Axios.defaults.withXSRFToken = true;

const axios = Axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
});

export default axios;
