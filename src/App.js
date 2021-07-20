import React from "react";
import data from "./data.json";
import Produtcs from "./components/Produtcs";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      //code 1 : this.line -> after we refresh the page but cart items removed or refreshed
      cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
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
  //sort products by price
  sortProducts = (event) => {
    // impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  //filter products 
  filterProducts = (event) => 
  {
    //imp
    console.log(event.target.value);
    if(event.target.value === "")
    {
      this.setState({size:event.target.value , products:data.products});
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                      size = {this.state.size}
                      sort = {this.state.sort}
                      filterProducts = {this.filterProducts}
                      sortProducts = {this.sortProducts}
              ></Filter>
              <Produtcs 
              products={this.state.products}
              addToCart={this.addToCart}
              ></Produtcs>
              Products
            </div>

            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              /></div>

          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
