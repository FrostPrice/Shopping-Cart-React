import React, { useEffect, useState } from "react";

import "../../Styles/Home/home.css";
import { ReactComponent as IconSort } from "../../SVG/Sort-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";

import Header from "./Header";
import AddItem from "./AddItem";
import Item from "./Item";
import Footer from "./Footer";

// Need to fix this part (UseEffect throws ESLINT error, if the 2 values are inside Home)
const userId = localStorage.getItem("id");
const token = localStorage.getItem("token");
//

function Home() {
  const [boolAddItem, setBoolAddItem] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getUserItem = async () => {
      const dataFromServer = await fetchUserItems(userId, token);
      setItemsInCart(dataFromServer);
    };

    getUserItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendItemToServer = async (id, state) => {
    const URL = `http://localhost:5000/600/itemsInCart/${id}`;
    const FETCH_OBJ_CONFIG = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(state),
    };

    const res = await fetch(URL, FETCH_OBJ_CONFIG);
    const data = await res.json();
    setItemsInCart(
      itemsInCart.map((item) => (item.id === id ? { ...data } : item))
    );
  };

  const fetchUserItems = async (userId, token) => {
    const URL = `http://localhost:5000/600/users/${userId}/itemsInCart`;
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

  const fetchUserItem = async (id) => {
    const URL = `http://localhost:5000/600/itemsInCart/${id}`;
    const FETCH_OBJ_CONFIG = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(URL, FETCH_OBJ_CONFIG);
    const data = await res.json();
    return data;
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/600/itemsInCart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setItemsInCart(itemsInCart.filter((item) => item.id !== id));
  };

  const calculateTotal = async (userId, token) => {
    const items = await fetchUserItems(userId, token);
    const allItemsTotal = items.map((item) => {
      const itemTotal = item.price * item.quantity;
      return itemTotal.toFixed(2);
    });
    const total = allItemsTotal.reduce((a, b) => {
      return (a = Number(a) + Number(b));
    }, 0);
    setTotal(total);
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
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                deleteItem={deleteItem}
                fetchUserItem={fetchUserItem}
                sendItemToServer={sendItemToServer}
              />
            ))}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
