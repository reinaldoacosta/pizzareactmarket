import React, { PureComponent } from 'react';




class Item extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.data.name,
            id: props.data.id,
            description: props.data.description,
            img: props.data.img,
            price: props.data.price,
            addItem: props.addItem,
            defaultInputValue: 1,
            currency: props.currency
        }

        //create ref
        this.numberInput = React.createRef();
        this.additem = this.additem.bind(this);
        this.updateInput = this.updateInput.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState({
            currency: props.currency
        })
    }

    additem(form) {
        form.preventDefault()
        // Note: we're accessing "current" to get the DOM node
        if (parseInt(this.numberInput.current.value)) {
            //this.state.addItem, lifting the state up
            this.state.addItem(this.numberInput.current.getAttribute('data-id'), this.numberInput.current.value)
        }
    }

    updateInput(input) {
        this.setState({
            defaultInputValue: input.target.value
        })
    }

    render() {
        return (
            <div className='uk-container uk-margin-auto'>
                <div uk-grid='true'>
                    <div className='uk-width-1-3@m'>
                        <div>
                            <img src={'/images/' + this.state.img} className='uk-border-rounded uk-display-block uk-margin-auto' style={{ maxHeight: '500px' }} />
                        </div>
                    </div>
                    <div className='uk-width-2-3@m'>
                        <h1 className='item-title uk-text-justify uk-margin-remove-bottom'>{this.state.name}</h1>
                        <h3 className='item-title uk-text-justify uk-margin-remove-bottom uk-margin-remove-top'>{this.state.currency}{this.state.currency == '$' ? this.state.price : (this.state.price * 0.94).toFixed(2)}</h3>
                        <hr className='uk-hr' />
                        <div uk-grid='true'>
                            <div className='uk-text-justify uk-width-3-4@m uk-text-bold'>
                                {this.state.description}
                            </div>
                            <div className='uk-width-1-4@m'>
                                <form action="/api/order" method='post' onSubmit={this.additem}>
                                    <input ref={this.numberInput} type="number" min='1' required max='10' className='uk-input uk-text-bold' data-id={this.state.id} value={this.state.defaultInputValue} onChange={this.updateInput} />
                                    <input type="submit" className='uk-button uk-text-bold uk-button-primary uk-button-small uk-width-1-1 uk-margin-small-top rdbtn' value='Add to cart' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}




export default Item;