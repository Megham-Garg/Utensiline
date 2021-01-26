import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, addItemToTempCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  buyNow = true,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, 
    setRedirect
  ] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default";

  const addToCartIfLoggedIn = () => {
    if (isAuthenticated) {
      addItemToCart(product);
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const addToTempCartIfLoggedIn = () => {
    if (isAuthenticated) {
      addItemToTempCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCartIfLoggedIn}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product.id);
            setReload(!reload);

            console.log(product.id, "Product removed from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const showBuyNow = (buyNow) => {
    return (
      buyNow && (
        <button
          onClick={addToTempCartIfLoggedIn}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Buy Now
        </button>
      )
    );
  };

  return (
    <div className="container card text-white bg-dark border border-info ">
      <div className="card-header lead row">{cartTitle}</div>
      <div className="card-body row">
        <div className="container-fluid">
          {getAredirect(redirect)}
          <ImageHelper product={product} />
          <div className="row lead bg-info rounded p-1 font-weight-normal text-wrap mt-2">
            {cartDescription}
          </div>
          <div className="row p-1 btn-info rounded mt-2">{cartPrice} ₹</div>
          <div className="row">
            {showAddToCart(addToCart)}
          </div>
          <div className="row">
            {showRemoveFromCart(removeFromCart)}
          </div>
          <div className="row">
            {showBuyNow(buyNow)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
