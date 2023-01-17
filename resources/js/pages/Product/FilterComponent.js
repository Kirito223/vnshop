import React from 'react';

function FilterComponent({ filterText, onFilter, onClear }) {
    return (
        <div className='d-flex'>
            <input id='search' type="text" className='form-control flex-grow-1' placeholder="Nhập tên hoặc mã sản phẩm" value={filterText} onChange={onFilter} />
            <button style={{ padding: "0px 30px" }} onClick={onClear} className='btn btn-sm btn-primary'>X</button>
        </div>
    );
}

export default FilterComponent;