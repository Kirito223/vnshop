import React from 'react';
import style from './toolbar.module.css'
function Toolbar(props) {
    const { menu } = props
    return (
        <ul className={`${style.menu} p-0 d-flex justify-content-end`}>
            {menu.map(item => {
                return <li className='p-1' key={Math.random()} onClick={() => item.function()}>{item.name}</li>
            })}
        </ul>
    );
}

export default Toolbar;