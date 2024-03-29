import NavBar from "../home/NavBarHeader/Navbar/NavBar";
import Footer from "../home/Footer/Footer";
import styles from "./login.module.css";
import RegisterForm from "../home/RegisterForm/RegisterForm";
import { useRef, useState } from "react";
import validation from "../../utils/input-validation";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  async function onSignup(e) {
    e.preventDefault();
    setErrors({});

    const email = emailRef.current.value.trim().toLowerCase();
    const password = passwordRef.current.value.trim().toLowerCase();
    const username = userNameRef.current.value.trim().toLowerCase();
    const fullname = fullNameRef.current.value.trim().toLowerCase();
    const phone = phoneRef.current.value.trim();

    // Client-side validation
    const errors = validation(email, password);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    // Send login data to database
    const loginData = { email, password, username, fullname, phone };
    const res = await fetch(
      "https://hotel-booking-node-app.onrender.com/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      }
    );

    if (res.status === 401) {
      const err = await res.json();
      setErrors(err);
      return;
    }
    return navigate("/login");
  }

  return (
    <>
      <div
        className={`container d-flex flex-column text-center ${styles["signup-container"]}`}
      >
        <h1 className="fs-3 text-secondary mb-4">Sign up</h1>

        {/* Show errors if any */}
        <ul className="ps-0">
          {errors &&
            Object.values(errors).map((err) => <li key={err}>{err}</li>)}
        </ul>

        {/* Form content */}
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className="border-light-subtle"
            ref={emailRef}
          />
          <input
            type="text"
            name="username"
            placeholder="Username*"
            className="border-light-subtle"
            ref={userNameRef}
          />
          <input
            type="password"
            name="password"
            placeholder="Password* (must have at least 6 characters)"
            className="border-light-subtle"
            ref={passwordRef}
          />
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            className="border-light-subtle"
            ref={fullNameRef}
          />
          <input
            type="number"
            name="phonenumer"
            placeholder="Phone number*"
            className="border-light-subtle"
            ref={phoneRef}
          />

          <button
            className="btn btn-dark text-white pt-2 mt-3 w-100 rounded-1"
            onClick={onSignup}
          >
            Sign up
          </button>
        </form>
      </div>

      <RegisterForm />
    </>
  );
};

export default Signup;
