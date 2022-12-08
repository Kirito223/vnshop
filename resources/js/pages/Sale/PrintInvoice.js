import moment from 'moment/moment';
import React from 'react';

function PrintInvoice(props) {
    const { invoice, details } = props
    function print() {
        var content = document.getElementById("contentPrint");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    return (
        <div id="modal-print" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal-print-title"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-print-title">In hóa đơn</h5>
                    </div>
                    <div className="modal-body">
                        <div id='contentPrint'>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ textAlign: "center" }}>
                                        <p>CỬA HÀNG TỰ CHỌN QUANG TÚC</p>
                                        <p>Số 02, Thôn Tân Thắng, xã Eana, huyện Krông Ana, tỉnh Đắk Lắk</p>
                                        <p>Số điện thoại: 0982.377.168-0986.319.066</p>
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        HÓA ĐƠN BÁN HÀNG
                                    </td>
                                </tr>
                            </table>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td>Mã Phiếu: {invoice.MaPhieu}</td>
                                    <td>Ngày: {moment(invoice.NgayLap).format("DD/MM/YYYY")}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Khách hàng:{invoice.TenKhachHang}</td>
                                </tr>
                            </table>
                            <table style={{ border: "1px solid #000", borderCollapse: "collapse", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #000" }}>Tên hàng hóa</th>
                                        <th style={{ border: "1px solid #000" }}>Đơn vị tính</th>
                                        <th style={{ border: "1px solid #000" }}>Đơn giá</th>
                                        <th style={{ border: "1px solid #000" }}>Số lượng</th>
                                        <th style={{ border: "1px solid #000" }}>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map(item => {
                                        return <tr key={item.id}>
                                            <td style={{ border: "1px solid #000" }}>{item.name}</td>
                                            <td style={{ border: "1px solid #000" }}>{item.nameUnit}</td>
                                            <td style={{ border: "1px solid #000" }}>{new Intl.NumberFormat("vi-Vi").format(item.price)}</td>
                                            <td style={{ border: "1px solid #000" }}>{item.quanity}</td>
                                            <td style={{ border: "1px solid #000" }}>{new Intl.NumberFormat("vi-Vi").format(item.total)}</td>
                                        </tr>
                                    })}
                                    <tr>
                                        <td colSpan={5} style={{ border: "1px solid #000", textAlign: "right", fontWeight: "bold" }}>Tổng tiền: {new Intl.NumberFormat("vi-Vi").format(invoice.TongTien)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: "center", fontWeight: "bold" }}>Xin cảm ơn quý khách! Hẹn gặp lại lần sau</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <iframe id="ifmcontentstoprint" style={{ height: "0px", width: "0px", position: "absolute" }}></iframe>
                        <button onClick={() => print()} className='btn btn-sm btn-success'>In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrintInvoice;