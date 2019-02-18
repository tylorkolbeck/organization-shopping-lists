import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import './App.css'

// import Products from '../src/Containers/Products/Products'
// import Home from '../src/Containers/Home/Home'

import createBrowserHistory from 'history/createBrowserHistory'
import asyncComponent from '../src/utilities/AsyncComponent'

// Containers
import ShoppingLists from '../src/Containers/ShoppingLists/ShoppingLists'

// IMPORT FOR LAZY LOADING
const Products = asyncComponent(() => 
  import('../src/Containers/Products/Products')
    .then(module => module.default)
)

const Home = asyncComponent(() => 
  import('../src/Containers/Home/Home')
    .then(module => module.default)
)

const Cart = asyncComponent(() => 
  import('../src/Containers/Cart/Cart')
    .then(module => module.default)
)

const history = createBrowserHistory()

class App extends Component {

  state = {
    activeCarts: []
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header>
            <nav>
              <div className="navbarContainer">
                <ShoppingLists />
                <Link to="/">
                  <span>Home</span>
                </Link>
                <span> | </span>
                <Link to="/products">
                  <span>Products</span>
                </Link>
              </div>
            </nav>
          </header>

          <section className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products" component={Products} />
              {/* <Route path="/shoppingLists/:cartId" component={Cart} /> */}
              <Route path="/shoppingLists/:cartId" render={(props) => (
                <Cart key={props.match.params.cartId} {...props}/>
              )} />
            </Switch>
          </section>
        </div>
      </Router>

    );
  }
}

export default App;
