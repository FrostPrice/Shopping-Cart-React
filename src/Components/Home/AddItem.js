import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ReactComponent as IconX } from "../../SVG/X-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";
import "../../Styles/Home/addItem.css";

import { addItem } from "../../Features/shoppingCart";

function AddItem({ setBoolAddItem }) {
  const dispatch = useDispatch();
  const [newItemInfo, setNewItemInfo] = useState({
    name: "",
    quantity: "",
    price: 0,
  });

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
        />
        <input
          className="add_new_item--input quantity--input"
          type="text"
          placeholder="e.g: 1un, 12un"
          onChange={(event) =>
            setNewItemInfo({ ...newItemInfo, quantity: event.target.value })
          }
        />
        <input
          className="add_new_item--input price--input"
          type="text"
          placeholder="e.g: $4.00, $10.99"
          onChange={(event) =>
            setNewItemInfo({ ...newItemInfo, price: event.target.value })
          }
        />
        <button
          className="add_new_item--btn black_btn cursor-pointer"
          onClick={() => dispatch(addItem(newItemInfo))}
        >
          <IconPlus />
          <p>Add Item</p>
        </button>
      </form>
    </section>
  );
}

export default AddItem;
