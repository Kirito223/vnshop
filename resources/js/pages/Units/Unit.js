import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Toolbar from '../../components/Toolbar/Toolbar';
import ModalUnit from './ModalUnit';
import UnitController from './UnitController';
import DataTable from 'react-data-table-component';
import unitApi from '../../apis/unitApi';
import swal from 'sweetalert'
import { toast } from 'react-toastify';

function Unit(props) {
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState(null)
    const menu = [{
        name: "Thêm mới",
        function: function () {
            setUnit(null)
            $('#modal-unit').modal('show')
        }
    },
        //  {
        //     name: "Xuất Excel",
        //     function: function () {

        //     }
        // },
        //  {
        //     name: "Nhập excel",
        //     function: function () {

        //     }
        // }
    ]

    const columns = [
        {
            name: 'Tên đơn vị tính',
            selector: row => row.TenDonVi,
        },
        {
            name: 'Hành động',
            button: true, cell: (row) => <><button data-id={row.TenDonVi} onClick={() => {
                unitInfo(row)
            }} className='btn btn btn-sm btn-info mr-1 btn-edit'><i className='fa fa-edit'></i></button><button data-id={row.TenDonVi} onClick={() => destroy(row.id)} className='btn btn btn-sm btn-danger btn-del'><i className='fa fa-trash'></i></button></>,
        },
    ];
    function destroy(id) {
        swal({
            title: "Bạn có muốn xóa đơn vị này không",
            text: "Xóa đơn vị",
            icon: "warning",
            buttons: true
        }).then(isConfirm => {
            if (isConfirm) {
                unitApi.destroy(id).then(res => {
                    toast.success(res.msg)
                    loadData();
                }).catch(err => {
                    console.error(err)
                    toast.error("Đã có lỗi xảy ra vui lòng thử lại sau")
                })
            }
        });
    }
    function unitInfo(unit) {
        setUnit(unit)
        $('#modal-unit').modal('show')
    }
    function loadData() {
        unitApi.list().then(res => {
            setData(res)
        })
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <Layout>
            <div className='col-12'>
                <Toolbar menu={menu} />
            </div>
            <div className='col-12'>
                <DataTable
                    columns={columns}
                    data={data} pagination
                />
            </div>
            <ModalUnit refresh={loadData} unit={unit} />
        </Layout>
    );
}

export default Unit;