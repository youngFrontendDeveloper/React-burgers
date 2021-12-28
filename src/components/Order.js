import React from "react";
import Shipment from "./Shipment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {
  static propTypes = {
    deleteFromOrder: PropTypes.func,
    burgers: PropTypes.object,
    order: PropTypes.object
  };

  renderOrder = (key) => {
    const burger = this.props.burgers[ key ];
    const count = this.props.order[ key ];
    const isAvailable = burger && burger.status === "available";
    const transitionsStyles = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if( isAvailable ) {
      return <CSSTransition
        { ...transitionsStyles }>
        <li key={ key }>
        <span className="order__container">
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={ count } timeout={ { enter: 500, exit: 500 } }>
                <span>{ count } </span>
              </CSSTransition>
          </TransitionGroup>
          &nbsp; шт. { burger.name } &nbsp;
          <TransitionGroup component="span" className="cost">
            <CSSTransition
              classNames="cost"
              key={ count * burger.price }
              timeout={ { enter: 500, exit: 500 } }>
              <span> { count * burger.price }&nbsp; </span>
            </CSSTransition>
          </TransitionGroup>
          ₽ &emsp;
          <button className="cancellItem" onClick={ () => {
            this.props.deleteFromOrder( key );
          } }> &times;</button>
    </span>
        </li>
      </CSSTransition>;

    }
    return <CSSTransition { ...transitionsStyles }      >
      <li className="unavailable" key={ key }>Извините, { burger ? burger.name : "бургер" } временно
        недоступен
      </li>
    </CSSTransition>;
  };

  render() {
    // console.log( this.props.order );
    // console.log( Object.keys( this.props.order ) );

    const orderIds = Object.keys( this.props.order || {} );
    const total = orderIds.reduce( (prevTotal, key) => {
      const burger = this.props.burgers[ key ];
      const count = this.props.order[ key ];
      const isAvailable = burger && burger.status === "available";
      if( isAvailable ) {
        return prevTotal + burger.price * count;
      }
      return prevTotal;
    }, 0 );

    return (
      <div>
        <h2>Ваш заказ</h2>
        <TransitionGroup component="ul" className="order">
          { this.props.order && orderIds.map( this.renderOrder ) }
        </TransitionGroup>
        { total > 0 ? ( <Shipment total={ total }/> ) : (
          <div className="nothingSelected">Выберите блюдо и нажмите на кнопку 'Заказать'</div> ) }
      </div>
    );
  }
}

export default Order;
