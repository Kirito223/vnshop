import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import productApi from '../../apis/productApi';
import unitApi from '../../apis/unitApi'

function ProductModal(props) {
    const { refresh, listProduct, productId = 0, callback } = props
    const [product, setProduct] = useState({ id: 0, MaSanPham: "", TenSanPham: "", NgaySanXuat: moment(new Date()).format('YYYY-MM-DD'), NgayHetHan: moment(new Date()).format('YYYY-MM-DD'), GiaNhap: 0, SoLuongTonKho: 0 })
    const [listUnit, setListUnit] = useState([]);
    const [units, settUnits] = useState([]);
    function changeValue(key, value) {
        let clone = { ...product }
        clone[key] = value
        setProduct({ ...clone })
    }

    useEffect(() => {
        unitApi.list().then(res => {
            setListUnit(res)
        })
    }, [])

    useEffect(() => {
        if (productId != 0) {
            productApi.info(productId).then(res => {
                let clone = { ...product }
                clone.id = res.id
                clone.MaSanPham = res.MaSanPham
                clone.TenSanPham = res.TenSanPham
                clone.NgaySanXuat = moment(res.NgaySanXuat).format("YYYY-MM-DD")
                clone.NgayHetHan = moment(res.NgayHetHan).format("YYYY-MM-DD")
                clone.GiaNhap = res.GiaNhap
                clone.SoLuongTonKho = res.SoLuongTonKho;
                if (res.sanphamdonvis != null) {
                    let units = res.sanphamdonvis.map(item => {
                        return {
                            unit: item.donvitinhId,
                            retail: item.GiaLe,
                            whole: item.GiaSi,
                            primary: item.Primary,
                            id: Math.random()
                        }
                    })
                    settUnits(units)
                }
                setProduct(clone)
            })
        } else {
            setProduct({ id: 0, MaSanPham: "", TenSanPham: "", NgaySanXuat: moment(new Date()).format('YYYY-MM-DD'), NgayHetHan: moment(new Date()).format('YYYY-MM-DD'), GiaNhap: 0, SoLuongTonKho: 0 })
            settUnits([]);
        }
    }, [productId]);

    function handleSubmit() {
        let formData = new FormData();
        for (const key in product) {
            formData.append(key, product[key])
        }
        formData.append("id", productId)
        formData.append("units", JSON.stringify(units));
        productApi.save(formData).then(res => {
            if (res.flag) {
                toast.success(res.msg)
                refresh();
                if (callback != undefined) {
                    callback(res.data)
                }
                $('#modal-product').modal('toggle')
            }
        }).catch(err => {
            console.error(err)
            toast.error("Đã có lỗi xảy ra vui lòng thử lại sau")
        })
    }

    function addRow() {
        let clone = [...units]
        clone.push({
            unit: 0,
            retail: 0,
            whole: 0,
            primary: false,
            id: Math.random()
        })
        settUnits(clone)
    }
    function deleteRow(id) {
        let clone = [...units]
        clone.splice(clone.findIndex(s => s.id == id), 1);
        settUnits(clone)
    }

    function changeValueUnit(key, value, id) {
        let clone = [...units]
        if (typeof value == "boolean") {
            let index = clone.findIndex(s => s.id == id && s.primary == true);
            if (index > -1) {
                clone[index].primary = false
            }
        }
        let index = clone.findIndex(s => s.id == id);
        clone[index][key] = value
        settUnits(clone)
    }
    return (
        <div id="modal-product" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal-product-title"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-product-title">Thông tin sản phẩm</h5>
                        <button className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label>Mã sản phẩm</label>
                                        <input type="text" onInput={(e) => changeValue("MaSanPham", e.target.value)} value={product.MaSanPham} className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Ngày sản xuất</label>
                                        <input type="date" onChange={(e) => changeValue("NgaySanXuat", e.target.value)} value={product.NgaySanXuat} className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Giá nhập</label>
                                        <input onInput={(e) => changeValue("GiaNhap", e.target.value)} value={product.GiaNhap} type="number" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label>Tên sản phẩm</label>
                                        <input type="text" onInput={(e) => changeValue("TenSanPham", e.target.value)} value={product.TenSanPham} className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Ngày hết hạn</label>
                                        <input type="date" onChange={(e) => changeValue("NgayHetHan", e.target.value)} value={product.NgayHetHan} className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Số lượng tồn kho</label>
                                        <input onInput={(e) => changeValue("SoLuongTonKho", e.target.value)} type="number" value={product.SoLuongTonKho} className='form-control' />
                                    </div>
                                </div>
                                <div className='col-12 mt-1'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <td width={100}>Đơn vị tính</td>
                                                <td>Giá lẻ</td>
                                                <td>Giá sỉ</td>
                                                <td>Mặc định</td>
                                                <td>Xóa</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                units.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>
                                                            <select value={item.unit} onChange={(e) => changeValueUnit("unit", e.target.value, item.id)} className='form-control'>
                                                                <option value="">Chọn đơn vị tính</option>
                                                                {listUnit.map(itemUnit => {
                                                                    return <option value={itemUnit.id}>{itemUnit.TenDonVi}</option>
                                                                })}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input value={item.retail} onChange={(e) => changeValueUnit("retail", e.target.value, item.id)} className='form-control' />
                                                        </td>
                                                        <td>
                                                            <input value={item.whole} onChange={(e) => changeValueUnit("whole", e.target.value, item.id)} className='form-control' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" checked={item.primary} onChange={(e) => changeValueUnit("primary", e.target.checked, item.id)} />
                                                        </td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <i onClick={() => deleteRow(item.id)} style={{ cursor: "pointer", color: "red" }} className='fa fa-trash'></i>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                            <tr>
                                                <td onClick={() => addRow()} style={{ cursor: "pointer", textAlign: "center" }} colSpan={9}>Thêm đơn vị mới</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-sm btn-secondary' data-bs-dismiss="modal">Đóng</button>
                        <button onClick={() => handleSubmit()} className='btn btn-sm btn-primary'>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;