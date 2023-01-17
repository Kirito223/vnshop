import axiosClient from "./axiosClient";
const productApi = {
    list: async function () {
        return axiosClient.get("product/list")
    },
    save: async function (data) {
        return axiosClient.post("product/save", data)
    },
    destroy: async function (id) {
        return axiosClient.get(`product/delete/${id}`)
    },
    info: async function (id) {
        return axiosClient.get(`product/info/${id}`)
    },
    report: async function () {
        return axiosClient.get(`product/report`)
    }
}

export default productApi;