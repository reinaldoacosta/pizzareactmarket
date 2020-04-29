import React, { PureComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const MenuItem = (props) => {
    return (
        <div className="uk-card uk-card-default uk-margin-top uk-border-rounded uk-box-shadow-medium uk-card-hover">
            <div className="uk-card-media-top">
                <img src={'images/' + props.itemdata.img} style={{ maxHeight: 360, width: '100%' }} />
            </div>
            <div className="uk-card-body uk-padding-small">
                <div uk-grid='true' className='uk-margin-small-bottom uk-text-left uk-text-bold uk-text-large'>
                    <div className='uk-width-2-3'>
                        <h3 className="uk-card-title item-title">{props.itemdata.name}</h3>
                    </div>
                    <div className='uk-width-1-3 uk-text-right item-title'>{props.currency}{props.currency == '$' ? props.itemdata.price : (+(props.itemdata.price * 0.94)).toFixed(2)}</div>
                </div>
                <div className='uk-text-justify uk-margin-small-bottom'>
                    <span className='uk-text-small'>{props.itemdata.description.substr(0, 90)} <Link to={'/item/' + props.itemdata.id + '/' + props.itemdata.name.toLowerCase().replace(/\s/gi, '-')}>(Read more...)</Link>
                    </span>
                </div>
                <Link to={'/item/' + props.itemdata.id + '/' + props.itemdata.name.toLowerCase().replace(/\s/gi, '-')} className='uk-float-left uk-text-bold uk-button uk-button-primary uk-border-rounded rdbtn'>Order</Link>
            </div>
        </div>
    )
}

export default MenuItem;