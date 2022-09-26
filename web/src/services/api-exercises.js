const getAllExercises = () => {
  const serverPort = process.env.PORT || 4000; 
  return fetch(`http://localhost:${serverPort}/trainingExercises`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
export default getAllExercises;
