import React, { useState } from "react";

import { ReactComponent as IconX } from "../../SVG/X-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";
import "../../Styles/Home/addItem.css";

function AddItem({
  setBoolAddItem,
  cartItems: { itemsInCart, setItemsInCart },
}) {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [newItemInfo, setNewItemInfo] = useState({
    userId: 0,
    name: "",
    quantity: 0,
    price: 0,
  });

  const addItemServer = async (data) => {
    setNewItemInfo({ ...data, userId: id });
    const URL = `http://localhost:5000/600/users/${id}/itemsInCart`;
    const FETCH_OBJ_CONFIG = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(URL, FETCH_OBJ_CONFIG);
    const dataFromServer = await res.json();
    setItemsInCart([...itemsInCart, dataFromServer]);
  };

  return (
    <section className="section--add_new_item">
      <div className="add_new_item--header">
        <h2 className="add_new_item--tittle">New item</h2>
        <button
          className="remove_btn close-new-item_btn"
          onClick={() => setBoolAddItem(false)}
        >
          <IconX />
        </button>
      </div>
      <form className="add_new_item--inputs">
        <p className="add_new_item--description">Name</p>
        <p className="add_new_item--description">Quantity</p>
        <p className="add_new_item--description">Price</p>
        <input
          className="add_new_item--input grid-row product--input"
          type="text"
          placeholder="e.g: Banana, Apple"
          onChange={(event) =>
            setNewItemInfo({ ...newItemInfo, name: event.target.value })
          }
          required
        />
        <input
          className="add_new_item--input quantity--input"
          type="number"
          placeholder="e.g: 1, 12"
          onChange={(event) =>
            setNewItemInfo({ ...newItemInfo, quantity: event.target.value })
          }
          required
        />
        <input
          className="add_new_item--input price--input"
          type="number"
          placeholder="e.g: $4.00, $10.99"
          onChange={(event) =>
            setNewItemInfo({ ...newItemInfo, price: event.target.value })
          }
          required
        />
        <button
          className="add_new_item--btn black_btn cursor-pointer"
          onClick={(event) => {
            if (
              !newItemInfo.name ||
              !newItemInfo.quantity ||
              !newItemInfo.price
            )
              return;
            event.preventDefault();
            addItemServer(newItemInfo);
            setBoolAddItem(false);
          }}
        >
          <IconPlus />
          <p>Add Item</p>
        </button>
      </form>
    </section>
  );
}

export default AddItem;
