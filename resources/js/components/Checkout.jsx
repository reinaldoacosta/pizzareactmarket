import React, {
    Component
} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmed: false,
            total: props.total,
            items: props.items,
            currency: props.currency,
            menu: props.menu,
            logged: props.logged,
            clear: props.clear
        }
        
        this.company = React.createRef()
        this.name = React.createRef()
        this.lastname = React.createRef()
        this.address = React.createRef()
        this.apt = React.createRef()
        this.city = React.createRef()

        this.pay = this.pay.bind(this)
    }

    pay(form) {
        form.preventDefault()

        let amount = this.state.currency + this.state.total,
            orders = localStorage.getItem('orders'),
            data = {
                firstname: this.name.current.value,
                lastname: this.lastname.current.value,
                address: this.address.current.value,
                apt: this.apt.current.value,
                city: this.city.current.value,
                amount: amount,
                orders: orders
            }

        /**
         * For DEMO PURPOSES ONLY
         * Guests will not add up the order to the database, instead we'll use local storage
         * on production guests should be added to DB, since all orders must be properly recorded
         */

        if (this.state.logged) {
            axios.post('/order/place', data).then(response => {
                if (response.data.result == 'success') {
                    this.setState({
                        confirmed: true
                    })                    
                    this.state.clear()
                    localStorage.removeItem('cart')
                }
            })
        } else {
            this.state.clear()
            localStorage.removeItem('cart')
        }
    }

    render() {

        if (this.state.confirmed == false) {
            return (
                <div>
                    <h4>SHIPPING ADDRESS</h4>
                    <form onSubmit={this.pay}>
                        <div uk-grid='true' className='uk-child-width-1-2@m uk-child-width-1-1@s'>

                            <div>
                                <div className='uk-card uk-card-default uk-padding-small'>
                                    <div className='uk-margin-small-bottom'>
                                        <label>Company</label>
                                        <input maxLength='70' ref={this.company} type="text" className='uk-input' />
                                    </div>
                                    <div className='uk-margin-bottom uk-child-width-1-2' uk-grid='true'>
                                        <div>
                                            <label>First name</label>
                                            <input maxLength='70' required ref={this.name} type="text" className='uk-input' />
                                        </div>
                                        <div>
                                            <label>Last name</label>
                                            <input maxLength='70' required ref={this.lastname} type="text" className='uk-input' />
                                        </div>
                                    </div>
                                    <div className='uk-margin-small-bottom'>
                                        <label>Address</label>
                                        <input maxLength='70' required ref={this.address} type="text" className='uk-input' />
                                    </div>
                                    <div className='uk-margin-small-bottom'>
                                        <label>Apt, Suite, House, etc... (Optional)</label>
                                        <input maxLength='70' required ref={this.apt} type="text" className='uk-input' />
                                    </div>
                                    <div className='uk-margin-small-bottom'>
                                        <label>City</label>
                                        <input maxLength='70' required ref={this.city} type="text" className='uk-input' />
                                    </div>
                                </div>
                            </div>
                            <div className='uk-width-auto@m uk-width-1-1'>
                                <div className='uk-padding-small uk-card uk-card-default'>
                                    <div className='uk-text-lead'>
                                        <span>{this.state.items} items</span><br />
                                        <span>Subtotal: {this.state.currency}{this.state.total}</span>
                                    </div>
                                    <hr className='uk-hr' />
                                    <button type='submit' className='uk-button uk-display-block uk-margin-auto uk-button-primary rdbtn uk-border-rounded'>Confirm & Pay</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            )
        } else {
            return (
                <div className='uk-text-center'>
                    <h2>Congratulations, your order has been processed and should be on its way to be delivered in 15 minutes!</h2>
                    <p className='uk-text-bold uk-text-lead'>Click <Link to='/orders/'>here</Link> to view your order history.</p>
                </div>
            )
        }
    }
}