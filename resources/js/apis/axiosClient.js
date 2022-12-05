import axios from 'axios'
export const baseURL = window.location.origin;
const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
})

axiosClient.interceptors.request.use((config) => {
    // config.params = config.params || {};
    // config.params['token'] = localStorage.token;
    // config.params['user'] = localStorage.userId;
    // config.params["branch"] = localStorage.branchId;
    return config;
});
axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default axiosClient