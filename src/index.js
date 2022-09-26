const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");
// create and config server
const server = express();
server.use(cors());
server.use(express.json());
// set template engine middlewares
server.set("view engine", "ejs");

// init express aplication
const serverPort = process.env.PORT || 4000; 
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//Le decimos a Node que queremos usar esa base de datos:
const db = new Database("./src/data/database.db", { verbose: console.log });

//Endpoint para SignUp:

server.post("/signup", (req, res) => {
  //Body params:
  const nameSignUp = req.body.name;
  const emailSignUp = req.body.email;
  const passwordSignUp = req.body.password;
  //Preparamos la query:
  const userSignUp = db.prepare(`SELECT * FROM users WHERE email = ?`);
  //Ejecutamos la query:
  const foundUser = userSignUp.get(emailSignUp);
  console.log(foundUser);
  if (foundUser === undefined) {
    const insertUser = db.prepare(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)"
    );
    const newUser = insertUser.run(nameSignUp, emailSignUp, passwordSignUp);
    res.json({
      success: true,
      userId: newUser.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Existing user",
    });
  }
});
//Endpoint para LOGIN:

server.post("/login", (req, res) => {
  //Body params:
  const emailLogin = req.body.email;
  const passwordLogin = req.body.password;
  //Preparamos la query:
  const userLogin = db.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  //Ejecutamos la query:
  const foundUser = userLogin.get(emailLogin, passwordLogin);

  if (foundUser === undefined) {
    res.json({
      success: false,
      errorMessageLogin: "User not found",
    });
  } else {
    res.json({
      success: true,
      userId: foundUser.id,
    });
  }
});
//Endpoint para pedir los datos del perfil del usuario:
server.get("/profile", (req, res) => {
  const userId = req.headers["user-id"];
  //Preparamos la query:
  const getProfile = db.prepare(`SELECT * FROM users WHERE id = ? `);
  //Ejecutamos la query:
  const userDataProfile = getProfile.get(userId);
  res.json(userDataProfile);
});

//Endpoint de actualizar el perfil del usuario:

server.post("/profile", (req, res) => {
  const userId = req.headers["user-id"];
  //Preparamos la query:
  const query = db.prepare(
    `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`
  );
  //Ejecutamos la query:
  const updateProfile = query.run(
    req.body.name,
    req.body.email,
    req.body.password,
    userId
  );
  res.json({
    success: true,
    userProfile: updateProfile,
  });
});

// Endpoint para la petición del array de ejercicios:
server.get("/trainingExercises", (req, res) => {
  //Preparamos la query:
  const getExercises = db.prepare(`SELECT * FROM training`);
  //Ejecutamos la query:
  const allExercises = getExercises.all();
  res.json({
    success: true,
    allExercises: allExercises,
  });
});
// Endpoint para la petición del array de recetas:
server.get("/kitchenRecipes", (req, res) => {
  //Preparamos la query:
  const getRecipes = db.prepare(`SELECT * FROM kitchen_recipes`);
  //Ejecutamos la query:
  const allRecipes = getRecipes.all();
  res.json({
    success: true,
    allRecipes: allRecipes,
  });
});

//Endpoint para la petición del array de ejercicios favoritos:

server.get("/myTrainingExercises", (req, res) => {
  //Header params:
  const userId = req.headers["user-id"];
  //Preparamos la query:
  const getMyExercisesId = db.prepare(
    `SELECT exerciseId FROM favourites_exercises WHERE userId = ? `
  );
  //Ejecutamos la query:
  const myFavouriteExercises = getMyExercisesId.all(userId);

  const exercisesIdsQuestions = myFavouriteExercises.map((id) => "?").join(",");
  //Preparamos la segunda query para obtener los datos de los ejercicios:

  const exercisesQuery = db.prepare(
    `SELECT * FROM training WHERE id IN (${exercisesIdsQuestions})`
  );
  //Convertimos el array de objetos de id de ejercicios anterior en un array de números:
  const exercisesIdsNumbers = myFavouriteExercises.map(
    (exercise) => exercise.exerciseId
  );
  //Ejecutamos la segunda query:
  const exercises = exercisesQuery.all(exercisesIdsNumbers);
  res.json({
    succes: true,
    myFavouriteExercises: exercises,
  });
});
//Endpoint para la petición del array de recetas favoritas:

server.get("/myKitchenRecipes", (req, res) => {
  //Header params:
  const userId = req.headers["user-id"];
  //Preparamos la query:
  const getMyRecipes = db.prepare(
    `SELECT recipeId FROM favourites_recipes WHERE userId = ? `
  );
  //Ejecutamos la query:
  const myFavouriteRecipes = getMyRecipes.all(userId);
  //Recorremos el array que nos devuelve para saber cuántos registros hay:
  const recipesIdsQuestions = myFavouriteRecipes.map((id) => "?").join(",");
  //Preparamos la segunda query para obtener todos los datos de las recetas:

  const recipesQuery = db.prepare(
    `SELECT * FROM kitchen_recipes WHERE id IN (${recipesIdsQuestions})`
  );

  //Convertimos el array de objetos de id anterior en un array de números:
  const recipesIdsNumbers = myFavouriteRecipes.map((recipe) => recipe.recipeId);
  //Ejecutamos la segunda query:
  const recipes = recipesQuery.all(recipesIdsNumbers);

  res.json({
    succes: true,
    myFavouriteRecipes: recipes,
  });
});

//Favoritos:

//Endpoint en el que se busca si hay algún registro de la tabla con ese exerciseId y ese userId. Si no hay ninguno, se añade, y si hay alguno se borra.

server.post("/myTrainingExercises", (req, res) => {
  const userId = req.headers["user-id"];
  const exerciseId = req.body.exerciseId;
  const userFavourites = db.prepare(
    `SELECT * FROM favourites_exercises WHERE userId = ? AND exerciseId = ?`
  );
  const userDataFavourites = userFavourites.get(userId, exerciseId);
  console.log(userDataFavourites);
  if (userDataFavourites === undefined) {
    const addExerciseFav = db.prepare(
      "INSERT INTO favourites_exercises (userId, exerciseId) VALUES (?, ?)"
    );
    const userFav = addExerciseFav.run(userId, exerciseId);

    res.json({
      userFav: userFav,
    });
  } else {
    const deleteFav = db.prepare(
      "DELETE FROM favourites_exercises WHERE userId = ? and exerciseId = ?"
    );
    const notFav = deleteFav.run(userId, exerciseId);
    res.json({
      notFav: notFav,
    });
  }
});

//Endpoint en el que se busca si hay algún registro de la tabla con ese recipeId y ese userId. Si no hay ninguno, se añade, y si hay alguno se borra.

server.post("/myKitchenRecipes", (req, res) => {
  const userId = req.headers["user-id"];
  const recipeId = req.body.recipeId;
  const userFavourites = db.prepare(
    `SELECT * FROM favourites_recipes WHERE userId = ? AND recipeId = ?`
  );
  const userDataFavourites = userFavourites.get(userId, recipeId);
  console.log(userDataFavourites);
  if (userDataFavourites === undefined) {
    const addRecipeFav = db.prepare(
      "INSERT INTO favourites_recipes (userId, recipeId) VALUES (?, ?)"
    );
    const userFav = addRecipeFav.run(userId, recipeId);

    res.json({
      userFav: userFav,
    });
  } else {
    const deleteFav = db.prepare(
      "DELETE FROM favourites_recipes WHERE userId = ? and recipeId = ?"
    );
    const notFav = deleteFav.run(userId, recipeId);
    res.json({
      notFav: notFav,
    });
  }
});
// static server of images
const staticServerImagesPathWeb = "./src/public-training-images/";
server.use(express.static(staticServerImagesPathWeb));

server.use(express.static(path.resolve(__dirname, "./web/build")));
