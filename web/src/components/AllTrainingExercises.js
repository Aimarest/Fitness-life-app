import React from "react";
import apiUser from "../services/api-users";
const AllTrainigExercises = (props) => {
  const renderExercisesList = () => {
    return <ul className="cards">{renderAllExercises()}</ul>;
  };
  const handleFavourite = (exerciseId) => {
    const userId = localStorage.getItem("userId");
    apiUser.setExerciseFavourite(userId, exerciseId).then((res) => {
      console.log(res);
    });
  };

  const renderAllExercises = () => {
    return props.AllTrainigExercises.map((exercise) => {
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
            <span className="training__makeFav">Make Fav</span>
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
  };
  return (
    <section className="training">
      <h1 className="training__title">These are all training exercises:</h1>
      {renderExercisesList()}
    </section>
  );
};
export default AllTrainigExercises;
