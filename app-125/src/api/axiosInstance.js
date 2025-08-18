import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3002",
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------- 요청 인터셉터 -------------------- */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


/* -------------------- 응답 인터셉터 -------------------- */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn("토큰이 만료되었습니다. 로그인 페이지로 이동합니다.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      if (status >= 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
