import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import customerApi from '../../apis/customerApi';

function ModalCustomer(props) {
    const { refresh, customer } = props;

    useEffect(() => {
        if (customer != null) {
            setCustomer({ HoTen: customer.HoTen, DiaChi: customer.DiaChi, SoDienThoai: customer.SoDienThoai, id: customer.id })
            $('#modal-customer').modal('show')
        } else {
            setCustomer({ HoTen: "", DiaChi: "", SoDienThoai: "", id: 0 })
        }
    }, [customer])
    const [dataPost, setCustomer] = useState({ HoTen: "", DiaChi: "", SoDienThoai: "", id: 0 })
    function handleSubmit() {
        customerApi.save(dataPost).then(res => {
            toast.success(res.msg)
            refresh();
            $('#modal-customer').modal('toggle')
        })
    }

    function changeValue(key, value) {
        let clone = { ...dataPost }
        clone[key] = value
        setCustomer(clone)
    }
    return (
        <div id="modal-customer" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal-customer-title"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-customer-title">Thông tin khách hàng</h5>
                        <button className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='form-group'>
                                        <label>Họ và tên</label>
                                        <input className='form-control' value={dataPost.HoTen} onChange={(e) => changeValue("HoTen", e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label>Địa chỉ</label>
                                        <input className='form-control' value={dataPost.DiaChi} onChange={(e) => changeValue("DiaChi", e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label>Số điện thoại</label>
                                        <input className='form-control' value={dataPost.SoDienThoai} onChange={(e) => changeValue("SoDienThoai", e.target.value)} />
                                    </div>
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

export default ModalCustomer;