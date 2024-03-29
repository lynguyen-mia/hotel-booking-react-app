import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "./login.module.css";
import RegisterForm from "../home/RegisterForm/RegisterForm";
import validation from "../../utils/input-validation";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();

  async function onLogin(e) {
    e.preventDefault();
    setErrors({});

    const email = emailRef.current.value.trim().toLowerCase();
    const password = passwordRef.current.value.trim().toLowerCase();

    // Client-side validation
    const errors = validation(email, password);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    // Send login data to backend
    const loginData = { email, password };
    const res = await fetch(
      "https://hotel-booking-node-app.onrender.com/login",
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
    const data = await res.json();

    // Save token to local storage
    localStorage.setItem("curUser", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));

    // Go back to home page or previous product page
    const lastSeenProduct = localStorage.getItem("curProduct");
    if (lastSeenProduct) {
      localStorage.removeItem("curProduct");
      window.location.assign(`/detail/${lastSeenProduct}`);
      return;
    }
    return navigate("/");
  }

  return (
    <>
      <div
        className={`container d-flex flex-column text-center ${styles["signup-container"]}`}
      >
        <h1 className="fs-3 text-secondary mb-4">Login</h1>

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
            type="password"
            name="password"
            placeholder="Password* (must have at least 6 characters)"
            className="border-light-subtle"
            ref={passwordRef}
          />

          <button
            className="btn btn-dark text-white pt-2 mt-3 w-100 rounded-1"
            onClick={onLogin}
          >
            Login
          </button>
        </form>
        <p className="text-secondary">
          Create an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <RegisterForm />
    </>
  );
};

export default Login;
