import React from 'react';
import "./Additionalinfo.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Additionalinfo = ({product}) => {

    return (
        <div id="tab_2nd" className="tab-contain addtional-info-tab">
            <table className="tbl_attributes">
                <tbody>
                    <tr>
                        <th>Color</th>
                        <td><p>{product?.color}</p></td>
                    </tr>
                    <tr>
                        <th>Size</th>
                        <td><p>{product?.size}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}


export default Additionalinfo