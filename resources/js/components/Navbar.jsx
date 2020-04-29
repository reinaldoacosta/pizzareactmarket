import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            total: props.data.total,
            items: props.data.items,
            currency: props.data.currency,
            logged: props.logged,
            setCurrency: props.setcurrency
        }
    }

    static getDerivedStateFromProps(newProps) {
        return {
            total: newProps.data.total,
            items: newProps.data.items,
            currency: newProps.data.currency,
            logged: newProps.logged
        }
    }

    render() {
        return (
            <nav className="uk-navbar-container uk-margin" uk-navbar="mode: click">
                <div className='uk-navbar-left'>
                    <Link to='/' className='uk-navbar-item uk-logo'>
                        <img src='/images/menu.png' style={{ maxWidth: '45px' }} className='menu-logo' /> Menu
                    </Link>
                </div>
                <div className='uk-navbar-center uk-visible@m'>
                    <Link to='/' className='uk-navbar-item uk-logo'>
                        <img src="/images/logo.png" />
                    </Link>
                </div>
                <div className="uk-navbar-right">
                    <div className='uk-visible@m'>
                        <ul className="uk-navbar-nav">
                            {this.state.logged ?
                                <li><Link to="#">My Account</Link>
                                    <div className="uk-navbar-dropdown uk-text-bold uk-text-center">
                                        <ul className="uk-nav uk-navbar-dropdown-nav">
                                            <li><Link to="/orders">Orders</Link></li>
                                            <li className="uk-nav-divider"></li>
                                            <li><a href="/logout">Logout</a></li>
                                        </ul>
                                    </div>
                                </li>
                                : <li><Link to="/account">Access</Link></li>
                            }
                            <li>
                                <Link to="/cart/">
                                    <div uk-grid='true' className='uk-grid-collapse'>
                                        <div className='uk-width-1-3 uk-flex uk-flex-middle uk-position-relative'>
                                            <span uk-icon="icon:cart;ratio:3">
                                                {this.state.items > 0 ? <span className='iac'>{this.state.items}</span> : null}
                                            </span>
                                        </div>
                                        <div className='uk-width-2-3 uk-flex uk-flex-middle'>
                                            <div className='uk-margin-small-left'>{this.state.currency}{this.state.total > 0 ? (this.state.currency == '€' ? (+(+this.state.total * 0.94) + (6 * 0.94)).toFixed(2) : (+(+this.state.total) + (6)).toFixed(2)) : this.state.total}</div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={
                                    e => {
                                        e.preventDefault()
                                        this.state.setCurrency('$')
                                    }
                                }>$</a>
                            </li>
                            <li>
                                <a href="#" onClick={
                                    e => {
                                        e.preventDefault()
                                        this.state.setCurrency('€')
                                    }
                                }>€</a>
                            </li>
                        </ul>
                    </div>
                    <div className='uk-hidden@m'>
                        <ul className="uk-navbar-nav">
                            <li className="uk-active"><a uk-toggle="target: #offcanvas-flip" href="#" uk-icon='icon:menu'></a></li>
                        </ul>
                    </div>
                </div>
            </nav >
        )
    }
}

export { Navbar }