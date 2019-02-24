import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import './App.css'
import axios from 'axios'

// import Products from '../src/Containers/Products/Products'
// import Home from '../src/Containers/Home/Home'

import createBrowserHistory from 'history/createBrowserHistory'
import asyncComponent from '../src/utilities/AsyncComponent'

// Containers
import ShoppingLists from '../src/Containers/ShoppingLists/ShoppingLists'
import Carts from '../src/Containers/Carts/Carts'
import Login from '../src/Containers/Login/Login'

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
    activeCarts: [],
    carts: false
  }

  componentDidMount() {
    if (!this.state.carts) {
      this.getShoppingListNames()
    }
  }

  getShoppingListNames() {
    this.setState({loading: true})
    axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/cartNames')
        .then(response => {
            this.setState({carts: response.data.carts, loading: false}, () => {
              this.setState({loading: false})
            })
        })
  }


  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header>
            <nav>
              <div className="navbarContainer">
                <div className="App__links">
                  <Link to="/products">
                      <span>Products</span>
                  </Link>
                   
                  <Link to="/carts">
                      <span>Carts</span>
                  </Link>
                   
                  <Link to="/login">
                      <span>Login</span>
                  </Link>
                </div>
                
                <ShoppingLists carts={this.state.carts} updateCarts={this.getShoppingListNames.bind(this)}/>
                
              </div>
            </nav>
          </header>

          <section className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products" component={Products} />
              <Route path="/login" component={Login} />
              {/* <Route path="/shoppingLists/:cartId" component={Cart} /> */}
              {/* <Route path="/carts" component={Carts} /> */}
              <Route path="/carts" render={(props) => (<Carts updateCarts={this.getShoppingListNames.bind(this)} carts={this.state.carts}/>)} />
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
