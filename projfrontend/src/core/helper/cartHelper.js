export const addItemToCart = (item) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...item,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const addItemToTempCart = (item, next) => {
    let tempCart = [];
    if (typeof window !== undefined) {  
      tempCart.push(item);
      localStorage.setItem("tempCart", JSON.stringify(tempCart));
      next();
    }
  };
  
  export const loadCart = (flag) => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return (flag?(JSON.parse(localStorage.getItem("tempCart"))):(JSON.parse(localStorage.getItem("cart"))));
      }
    }
  };
  
  export const removeItemFromCart = (productId) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product.id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };