import React, { useState } from "react";
const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(" ");
  const handleForm = (ev) => {
    ev.preventDefault();
    setPasswordErrorMessage(false);
    setSignUpErrorMessage("");

    if (password === confirmPassword) {
      // Enviamos los datos a App y este al API
      props.sendSignUpToApi({
        name: name,
        email: email,
        password: password,
      });
    } else {
      setPasswordErrorMessage(true);
    }
  };
  const passwordErrorRender = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (passwordErrorMessage !== false) {
      return (
        <p className="errorMessage">
          Error in password:
          <span className="error">passwords are not the same</span>
        </p>
      );
    }
  };

  const renderErrorMessage = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (props.signUpErrorMessage !== "") {
      return (
        <p className="errorMessage">
          Sign up error:
          <span className="error"> {props.signUpErrorMessage} </span>
        </p>
      );
    }
  };
  const handleName = (ev) => {
    setName(ev.target.value);
  };
  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };
  const handleConfirmPassword = (ev) => {
    setConfirmPassword(ev.target.value);
  };
  return (
    <section className="SignUp">
      <h1 className="SignUp__title">Sign up</h1>
      <form className="SignUp__form" onSubmit={handleForm}>
        <label className="SignUp__label" htmlFor="name">
          Write your name
        </label>
        <input
          className="SignUp__input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />
        <label className="SignUp__label" htmlFor="email">
          Write your email
        </label>
        <input
          className="SignUp__input"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="SignUp__label" htmlFor="password">
          Write your password
        </label>
        <input
          className="SignUp__input"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <label className="SignUp__label" htmlFor="confirmPassword">
          Write your password again
        </label>
        <input
          className="SignUp__input"
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />

        <input className="button" type="submit" value="check in" />

        {renderErrorMessage()}
        {passwordErrorRender()}
      </form>
    </section>
  );
};
export default SignUp;
