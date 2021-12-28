import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurgers from "../sample-burgers";
import SignIn from "./Auth/SignIn";


function App() {
  const { restaurantsId } = useParams();
  const initialState = sampleBurgers;
  const [ burgers, setBurgers ] = useState( initialState );
  const [ order, setOrder ] = useState( {} );


  // Загрузка заказа из localStorage и бургеров из Firebase после отрисовки страницы:
  useEffect( () => {
    // const unsubscribe = () => {  // функция для дальнейшей отписки
    const localStorageRef = localStorage.getItem( restaurantsId );
    setOrder( JSON.parse( localStorageRef ) );

    const burgersRef = ref( db, `${ restaurantsId }/burgers` );
    onValue( burgersRef, (snapshot) => {
      const data = snapshot.val();
      setBurgers( data );
    } );
    // };
    // return unsubscribe;   // отписка от получения данных
  }, [] );


  //  Обновление данных базы Firebase при изменении в burgers
  useEffect( () => {
    set( ref( db, `${ restaurantsId }/burgers` ), burgers );
    console.log( burgers );
  }, [ burgers ] );


  // Записываем в localStorage сведения о заказе при обновлении заказа:
  useEffect( () => {
    localStorage.setItem( restaurantsId, JSON.stringify( order ) );
  }, [ order ] );


  // Добавление бургеров в меню
  const addBurger = (burger) => {
    console.log( "Added" );
    //1.Делаем копию объекта burgers:
    const copyBurgers = { ...burgers };

    //2. Добавляем новый бургер в переменную burgers:
    copyBurgers[ `burger${ Date.now() }` ] = burger;

    //3. Записываем наш новый объект burgers в state:
    setBurgers( copyBurgers );

    //4. Записываем наш новый объект burgers из state в Firebase:
    // writeBurgers();

  };

  // Функция для записи данных burgers из state в Firebase:
  function writeBurgers() {
    set( ref( db, `${ restaurantsId }/burgers` ), burgers );
  }

  // Загружаем бургеры из Firebase
  const loadSampleBurgers = () => {
    const burgersRef = ref( db, `${ restaurantsId }/burgers` );
    onValue( burgersRef, (snapshot) => {
      const data = snapshot.val();
      setBurgers( data );
    } );

  };

  // Добавляем бургеры в заказ order
  const addToOrder = (key) => {

    //1.Делаем копию объекта state:
    const newOrder = { ...order };

    //2.Добавляем в заказ бургер со значением 1 либо увеличиваем текущее значение на 1:
    newOrder[ key ] = newOrder[ key ] + 1 || 1;

    //3. Записываем наш новый объект order в state:
    setOrder( newOrder );
    //4. Записываем наш новый объект burgers из state в Firebase:
    writeBurgers();

  };

  // Функция для обновление бургера:
  const updateBurger = (key, updatedBurger) => {
    //1.Делаем копию объекта burgers:
    const copyBurgers = { ...burgers };

    //2.Обновляем конкретный burger по ключу в стейте burgers:
    copyBurgers[ key ] = updatedBurger;

    //3.Обновляем стейт burgers:
    setBurgers( copyBurgers );
    //4. Записываем наш новый объект burgers из state в Firebase:
    // writeBurgers();
  };

  // Функция на удаление бургера в компоненте Burger
  const deleteBurger = (key) => {
    console.log( key );
    //1.Делаем копию объекта burgers:
    const copyBurgers = { ...burgers };
    console.log( copyBurgers );

    //2.Удаляем конкретный burger по ключу в стейте burgers :
    console.log( copyBurgers[ key ] );
    delete copyBurgers[ key ];
    // copyBurgers[ key ] = null;
    console.log( copyBurgers );

    //3.Обновляем стейт burgers:
    setBurgers( copyBurgers );
    console.log( burgers );
    //4. Записываем наш новый объект burgers из state в Firebase:
    // writeBurgers();
  };

  // Функция на удаление бургера из order:
  const deleteFromOrder = (key) => {
    //1.Делаем копию объекта state:
    const newOrder = { ...order };

    //2.Отнимаем в заказе из количества бургеров 1 , и когда количество становится равно 0, убираем бургеры из заказа:
    newOrder[ key ] = newOrder[ key ] - 1;
    if( newOrder[ key ] === 0 ) {
      delete newOrder[ key ];
    }
    //3. Записываем наш новый объект order в state:
    setOrder( newOrder );
  };

  return (
    <SignIn>
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Hot Burgers"/>
          <ul className="burgers">
            { burgers ?
              Object.keys( burgers ).map( key => {
                // console.log( Object.keys( this.state.burgers ) );
                return <Burger
                  key={ key }
                  index={ key }
                  details={ burgers[ key ] }
                  addToOrder={ addToOrder }
                />;
              } ) : null
            }
          </ul>
        </div>
        <Order burgers={ burgers } order={ order } deleteFromOrder={ deleteFromOrder }/>
        <MenuAdmin
          addBurger={ addBurger }
          loadSampleBurgers={ loadSampleBurgers }
          burgers={ burgers }
          updateBurger={ updateBurger }
          deleteBurger={ deleteBurger }
        />
      </div>
    </SignIn>
  );

}

export default App;
