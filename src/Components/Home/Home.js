import React, { useState } from "react";

import "../../Styles/Home/home.css";
import { ReactComponent as IconSort } from "../../SVG/Sort-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";

import Header from "./Header";
import AddItem from "./AddItem";
import Item from "./Item";

function Home() {
  const [boolAddItem, setBoolAddItem] = useState(false);

  const test = async () => {
    const res = await fetch(" http://localhost:5000/users/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data.itemsInCart);
  };

  return (
    <div className="home--container">
      <button onClick={() => test()}>Fetch data</button>

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

        {boolAddItem ? <AddItem setBoolAddItem={setBoolAddItem} /> : ""}

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
            {/* Testing CSS */}
            <Item />
          </section>
        </section>
      </main>
    </div>
  );
}

export default Home;
