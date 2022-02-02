import React, { useEffect, useState } from "react";

import "../../Styles/Home/home.css";
import { ReactComponent as IconSort } from "../../SVG/Sort-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";

import Header from "./Header";
import AddItem from "./AddItem";
import Item from "./Item";

// Need to fix this part (UseEffect throws ESLINT error, if the 2 values are inside Home)
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
//

function Home() {
  const [boolAddItem, setBoolAddItem] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    const getUserItem = async () => {
      const dataFromServer = await fetchUserItems();
      setItemsInCart(dataFromServer);
    };

    getUserItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserItems = async () => {
    const URL = `http://localhost:5000/600/users/${id}/itemsInCart`;
    const FETCH_OBJ_CONFIG = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchUserItems = await fetch(URL, FETCH_OBJ_CONFIG);
    const data = await fetchUserItems.json();
    setItemsInCart(data);
    return data;
  };

  return (
    <div className="home--container">
      <Header />
      <main>
        <div>
          <h1 className="main--tittle">Shopping List</h1>
          <button
            className="main--add_item-btn"
            onClick={() =>
              boolAddItem ? setBoolAddItem(false) : setBoolAddItem(true)
            }
          >
            <IconPlus />
          </button>
        </div>

        {boolAddItem ? (
          <AddItem
            setBoolAddItem={setBoolAddItem}
            cartItems={{ itemsInCart, setItemsInCart }}
          />
        ) : (
          ""
        )}

        <section className="section--items_lists">
          <div className="item--classification">
            <div className="item--name">
              ITEM
              <IconSort />
            </div>
            <div className="item--price cursor-pointer">
              PRICE
              <IconSort />
            </div>
            <div className="item--quantity">QUANTITY</div>
            <div className="item--total">TOTAL</div>
          </div>

          <section className="products_on_list">
            {itemsInCart.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </section>
        </section>
      </main>
    </div>
  );
}

export default Home;
