import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: props.cart,
            items: props.items,
            orders: props.orders,
            additem: props.addItem,
            removeitem: props.removeItem
        }
    }

    static getDerivedStateFromProps(props) {
        return {
            cart: props.cart,
            items: props.items,
            orders: props.orders,
            additem: props.addItem
        }
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.state.cart.items > 0 ?
                    <table className='uk-table uk-table-small uk-table-hover uk-table-striped'>
                        <thead>
                            <tr>
                                <th className='uk-text-center uk-bold'>Menu item</th>
                                <th className='uk-text-center uk-bold'>Quantity</th>
                                <th className='uk-text-center uk-bold'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.state.orders).map((itemID) => {

                                    let ref = React.createRef()

                                    return (
                                        <tr key={(+itemID) - 1} className='uk-flex-middle'>
                                            <td className='uk-text-middle'>
                                                {this.state.items[(+itemID) - 1].name}
                                            </td>
                                            <td className='uk-text-middle'>
                                                <span onClick={t => {
                                                    this.state.removeitem(ref.current.getAttribute('data-id'), (+this.state.items[(+itemID) - 1].price))
                                                }} uk-icon='icon:minus;ratio:0.8' className='hand uk-margin-small-right'></span>
                                                <input ref={ref} data-id={itemID} type="number" readOnly={true} className='uk-input adjust-orders' value={this.state.orders[itemID].amount} />
                                                <span onClick={t => {
                                                    this.state.additem(ref.current.getAttribute('data-id'), 1)
                                                }} uk-icon='icon:plus;ratio:0.8' className='hand uk-margin-small-left'></span>
                                            </td>
                                            <td className='uk-text-middle'>
                                                {this.state.cart.currency}
                                                {
                                                    this.state.cart.currency == '€'
                                                        ? (+(+(+this.state.items[(+itemID) - 1].price) * (+this.state.orders[itemID].amount)) * 0.94).toFixed(2)
                                                        : (+(+this.state.items[(+itemID) - 1].price) * (+this.state.orders[itemID].amount)).toFixed(2)
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan='2'>Additional delivery fees</td>
                                <td>
                                    {this.state.cart.currency}{this.state.cart.currency == '€' ? (6 * 0.94) : 6}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <Link to='/checkout/' className='uk-text-bold uk-button uk-button-primary uk-border-rounded rdbtn'>Check Out</Link>
                                </td>
                                <td><h4 className='uk-margin-remove-top uk-margin-remove-bottom uk-display-inline'>Subtotal: <strong>{this.state.cart.currency}{this.state.cart.currency == '€' ? (+(+this.state.cart.total * 0.94) + (6 * 0.94)).toFixed(2) : (+(+this.state.cart.total) + 6).toFixed(2)}</strong></h4></td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <div>
                        <h3>You don't have any item on your cart, visit our <Link to='/'>menu</Link> to order some delicious food!</h3>
                    </div>
                }

            </div>
        )
    }

}

export default Cart;