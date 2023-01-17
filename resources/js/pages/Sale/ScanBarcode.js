import React, { useState } from 'react';
import swal from 'sweetalert';
import style from './scan.module.css'
function ScanBarcode(props) {
    const { data, select } = props
    const [find, setFind] = useState([]);

    function findProduct(value, KeyCode) {
        console.log(KeyCode);
        if (value != "") {
            if (KeyCode == "Enter") {
                let arrFind = data.filter(s => s.MaSanPham.includes(value) || s.TenSanPham.includes(value))
                if (arrFind.length > 1) {
                    setFind(arrFind)
                } else if (arrFind.length == 1) {
                    selectProdct(arrFind[0])
                } else if (arrFind.length == 0) {
                    swal({ title: "Không tìm thấy sản phầm trong hệ thống bạn có muốn thêm sản phẩm vào hệ thống?", text: "Không tìm thấy sản phầm trong hệ thống bạn có muốn thêm sản phẩm vào hệ thống?", buttons: true }).then(isConfirm => {
                        if (isConfirm) {
                            $('#modal-product').modal('show')
                        }
                    })
                }
            }
        } else {
            setFind([])
        }

    }
    function selectProdct(product) {
        select(product)
        setFind([])
        $("#scanCode").val("")
    }
    return (
        <div>
            <input className='form-control' id='scanCode' onKeyPress={(e) => findProduct(e.target.value, e.key)} />
            <ul className={`p-0 ${style.listScan} ${find.length > 0 ? "" : "d-none"}`}>
                {find.map(item => {
                    return <li key={item.id} onClick={() => selectProdct(item)} className='p-1'>{item.TenSanPham}</li>
                })}
            </ul>
        </div>
    );
}

export default ScanBarcode;