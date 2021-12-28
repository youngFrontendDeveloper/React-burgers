import React, { useState } from "react";
import { Link } from "react-router-dom";
import restaurants from "../sample-restaurants";

function Landing() {
  const [ display, setDisplay ] = useState( false );
  const [ title, setTitle ] = useState( "" );
  const [ url, setUrl ] = useState( "" );

  const displayList = () => {
    setDisplay( !display );
  };

  const getTitle = (rest) => {
    setTitle( rest.title );
    setUrl( rest.url );
    setDisplay( false );
  };

  return (
    <div className="restaurant_select">
      <div className="restaurant_select_top">
        <div
          onClick={ displayList }
          className="restaurant_select_top-header font-effect-outline"
        >
          { title ? title : "Выберите ресторан:" }
        </div>
        <div className="arrow_picker">
          <div className="arrow_picker-up"></div>
          <div className="arrow_picker-down"></div>
        </div>
      </div>

      { display && (
        <div className="restaurant_select_bottom">
          <ul>
            { restaurants.map( (rest) => {
              return (
                <li onClick={ () => getTitle( rest ) } key={ rest.id }>
                  { rest.title }
                </li>
              );
            } ) }
          </ul>
        </div>
      ) }
      { title && !display ? (
        <Link
          className="button"
          to={ `/restaurant/${ url }` }
        >
          Перейти в ресторан
        </Link>
      ) : null }
    </div>
  );

}

export default Landing;
