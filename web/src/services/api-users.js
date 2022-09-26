// Sign up
 const serverPort = process.env.PORT || 4000; 
const sendSignUpToApi = (data) => {
 
  return fetch(`http://localhost:${serverPort}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

//Login
const sendLoginToApi = (data) => {
  return fetch(`http://localhost:${serverPort}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
//Profile:
const getProfileFromApi = (userId) => {
  return fetch(`http://localhost:${serverPort}/profile`, {
    headers: {
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const setRecipeFavourite = (userId, recipeId) => {
  const data = {
    recipeId: recipeId.toString(),
  };
  return fetch(`http://localhost:${serverPort}/myKitchenRecipes`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
const setExerciseFavourite = (userId, exerciseId) => {
  const data = {
    exerciseId: exerciseId.toString(),
  };
  return fetch(`http://localhost:${serverPort}/myTrainingExercises`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
//Pedimos los ejercicios del usuario:
const getUserExercises = (userId) => {
  return fetch(`http://localhost:${serverPort}/myTrainingExercises`, {
    headers: {
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
//Pedimos las recetas del usuario:
const getUserRecipes = (userId) => {
  return fetch(`http://localhost:${serverPort}/myKitchenRecipes`, {
    headers: {
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
const sendProfileToApi = (userId, data) => {
  //Body params:
  const bodyParams = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  return fetch(`http://localhost:${serverPort}/profile`, {
    method: "POST",
    body: JSON.stringify(bodyParams),
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  })
    .then((response) => response.json())

    .then((data) => {
      return data;
    });
};
const objectToExport = {
  sendSignUpToApi: sendSignUpToApi,
  sendLoginToApi: sendLoginToApi,
  setRecipeFavourite: setRecipeFavourite,
  setExerciseFavourite: setExerciseFavourite,
  getUserExercises: getUserExercises,
  getUserRecipes: getUserRecipes,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
};
export default objectToExport;
