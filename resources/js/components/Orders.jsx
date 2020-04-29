import React, { PureComponent, Component } from 'react';
import Axios from 'axios';

export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            logged: props.logged,
            historyOrders: [],
        }
    }

    async componentDidMount() {
        if (this.state.logged) {
            Axios.get('/order/list').then(response => {
                this.setState({
                    historyOrders: response.data
                })
            })
        }
    }

    render() {
        if (this.state.logged) {
            if (this.state.historyOrders.length > 0) {
                return (
                    <div>
                        <table className='uk-table uk-table-striped uk-table-hover'>
                            <caption>Here are all your past orders</caption>
                            <thead>
                                <tr>
                                    <th>Receiver</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Order</th>
                                    <th>Invoice total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.historyOrders.map(order => {
                                        let items = JSON.parse(order.items);
                                        let item_description = ''
                                        Object.entries(items).map(([entry, i]) => {
                                            item_description += this.state.items[((+entry) - 1)].name + " x" + i.amount + ", ";
                                        })

                                        return (
                                            <tr key={order.id}>
                                                <td>{order.first_name} {order.last_name}</td>
                                                <td>{order.address}, {order.apt_number}</td>
                                                <td>{order.city}</td>
                                                <td>{item_description}</td>
                                                <td>{order.amount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            } else {
                return (
                    <div className='uk-text-center uk-padding uk-text-lead'>
                        You have no orders!
                    </div>
                )
            }
        } else {
            return (
                <div className='uk-text-center uk-padding uk-text-lead'>
                    You have no orders!
                </div>
            )
        }
    }
}