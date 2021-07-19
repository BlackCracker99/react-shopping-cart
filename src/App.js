import React from "react";
import data from "./data.json";
import Produtcs from "./components/Produtcs";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
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
              <Produtcs products={this.state.products}></Produtcs>
              Products
            </div>

            <div className="sidebar">Cart Item</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
