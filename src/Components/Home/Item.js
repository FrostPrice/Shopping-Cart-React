import React, { useState } from "react";

import { ReactComponent as IconX } from "../../SVG/X-Icon.svg";
import { ReactComponent as IconMinus } from "../../SVG/Minus-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";

function Item({
  id,
  name,
  quantity,
  price,
  deleteItem,
  fetchUserItem,
  sendItemToServer,
}) {
  const decrease = async () => {
    const currentItem = await fetchUserItem(id);
    let newQuantity = quantity - 1;
    const newData = { ...currentItem, quantity: newQuantity };

    await sendItemToServer(id, newData);
  };

  const increase = async () => {
    const currentItem = await fetchUserItem(id);
    let newQuantity = quantity + 1;
    const newData = { ...currentItem, quantity: newQuantity };

    await sendItemToServer(id, newData);
  };

  return (
    <div id={`itemId--${id}`} className="item">
      <div className="item--name">
        <div className="square"></div>
        <div>
          <p>{name}</p>
          <span className="unit">1un</span>
        </div>
      </div>
      <div className="item--price">${parseFloat(price).toFixed(2)}</div>
      <div className="item--quantity">
        <button
          className="grey_btn btn--decrease-value"
          onClick={() => {
            if (quantity <= 1) return;
            decrease(quantity);
          }}
        >
          <IconMinus />
        </button>
        <p className="quantity">{quantity}</p>
        <button
          className="grey_btn btn--increase-value"
          onClick={() => {
            increase(quantity);
          }}
        >
          <IconPlus />
        </button>
      </div>
      <div className="item--total">
        <span>${parseFloat(quantity * price).toFixed(2)}</span>
        <div className="item--cancel_btn">
          <button
            className="remove_btn"
            onClick={() => {
              deleteItem(id);
            }}
          >
            <IconX />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
