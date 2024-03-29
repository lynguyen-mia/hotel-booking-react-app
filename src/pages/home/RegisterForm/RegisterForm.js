import React from "react";
import "./RegisterForm.css";

export default function RegisterForm() {
  return (
    <div className="register-form">
      <div className="register-form__container">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="register-form__form"
          ></input>
          <button type="submit" className="register-form__btn">
            Subcribe
          </button>
        </form>
      </div>
    </div>
  );
}
