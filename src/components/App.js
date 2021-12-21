import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../base";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";


function App() {
  const [ burgers, setBurgers ] = useState( {} );
  const [ order, setOrder ] = useState( {} );
  const { restaurantsId } = useParams();

  // Загрузка бургеров из Firebase после отрисовки страницы:
  useEffect( () => {
    const burgersRef = ref( db, `${ restaurantsId }/burgers` );
    onValue( burgersRef, (snapshot) => {
      const data = snapshot.val();
      setBurgers( data );
    } );

  }, [] );


  // Добавление бургеров в меню
  const addBurger = (burger) => {
    //1.Делаем копию объекта state:
    // const newBurgers = { ...this.state.burgers };
    const copyBurgers = burgers;

    //2. Добавляем новый бургер в переменную burgers:
    copyBurgers[ `burger${ Date.now() }` ] = burger;

    //3. Записываем наш новый объект burgers в state:
    setBurgers( copyBurgers );

    //3. Записываем наш новый объект burgers из state в Firebase:
    writeBurgers();
  };

  // Функция для записи данных burgers из state в Firebase:
  function writeBurgers() {
    set( ref( db, `${ restaurantsId }/burgers` ), burgers );
  }

  // Загружаем бургеры из файла
  // const loadSampleBurgers = () => {
  //   setBurgers( sampleBurgers );
  // };

  // Загружаем бургеры из Firebase
  // const loadSampleBurgers = () => {
  //   const burgersRef = ref( db, `${ restaurantsId }/burgers` );
  //   onValue( burgersRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setBurgers( data );
  //   } );
  //
  // };

  // Добавляем бургеры в заказ
  const addToOrder = (key) => {

    //1.Делаем копию объекта state:
    const newOrder = { ...order };

    //2.Добавляем в заказ бургер со значением 1 либо увеличиваем текущее значение на 1:
    newOrder[ key ] = newOrder[ key ] + 1 || 1;

    //3. Записываем наш новый объект order в state:
    setOrder( newOrder );

  };

  return (
    <div className="burger-paradise">
      <div className="menu">
        <Header title="Hot Burgers"/>
        <ul className="burgers">
          {
            Object.keys( burgers ).map( key => {
              // console.log( Object.keys( this.state.burgers ) );
              return <Burger
                key={ key }
                index={ key }
                details={ burgers[ key ] }
                addToOrder={ addToOrder }
              />;
            } ) }
        </ul>
      </div>
      <Order burgers={ burgers } order={ order }/>
      <MenuAdmin
        addBurger={ addBurger }
        // loadSampleBurgers={ loadSampleBurgers }
      />
    </div>
  );

}

export default App;
