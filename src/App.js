import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { NotFound } from './Components/NotFound'
import { AddProducts } from './Components/AddProducts'
import { Cart } from './Components/Cart'
import { DelProducts } from './Components/DelProducts'
import { ListUsers } from './Components/ListUsers'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/add-products" component={AddProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/users-list" component={ListUsers} />
        <Route path="/delete-products" component={DelProducts} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
