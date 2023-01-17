import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../../components/Layout';
import barcode from '../../utils/barcode';
import ScanBarcode from './ScanBarcode';
import customerApi from '../../apis/customerApi'
import productApi from '../../apis/productApi'
import swal from 'sweetalert';
import PrintInvoice from './PrintInvoice';
import invoiceApi from '../../apis/invoiceApI';
import ProductModal from '../Product/ProductModal'
import { toast } from 'react-toastify';
function Sale(props) {
    let params = useParams();
    const defaultInvoice = { NgayLap: new Date(), LoaiPhieu: params.type, TongTien: 0, TongNo: 0, No: 0, khachhangId: 1, MaPhieu: new barcode().genarate(), TenKhachHang: "Khách vãng lai" }
    const [invoice, setInvoice] = useState(defaultInvoice)
    const RETAIL = 1;
    const [customers, setCustomers] = useState([]);
    const [product, setProduct] = useState([]);
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        let clone = { ...invoice }
        let total = 0;
        detail.forEach(item => {
            total += item.total
        })
        clone.TongTien = total
        setInvoice(clone)
    }, [detail])
    function selectProdct(productSelected) {
        let clone = [...detail]
        let check = clone.findIndex(s => s.id == productSelected.id)
        let unit = productSelected.sanphamdonvis.find(s => s.Primary == true);
        if (check == -1) {
            clone.push({
                id: productSelected.id,
                name: productSelected.TenSanPham,
                unit: unit.donvitinh.id,
                price: params.type == RETAIL ? unit.GiaLe : unit.GiaSi,
                quanity: 1,
                total: params.type == RETAIL ? unit.GiaLe : unit.GiaSi,
                listUnit: productSelected.sanphamdonvis,
            })
        } else {
            clone[check].quanity = clone[check].quanity + 1
            clone[check].total = clone[check].quanity * clone[check].price
        }
        setDetail(clone);
    }
    useEffect(() => {
        customerApi.list().then(res => {
            setCustomers(res)
        })
        loadProduct();
    }, [])
    function loadProduct() {
        productApi.list().then(res => {
            setProduct(res)
        })
    }

    function selectedUnit(unit, productId) {
        let clone = [...detail]
        let check = clone.findIndex(s => s.id == productId)
        let unitSelect = clone[check].listUnit.find(s => s.donvitinhId == unit);
        clone[check].price = params.type == RETAIL ? unitSelect.GiaLe : unitSelect.GiaSi;
        clone[check].total = clone[check].quanity * clone[check].price
        clone[check].unit = unitSelect.donvitinh.id
        setDetail(clone)
    }

    function changeValue(key, value, productId) {
        let clone = [...detail]
        let check = clone.findIndex(s => s.id == productId)
        clone[check][key] = value;
        clone[check].total = clone[check].quanity * clone[check].price
        setDetail(clone)
    }

    function deleteItemDetail(productId) {
        let clone = [...detail]
        let check = clone.findIndex(s => s.id == productId)
        clone.splice(check, 1);
        setDetail(clone)
    }

    function refundMoney(value) {
        let clone = { ...invoice }
        let total = Number(value) - clone.TongTien;
        clone.No = total
        clone.TongNo = total
        setInvoice(clone)
    }

    function payment() {
        let formData = { ...invoice }
        formData.details = JSON.stringify(detail);
        invoiceApi.save(formData).then(res => {
            toast.success(res.msg)
            swal({ title: "Bạn có muốn in hóa đơn", text: "In hóa đơn", "icon": "info", buttons: true }).then(isConfrim => {
                if (isConfrim) {
                    $('#modal-print').modal('show')
                }
            })
        })

    }

    function reset() {
        setDetail([])
        setInvoice(defaultInvoice)
        $('#refund').val(0)
    }
    useEffect(() => {
        reset()
    }, [params.type])
    return (
        <Layout>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Mã phiếu</label>
                                    <input disabled value={invoice.MaPhieu} className='form-control' />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Khách hàng</label>
                                    <select onChange={(e) => {
                                        let clone = { ...invoice }
                                        clone.khachhangId = e.target.value
                                        clone.TenKhachHang = e.target.options[e.target.selectedIndex].text
                                    }} className='form-control'>
                                        {customers.map(item => {
                                            return <option key={item.id} value={item.id}>{item.HoTen}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 mt-1'>
                                <ScanBarcode data={product} select={selectProdct} />
                            </div>
                            <div className='col-12 mt-1'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "400px" }}>Tên sản phẩm</th>
                                            <th>Đơn giá</th>
                                            <th>Đơn vị tính</th>
                                            <th style={{ width: "50px" }}>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detail.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <input onChange={(e) => changeValue("price", e.target.value, item.id)} value={item.price} className="form-control" />
                                                </td>
                                                <td>
                                                    <select value={item.unit} onChange={(e) => selectedUnit(e.target.value, item.id)} className='form-control'>
                                                        {item.listUnit.map(itemUnit => {
                                                            return <option value={itemUnit.donvitinhId}>{itemUnit.donvitinh.TenDonVi}</option>
                                                        })}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input onChange={(e) => changeValue("quanity", e.target.value, item.id)} value={item.quanity} className="form-control" />
                                                </td>
                                                <td>
                                                    <input disabled value={item.total} className="form-control" /></td>
                                                <td style={{ textAlign: "center", color: "red", cursor: "pointer" }}><i onClick={() => deleteItemDetail(item.id)} className='fa fa-trash'></i></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='row'>
                            <div className='col-12 mt-1'>
                                <div className='form-group'>
                                    <label>Tổng tiền</label>
                                    <input disabled value={invoice.TongTien} className='form-control' type="number" step={0.1} />
                                </div>
                            </div>
                            <div className='col-12 mt-1'>
                                <div className='form-group'>
                                    <label>Số tiền khách đưa</label>
                                    <input onChange={(e) => refundMoney(e.target.value)} className='form-control' id='refund' type="number" step={0.1} />
                                </div>
                            </div>
                            <div className='col-12 mt-1'>
                                <div className='form-group'>
                                    <label>Số tiền thối lại</label>
                                    <input disabled value={invoice.No} className='form-control' type="number" step={0.1} />
                                </div>
                            </div>
                            <div className='col-12 mt-1'>
                                <div onClick={() => payment()} className='text-center btn btn-success' style={{ width: "100%" }}>
                                    <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                                    THANH TOÁN
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PrintInvoice invoice={invoice} details={detail} reset={reset} />
            <ProductModal refresh={loadProduct} callback={selectProdct} />
        </Layout>
    );
}

export default Sale;