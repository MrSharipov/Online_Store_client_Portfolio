import React from "react";

const CartItem = (props) => {
  return (
    <tr>
      <td>
        <img src={props.link} className="cartImg" alt="item" />
      </td>
      <td>{props.name}</td>
      <td>12</td>
      <td>${props.price}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            props.remove(props.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
