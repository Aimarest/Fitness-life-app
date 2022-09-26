import React, { useEffect, useState } from "react";
import apiUser from "../services/api-users";

const MyKitchenRecipes = (props) => {
  const [favouritesRecipes, setFavouritesRecipes] = useState([]);
  //Pedimos las recetas del usuario:
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    apiUser.getUserRecipes(userId).then((data) => {
      setFavouritesRecipes(data.myFavouriteRecipes);
    });
  }, []);
  const renderFavouritesRecipes = () => {
    return <ul>{renderFavs()}</ul>;
  };
  const handleFavourite = (recipeId) => {
    const userId = localStorage.getItem("userId");
    apiUser.setRecipeFavourite(userId, recipeId).then((res) => {
      setFavouritesRecipes((prev) =>
        prev.filter((item) => {
          return item.id !== recipeId;
        })
      );
    });
  };
  const renderFavs = () => {
    if (favouritesRecipes.length !== 0) {
      return favouritesRecipes.map((recipe) => {
        return (
          <li key={recipe.id} className="recipeCard">
            <h3 className="recipeCard__subtitle ">{recipe.name}</h3>
            <i
              className="fa-solid fa-heart recipeCard__fav"
              onClick={() => handleFavourite(recipe.id)}
            >
              {" "}
              <span className="recipeCard__makeFav">Not Fav</span>
            </i>
            <p className="recipeCard__description">
              How to do it: {recipe.description}
            </p>
            <p className="recipeCard__difficulty">
              Difficulty: {recipe.difficulty}
            </p>
          </li>
        );
      });
    } else {
      return <p className="errorMessage">There are not favourites </p>;
    }
  };
  return (
    <section className="myRecipes">
      <h1 className="recipeCard__title">These are your favorite recipes</h1>
      {renderFavouritesRecipes()}
    </section>
  );
};
export default MyKitchenRecipes;
