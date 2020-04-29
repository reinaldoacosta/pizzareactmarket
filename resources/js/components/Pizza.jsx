import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import 'uikit/dist/css/uikit.min.css'
import '../../css/styles.css'

import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';

import { Navbar } from './Navbar'
import MenuItem from './MenuItem'
import Item from './Item'
import Access from './Access'
import Cart from './Cart'
import Checkout from './Checkout'
import Orders from './Orders'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


class Pizza extends React.Component {

    constructor(props) {
        super(props)

        let _lscart = JSON.parse(localStorage.getItem("cart"))
        let { total, items, currency } = _lscart == null ? { total: 0, items: 0, currency: '$' } : _lscart

        this.state = {
            menuItems: [],
            loaded: false,
            logged: window._PIZZA_SESSION.logged,
            cart: { total: total, items: items, currency: currency },
            orders: JSON.parse(localStorage.getItem('orders'))
        }
        //enable UIKit icons wide usage
        UIKit.use(Icons)

        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.clearCart = this.clearCart.bind(this)
        this.setCurrency = this.setCurrency.bind(this)
    }

    setCurrency(currency) {
        this.setState(
            this.setState({
                cart: {
                    total: this.state.cart.total,
                    items: this.state.cart.items,
                    currency: currency
                }
            })
        )
        if (localStorage.cart == 'undefined') {
            localStorage.cart = JSON.stringify({ currency: currency, total: 0, items: 0 })
        } else {
            let localCart = JSON.parse(localStorage.cart)
            localCart.currency = currency
            localStorage.cart = JSON.stringify(localCart)
        }

    }

    clearCart() {
        this.setState({
            cart: {
                total: 0,
                items: 0,
                currency: this.state.cart.currency
            }
        })
        localStorage.clear()
    }

    async componentDidMount() {
        try {
            let res = await fetch('/api/menu')
            let data = await res.json()
            this.setState({
                menuItems: data,
                loaded: true
            })
        } catch (error) { }
    }

    login() {
        this.setState({ logged: true })
    }
    logout() { }

    addItem(id, amount) {
        if (!localStorage.getItem('cart')) {
            var orders = {};
            orders[id] = { amount: amount }
            localStorage.setItem('orders', JSON.stringify(orders));
        } else {
            var orders = JSON.parse(localStorage.getItem('orders'))
            if (orders[id] != null) {
                orders[id] = { amount: (+amount) + (+orders[id].amount) }
            } else {
                orders[id] = { amount: amount }
            }
            localStorage.setItem('orders', JSON.stringify(orders))
        }

        let totalPriceUSD = (+this.state.cart.total) + (+((amount) * this.state.menuItems.filter(menuItem => menuItem.id == id)[0].price)),
            //totalPrice = +(Math.round((this.state.cart.currency == '$' ? totalPriceUSD : Number(totalPriceUSD) * 0.94) + "e+" + 2) + "e-" + 2),
            totalPrice = (+totalPriceUSD).toFixed(2),
            items = (+this.state.cart.items) + (+amount),
            currency = this.state.cart.currency

        //to be saved just in case user reloads page we save data for the UI
        localStorage.setItem('cart', JSON.stringify({
            total: totalPrice,
            items: items,
            currency: currency
        }))

        this.setState({
            cart: {
                total: totalPrice,
                items: items,
                currency: currency
            },
            orders: orders
        })
    }

    removeItem(id, amount) {
        let cart = this.state.cart,
            orders = this.state.orders
        if (((+orders[id].amount) - 1) == 0) {
            delete orders[id]
        } else {
            orders[id].amount = (+orders[id].amount) - 1
        }

        if (((+cart.items) - 1) == 0) {
            cart.total = 0
            cart.items = 0
            localStorage.cart = JSON.stringify({ currency: this.state.cart.currency, total: 0, items: 0 })
        } else {
            cart.items = (+cart.items) - 1
            cart.total = +(Math.round((this.state.cart.currency == '$' ? (+cart.total) - (+amount) : (+(+cart.total) - (+amount)) * 0.94) + "e+" + 2) + "e-" + 2)
            localStorage.cart = JSON.stringify(cart)
        }

        this.setState({
            orders: orders
        })
        localStorage.setItem('orders', JSON.stringify(orders))
    }

    render() {
        if (this.state.loaded === true) {
            return (
                <React.Fragment>
                    <Router>
                        <Navbar logged={this.state.logged} data={this.state.cart} setcurrency={this.setCurrency} />
                        <div className='uk-margin-auto uk-container uk-padding'>
                            <Switch>
                                <Route exact path='/'>
                                    <div className='uk-flex uk-flex-wrap uk-child-width-1-2@s uk-child-width-1-3@m' uk-grid="masonry:true">
                                        {this.state.menuItems.map((item) => {
                                            return (
                                                <div key={item.id}>
                                                    <MenuItem currency={this.state.cart.currency} itemdata={item} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Route>
                                <Route path='/item/:id/:item' render={
                                    (routedata) => {
                                        let _menuItem = this.state.menuItems.filter(menuItem => menuItem.id == routedata.match.params.id)
                                        return (
                                            <Item currency={this.state.cart.currency} addItem={this.addItem} data={_menuItem[0]} />
                                        )
                                    }
                                }>
                                </Route>
                                <Route path='/cart'>
                                    <Cart logged={this.state.logged} removeItem={this.removeItem} addItem={this.addItem} items={this.state.menuItems} orders={this.state.orders} cart={this.state.cart} />
                                </Route>
                                <Route path='/account'>
                                    <Access setlogin={this.login} logged={this.state.logged} />
                                </Route>
                                <Route path='/checkout'>
                                    <Checkout logged={this.state.logged} menu={this.state.menuItems} items={this.state.cart.items} total={this.state.cart.total} currency={this.state.cart.currency} clear={this.clearCart} />
                                </Route>
                                <Route path='/orders'>
                                    <Orders logged={this.state.logged} items={this.state.menuItems} />
                                </Route>
                            </Switch>
                            <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
                                <div className="uk-offcanvas-bar">

                                    <button className="uk-offcanvas-close" type="button" uk-close='trues'></button>

                                    <h3>Reinaldo's Pizzas</h3>

                                    <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
                                        <li className="uk-active"><Link to='/'>View Menu</Link></li>
                                        {
                                            this.state.logged ?
                                                <React.Fragment>
                                                    <li><Link to="/orders">Orders</Link></li>
                                                    <li><a href="/logout">Logout</a></li>
                                                </React.Fragment>
                                                : <li className="uk-active"><Link to='/account'>Access</Link></li>
                                        }
                                        <li className="uk-parent">
                                            <div uk-grid='true' className='uk-grid-collapse'>
                                                <div className='uk-width-1-1 uk-flex uk-flex-center uk-position-relative'>
                                                    <Link to="/cart/">
                                                        <span uk-icon="icon:cart;ratio:2">
                                                            {this.state.cart.items > 0 ? <span className='iac mob'>{this.state.cart.items}</span> : null}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className='uk-width-1-1 uk-flex uk-flex-center'>
                                                    <div className='uk-margin-small-left'>{this.state.cart.currency}{this.state.cart.total > 0 ? (this.state.cart.currency == '€' ? (+(+this.state.cart.total * 0.94) + (6 * 0.94)).toFixed(2) : (+(+this.state.cart.total) + (6)).toFixed(2)) : this.state.cart.total}</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="uk-nav-divider"></li>
                                        <li className='uk-inline'>
                                            <span className='uk-margin-right uk-text-lead hand' onClick={
                                                e => {
                                                    e.preventDefault()
                                                    this.setCurrency('$')
                                                }
                                            }>$</span>
                                            <span className='uk-margin-left uk-text-lead hand' onClick={
                                                e => {
                                                    e.preventDefault()
                                                    this.setCurrency('€')
                                                }
                                            }>€</span>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </Router>
                </React.Fragment>
            );
        } else {
            return 'Loading...'
        }

    }
}


export { Pizza };


