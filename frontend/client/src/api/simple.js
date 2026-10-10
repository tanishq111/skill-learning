import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // required for the httpOnly refresh cookie to travel
});


// all out going requests will have the Authorization header set if a token is available
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});


const REFRESH_URL = "/auth/refresh";

const endSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Shared across concurrent 401s so we only ever refresh once at a time.
let refreshPromise = null;

// Success and failure both resolve to the SAME envelope shape, so callers
// check `ok` instead of using try/catch.
api.interceptors.response.use(
    (response) => ({
        ok: true,
        status: response.status,
        data: response.data,
    }),
    async (error) => {
        const original = error.config || {};
        const url = original.url || "";
        const status = error.response?.status;
        const code = error.response?.data?.code;

        const failure = {
            ok: false,
            status: status || 0,
            error:
                error.response?.data?.error ||
                (error.response ? "An error occurred" : "Cannot reach the server."),
        };

        const isAuthAttempt = url.includes("/login") || url.includes("/register");
        const isRefreshCall = url.includes(REFRESH_URL);

        // A failed login is not an expired session.
        if (status !== 401 || isAuthAttempt) {
            return failure;
        }

        if (code === "TOKEN_INVALID") {
            endSession();
            return failure;
        }

        // The refresh call itself 401'd, or we already retried this request.
        if (isRefreshCall || original._retried) {
            endSession();
            return failure;
        }

        original._retried = true;

        // mechanism to refresh the token if it has expired
        refreshPromise =
            refreshPromise ||
            api
                .post(REFRESH_URL)
                .finally(() => {
                    refreshPromise = null;
                });

        const refreshed = await refreshPromise;

        if (!refreshed.ok || !refreshed.data?.token) {
            endSession();
            return failure;
        }

        localStorage.setItem("token", refreshed.data.token);
        if (refreshed.data.user) {
            localStorage.setItem("user", JSON.stringify(refreshed.data.user));
        }

        return api(original); // replay the original request with the new token
    }
);
export default api;