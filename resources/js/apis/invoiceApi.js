import axiosClient from "./axiosClient";
const invoiceApi = {
    list: async function () {
        return axiosClient.get("invoice/list")
    },
    save: async function (data) {
        return axiosClient.post("invoice/save", data)
    },
    destroy: async function (id) {
        return axiosClient.get(`invoice/delete/${id}`)
    },
}

export default invoiceApi;