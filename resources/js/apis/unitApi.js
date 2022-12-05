import axiosClient from "./axiosClient";
const unitApi = {
    list: async function () {
        return axiosClient.get("unit/list")
    },
    save: async function (data) {
        return axiosClient.post("unit/save", data)
    },
    destroy: async function (id) {
        return axiosClient.get(`unit/delete/${id}`)
    }
}

export default unitApi;