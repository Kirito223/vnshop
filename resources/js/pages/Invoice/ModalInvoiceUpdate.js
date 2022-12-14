import React, { useEffect, useState } from 'react';
import productApi from '../../apis/productApi';
import ScanBarcode from '../Sale/ScanBarcode';
import invoiceApi from '../../apis/invoiceApi'
import { toast } from 'react-toastify';
function ModalInvoiceUpdate(props) {
    const [detail, setDetail] = useState([]);
    const [product, setProduct] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);

    const { phieu, typem, refresh } = props;

    useEffect(() => {
        let total = 0;
        detail.forEach(item => {
            total += Number(item.total)
        })
        setTotalPayment(total)
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
                price: type == 1 ? unit.GiaLe : unit.GiaSi,
                quanity: 1,
                total: type == 1 ? unit.GiaLe : unit.GiaSi,
                listUnit: productSelected.sanphamdonvis,
            })
        } else {
            clone[check].quanity = clone[check].quanity + 1
            clone[check].total = clone[check].quanity * clone[check].price
        }
        setDetail(clone);
    }
    function loadProduct() {
        productApi.list().then(res => {
            setProduct(res)
        })
    }
    useEffect(() => {
        loadProduct();

    }, [])

    function submitData() {
        let data = new FormData();
        data.append('id', phieu.id);
        data.append("No", Number($('#refund').text()))
        data.append("details", JSON.stringify(detail));
        invoiceApi.save(data).then(res => {
            toast.success(res.msg)
            refresh();
            $('#modal-invoice').modal('toggle')
        })
    }
    useEffect(function () {
        if (phieu != undefined) {
            let clone = phieu.chitietphieubanhangs.map(item => {
                return {
                    id: item.sanphamId,
                    name: item.TenSanPham,
                    unit: item.DonVi,
                    price: item.Gia,
                    quanity: item.SoLuong,
                    total: item.ThanhTien,
                    listUnit: item.sanpham.sanphamdonvis,
                }
            })
            setDetail(clone);
        }
    }, [phieu]);
    function selectedUnit(unit, productId) {
        let clone = [...detail]
        let check = clone.findIndex(s => s.id == productId)
        let unitSelect = clone[check].listUnit.find(s => s.donvitinhId == unit);
        clone[check].price = params.type == RETAIL ? unitSelect.GiaLe : unitSelect.GiaSi;
        clone[check].total = clone[check].quanity * clone[check].price
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
        let total = Number(value) - totalPayment;
        $('#refund').text(total)
    }
    return (
        <div id="modal-invoice" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal-print-title"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-print-title">In hóa đơn</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-12'>
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
                                                        <select onChange={(e) => selectedUnit(e.target.value, item.id)} className='form-control'>
                                                            {item.listUnit.map(itemUnit => {
                                                                return <option selected={itemUnit.donvitinhId == item.unit ? true : false} value={itemUnit.donvitinhId}>{itemUnit.donvitinh.TenDonVi}</option>
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

                                            <tr>
                                                <td colSpan={3}>Tổng tiền</td>
                                                <td colSpan={3}>
                                                    <div className='form-control'>{totalPayment}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>Khách trả</td>
                                                <td colSpan={3}>
                                                    <input type="number" onInput={(e) => refundMoney(e.target.value)} className='form-control' />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>Trả lại</td>
                                                <td colSpan={3}>
                                                    <div id='refund' className='form-control' >0</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-sm btn-secondary' data-bs-dismiss="modal">Đóng</button>
                        <button onClick={() => submitData()} className='btn btn-sm btn-success'>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalInvoiceUpdate;