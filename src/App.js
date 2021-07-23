import React from "react";
import data from "./data.json";
import Products from "./components/Produtcs";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux"; 


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      //code 1 : this.line -> after we refresh the page but cart items removed or refreshed
      cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    };
  }
  //create order
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  //remove in cart
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      //get item in cart by product id in json file
      cartItems : cartItems.filter((x) => x._id !== product._id) ,
    });
     //code 1 : this.line -> after we refresh the page but cart items removed or refreshed
    localStorage.setItem("cartItems" , JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  };
  //add to cart
  addToCart = (product) => {
    const cartItems =this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
        if(item._id === product._id)
        {
          item.count++;
          alreadyInCart = true;
        }
    });
    if(!alreadyInCart)
    {
      cartItems.push({...product , count: 1});
    }
    this.setState({cartItems});
     //code 1 : this.line -> after we refresh the page but cart items removed or refreshed
    localStorage.setItem("cartItems" , JSON.stringify(cartItems));
  };

  render() {
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
        <footer>All right is reserved.</footer>
      </div>
      </Provider>
    );
  }
}

export default App;
