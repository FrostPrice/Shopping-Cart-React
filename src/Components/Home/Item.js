import React from "react";

import { ReactComponent as IconX } from "../../SVG/X-Icon.svg";
import { ReactComponent as IconMinus } from "../../SVG/Minus-Icon.svg";
import { ReactComponent as IconPlus } from "../../SVG/Plus-Icon.svg";

function Item() {
  return (
    <div className="item">
      <div className="item--name">
        <div className="square"></div>
        <div>
          <p>Product</p>
          <span className="unit">1 un.</span>
        </div>
      </div>
      <div className="item--price">$3.80</div>
      <div className="item--quantity">
        <button className="grey_btn btn--decrease-value">
          <IconMinus />
        </button>
        <p className="quantity">2</p>
        <button className="grey_btn btn--increase-value">
          <IconPlus />
        </button>
      </div>
      <div className="item--total">
        <span>$7.60</span>
        <div className="item--cancel_btn">
          <button className="remove_btn">
            <IconX />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
