import React from "react";
import { useState } from "react";
const Profile = (props) => {
  const [name, setName] = useState(props.userName);
  const [email, setEmail] = useState(props.userEmail);
  const [password, setPassword] = useState(props.userPassword);
  const [confirmPassword, setConfirmPassword] = useState(props.userPassword);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  const handleForm = (ev) => {
    ev.preventDefault();
    setPasswordErrorMessage(false);
    const userId = localStorage.getItem("userId");

    if (password === confirmPassword) {
      // Enviamos los datos a App y este al API
      props.sendDataProfile(userId, {
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
    if (passwordErrorMessage === true) {
      return (
        <p className="errorMessage">
          Error in password:
          <span className="error"> passwords are not the same</span>
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
    <section className="profile">
      <h1 className="profile__title">Your profile:</h1>
      <form className="profile__form" onSubmit={handleForm}>
        <label className="profile__label" htmlFor="name">
          Write your new name
        </label>
        <input
          className="profile__input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />
        <label className="profile__label" htmlFor="email">
          Write your new email
        </label>
        <input
          className="profile__input"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />
        <label className="profile__label" htmlFor="password">
          Write your new password
        </label>
        <input
          className="profile__input"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <label className="profile__label" htmlFor="confirmPassword">
          Write your password again
        </label>
        <input
          className="profile__input"
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <input className="button" type="submit" value="Save " />
        {passwordErrorRender()}
      </form>
    </section>
  );
};
export default Profile;
