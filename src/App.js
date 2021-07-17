import React from "react";
import data from "./data.json";
import Produtcs from "./components/Produtcs";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
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
