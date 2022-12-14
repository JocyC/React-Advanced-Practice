import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// useParams is a Router method
// The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> . Child routes inherit all params from their parent routes.
const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  const fetchDrink = async () => {
    setLoading(true);
    try {
      const resp = await axios(`${url}${id}`);
      const data = await resp.data;
      // need to access the .drinks first
      if (data.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strGlass: glass,
          strCategory: category,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const newCocktail = {
          name,
          image,
          info,
          glass,
          category,
          instructions,
          ingredients,
        };
        setCocktail(newCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrink();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return (
      <h2 className="section-title">
        no cocktail to display... return to{" "}
        <Link to="/" className="btn btn-primary">
          home page
        </Link>
        ?
      </h2>
    );
  }
  const { name, image, info, glass, category, instructions, ingredients } =
    cocktail;
  return (
    <section>
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}> {item} </span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
