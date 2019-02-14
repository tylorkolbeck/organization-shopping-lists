import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

// import Products from '../src/Containers/Products/Products'
// import Home from '../src/Containers/Home/Home'

import createBrowserHistory from 'history/createBrowserHistory'
import asyncComponent from '../src/utilities/AsyncComponent'

// IMPORT FOR LAZY LOADING
const Products = asyncComponent(() => 
  import('../src/Containers/Products/Products')
    .then(module => module.default)
)

const Home = asyncComponent(() => 
  import('../src/Containers/Home/Home')
    .then(module => module.default)
)

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header>
            <nav>
              <div className="navbarContainer">

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
            </Switch>
          </section>
        </div>
      </Router>

    );
  }
}

export default App;
