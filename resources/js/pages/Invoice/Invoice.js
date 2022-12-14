import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import invoiceApi from '../../apis/invoiceApI';
import Layout from '../../components/Layout';
import ModalInvoiceUpdate from './ModalInvoiceUpdate';

function Invoice(props) {
    const [data, setData] = useState();
    const [type, setType] = useState(1);
    const [invoice, setInvoice] = useState();
    useEffect(() => {
        loadData();
    }, [])
    const columns = [
        {
            name: 'Mã phiếu',
            selector: row => row.MaPhieu,
        },
        {
            name: 'Khách hàng',
            selector: row => row.khachhang.HoTen,
        },
        {
            name: 'Địa chỉ',
            selector: row => row.khachhang.Diachi,
        },
        {
            name: 'Tổng tiền',
            selector: row => row.TongTien,
        },
        {
            name: 'Bán lẻ/sỉ',
            cell: function (row) {
                return row.LoaiPhieu == 1 ? "Bán lẻ" : "Bán sỉ"
            }
        },
        {
            name: "Thao tác",
            cell: function (row) {
                return <><button onClick={() => edit(row, row.LoaiPhieu)} className='btn btn btn-sm btn-info m-1'><i className='fa fa-edit'></i></button><button onClick={() => destroy(row.id)} className='btn btn btn-sm btn-danger'><i className='fa fa-trash'></i></button></>
            }
        }
    ]
    function loadData() {
        invoiceApi.list().then(res => {
            setData(res)
        })
    }
    function destroy(id) {
        swal({
            text: 'Bạn có muốn xóa hóa đơn này không',
            title: 'Bạn có muốn xóa hóa đơn này không',
            icon: "warning",
            buttons: true, closeOnClickOutside: true
        }).then(isConfirm => {
            if (isConfirm) {
                invoiceApi.destroy(id).then(res => {
                    toast.success(res.msg)
                    loadData()
                })
            }
        })
    }

    function edit(invoice, type) {
        setInvoice(invoice)
        setType(type)
        $('#modal-invoice').modal('show')
    }


    return (
        <Layout>
            <div className='col-12'>
                <DataTable columns={columns} data={data} />
                <ModalInvoiceUpdate phieu={invoice} type={type} refresh={loadData} />
            </div>
        </Layout>
    );
}

export default Invoice;