import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import customerApi from '../../apis/customerApi';
import Layout from '../../components/Layout';
import Toolbar from '../../components/Toolbar/Toolbar';
import ModalCustomer from './ModalCustomer';
function Customer(props) {
    const [data, setData] = useState([])
    const [customer, setCustomer] = useState(null)

    function loadData() {
        customerApi.list().then(res => {
            setData(res)
        })
    }
    useEffect(() => {
        loadData();
    }, [])
    const menu = [{
        name: "Thêm mới",
        function: function () {
            setCustomer(null)
            $('#modal-customer').modal('show')
        }
    }]

    function destroy(id) {
        swal({ title: "Bạn có muốn xóa khách hàng này không", text: "Xác nhận xóa khách hàng", icon: "warning", buttons: true, closeOnClickOutside: true }).then(isConfirm => {
            if (isConfirm) {
                customerApi.destroy(id).then(res => {
                    toast.success(res.msg)
                    loadData();
                })
            }
        })
    }
    const columns = [
        {
            name: 'Họ và tên',
            selector: row => row.HoTen,
        },
        {
            name: 'Địa chỉ',
            selector: row => row.DiaChi,
        },
        {
            name: 'Số điện thoại',
            selector: row => row.SoDienThoai
        },
        {
            name: "Thao tác",
            cell: function (row) {
                return <><button onClick={() => setCustomer(row)} className='btn btn btn-sm btn-info mr-1'><i className='fa fa-edit'></i></button><button onClick={() => destroy(row.id)} className='btn btn btn-sm btn-danger'><i className='fa fa-trash'></i></button></>
            }
        }
    ]
    return (
        <Layout>
            <div className='col-12'>
                <Toolbar menu={menu} />
            </div>
            <div className='col-12'>
                <DataTable columns={columns} data={data} pagination />
            </div>
            <ModalCustomer customer={customer} refresh={loadData} />
        </Layout>
    );
}

export default Customer;