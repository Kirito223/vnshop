import React, { useState } from 'react';
import style from './scan.module.css'
function ScanBarcode(props) {
    const { data, select } = props
    const [find, setFind] = useState([]);

    function findProduct(value) {
        if (value != "") {
            let arrFind = data.filter(s => s.MaSanPham.includes(value) || s.TenSanPham.includes(value))
            if (arrFind.lenght > 1) {
                setFind(arrFind)
            } else {
                selectProdct(arrFind[0])
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
            <input className='form-control' id='scanCode' onInput={(e) => findProduct(e.target.value)} />
            <ul className={`p-0 ${style.listScan}`}>
                {find.map(item => {
                    return <li key={item.id} onClick={() => selectProdct(item)} className='p-1'>{item.TenSanPham}</li>
                })}
            </ul>
        </div>
    );
}

export default ScanBarcode;