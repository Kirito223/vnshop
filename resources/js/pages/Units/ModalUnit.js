import React, { useEffect, useState } from 'react';
import unitApi from '../../apis/unitApi';
import { toast } from 'react-toastify'
function ModalUnit(props) {
    const { refresh, unit } = props
    const [Name, setName] = useState("")
    const [Id, setId] = useState(0)
    function handleSubmit() {
        let formData = new FormData();
        formData.append("TenDonVi", Name);
        formData.append("id", Id);
        unitApi.save(formData).then(res => {
            if (res.flag) {
                toast.success(res.msg)
                refresh();
                $('#modal-unit').modal('toggle')
            } else {
                toast.error(res.msg)
            }
        })
    }
    useEffect(() => {
        if (unit != null) {
            setName(unit.TenDonVi)
            setId(unit.id)
        } else {
            setName("");
            setId(null)
        }

    }, [unit])

    return (
        <div id="modal-unit" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal-unit-title"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-unit-title">Thông tin đơn vị</h5>
                        <button className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='form-group'>
                            <label>Tên đơn vị</label>
                            <input value={Name} onInput={(e) => {
                                setName(e.target.value)
                            }} className='form-control' type="text" />
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

export default ModalUnit;