import React from "react";
import PropTypes from "prop-types";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

class MenuAdmin extends React.Component {

  static propTypes = {
    addBurger: PropTypes.func,
    updateBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
    loadSampleBurgers: PropTypes.func,
    burgers: PropTypes.object
  };

  render() {
    const burgers = this.props.burgers;
    return (
      <div className="menu-admin">
        <h2>Управление меню</h2>
        { burgers ?
          Object.keys( burgers ).map( key => {
            return <EditBurgerForm
              key={ key }
              burger={ burgers[ key ] }
              index={ key }
              updateBurger={ this.props.updateBurger }
              deleteBurger={ this.props.deleteBurger }/>;
          } ) : null
        }
        <AddBurgerForm addBurger={ this.props.addBurger }/>
        <button onClick={ this.props.loadSampleBurgers }>Загрузить бургеры</button>
      </div>
    );
  }
}

export default MenuAdmin;
