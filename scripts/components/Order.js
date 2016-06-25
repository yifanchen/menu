import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
export default class Order extends React.Component {
  renderOrder(key) {
    let fish = this.props.fishes[key];
    let count = this.props.order[key];
    let removeButton = <button onClick={this.props.removeFromOrder.bind(null,key)}>&times;</button>

    if(!fish) {
      return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup component="span" transitionName="count" transitionLeaveTimeout={250} transitionEnterTimeout={250} className="count">
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>)
  }

  render() {
    let orderIds = Object.keys(this.props.order);

    let total = orderIds.reduce((prevTotal, key)=> {
      let fish = this.props.fishes[key];
      let count = this.props.order[key];
      let isAvailable = fish && fish.status === 'available';

      if(fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup
              className="order"
              component="ul"
              transitionName="order"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
};

Order.propTypes = {
  fishes : React.PropTypes.object.isRequired,
  order : React.PropTypes.object.isRequired,
  removeFromOrder : React.PropTypes.func.isRequired
}
