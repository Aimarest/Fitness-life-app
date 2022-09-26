import React from "react";
import apiUser from "../services/api-users";
const AllKitchenRecipes = (props) => {
  const renderRecipesList = () => {
    return <ul className="recipeCard__container">{renderAllRecipes()}</ul>;
  };
  const handleFavourite = (recipeId) => {
    const userId = localStorage.getItem("userId");
    apiUser.setRecipeFavourite(userId, recipeId).then((res) => {
      console.log(res);
    });
  };
  const renderAllRecipes = () => {
    return props.AllKitchenRecipes.map((recipe) => {
      return (
        <li key={recipe.id} className="recipeCard">
          <h3 className="recipeCard__subtitle">{recipe.name}</h3>
          <i
            className="fa-solid fa-heart recipeCard__fav"
            onClick={() => handleFavourite(recipe.id)}
          >
            <span className="recipeCard__makeFav">Make Fav</span>
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
  };
  return (
    <section>
      <h1 className="recipeCard__title">These are all kitchen recipes:</h1>
      {renderRecipesList()}
    </section>
  );
};
export default AllKitchenRecipes;
