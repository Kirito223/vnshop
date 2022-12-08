import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import productApi from '../../apis/productApi';
import Layout from '../../components/Layout';
import Toolbar from '../../components/Toolbar/Toolbar';
import ProductModal from './ProductModal';

function Product(props) {
    const [data, setData] = useState([]);
    const [productId, setProductId] = useState(0);
    const menu = [{
        name: "Thêm mới",
        function: function () {
            setProductId(0)
            $('#modal-product').modal('show')
        }
    }]

    function loadData() {
        productApi.list().then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    function editProduct(productId) {
        setProductId(productId)
        $('#modal-product').modal('show')
    }

    function destroy(id) {
        swal({ title: "Bạn có muốn xóa sản phẩm này không", text: "Xác nhận xóa sản phẩm", icon: "warning", buttons: true }).then(isConfirm => {
            if (isConfirm) {
                productApi.destroy(id).then(res => {
                    toast.success(res.msg)
                    loadData();
                })
            }
        })

    }
    const columns = [
        {
            name: 'Mã sản phẩm',
            selector: row => row.MaSanPham,
        },
        {
            name: 'Tên sản phẩm',
            selector: row => row.TenSanPham,
        },
        {
            name: 'Dơn vị tính',
            selector: row => row.sanphamdonvis.find(s => s.Primary == true).donvitinh.TenDonVi,
        },
        {
            name: 'Giá lẻ',
            selector: row => row.sanphamdonvis.find(s => s.Primary == true).GiaLe,
        },
        {
            name: 'Giá sỉ',
            selector: row => row.sanphamdonvis.find(s => s.Primary == true).GiaSi,
        },
        {
            name: "Thao tác",
            cell: function (row) {
                return <><button onClick={() => editProduct(row.id)} className='btn btn btn-sm btn-info mr-1'><i className='fa fa-edit'></i></button><button onClick={() => destroy(row.id)} className='btn btn btn-sm btn-danger'><i className='fa fa-trash'></i></button></>
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
            <ProductModal refresh={loadData} listProduct={data} productId={productId} />
        </Layout>
    );
}

export default Product;