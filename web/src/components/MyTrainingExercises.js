import React, { useEffect, useState } from "react";
import apiUser from "../services/api-users";
const MyTrainingExercises = (props) => {
  const userId = localStorage.getItem("userId");
  const [favouritesExercises, setFavouritesExercises] = useState([]);
  //Pedimos los ejercicios del usuario:
  useEffect(() => {
    apiUser.getUserExercises(userId).then((data) => {
      setFavouritesExercises(data.myFavouriteExercises);
    });
  }, [userId]);
  const renderFavouritesExercises = () => {
    return <ul className="cards">{renderFavs()}</ul>;
  };
  const handleFavourite = (exerciseId) => {
    const userId = localStorage.getItem("userId");
    apiUser.setExerciseFavourite(userId, exerciseId).then((res) => {
      setFavouritesExercises((prev) =>
        prev.filter((item) => {
          return item.id !== exerciseId;
        })
      );
    });
  };

  const renderFavs = () => {
    if (favouritesExercises.length !== 0) {
      return favouritesExercises.map((exercise) => {
        return (
          <li key={exercise.id} className="training__card">
            <img
              className="training__img"
              src={exercise.image}
              alt={`${exercise.name}`}
            />
            <h3 className="training__subtitle">{exercise.name}</h3>
            <i
              className="fa-solid fa-heart training__fav"
              onClick={() => handleFavourite(exercise.id)}
            >
              <span className="training__makeFav">Not Fav</span>
            </i>
            <p className="training__description">
              How to do it: {exercise.description}
            </p>
            <p className="training__difficulty">
              Difficulty: {exercise.difficulty}
            </p>
          </li>
        );
      });
    } else {
      return <p className="errorMessage"> There are not favourites</p>;
    }
  };
  return (
    <section className="training">
      <h1 className="training__title">These are your favorite exercises</h1>
      {renderFavouritesExercises()}
    </section>
  );
};
export default MyTrainingExercises;
