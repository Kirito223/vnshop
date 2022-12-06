import axiosClient from "./axiosClient";
const customerApi = {
    list: async function () {
        return axiosClient.get("customer/list")
    },
    save: async function (data) {
        return axiosClient.post("customer/save", data)
    },
    destroy: async function (id) {
        return axiosClient.get(`customer/delete/${id}`)
    },
}

export default customerApi;