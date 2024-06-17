import React from "react";
import CartPortal from "../Portal/Portal";
import { removecart } from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import "../CartItemList/Cartlist.css"
export default function CartItemList() {
  const dispatch=useDispatch();
  const sendingCart = useSelector((state) => state.Addingcart.cartitems);

  const handleDelete=(id)=>{
     dispatch(removecart(id));
  }
  return (
    <CartPortal>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Paid To</th>
              <th>Icons</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {sendingCart.map((item) => (
              <tr key={item.id}>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.paidto}</td>
                <td>{item.icons}</td>
                <td>
                <button  className="delete-button" onClick={()=>handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CartPortal>
  );
}
