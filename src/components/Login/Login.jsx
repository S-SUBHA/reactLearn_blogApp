import { useDispatch } from "react-redux";
import { login as loginReducer } from "../../store/features/auth.slice.js";
import authService from "../../services/auth.services.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../index.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  async function handleLogin(data) {
    setError(null);
    // console.log("data:", data);

    try {
      const session = await authService.login(data.email, data.password);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(loginReducer(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function togglePasswordVisibility(e) {
    const passwordField =
      e.currentTarget.parentElement.previousSibling.lastChild;
      const fc = e.currentTarget.firstChild;
      const lc = e.currentTarget.lastChild;
    passwordField.type =
      passwordField.type === "password" ? "text" : "password";

    fc.classList.toggle("hidden");
    lc.classList.toggle("hidden");
  }

  return (
    <div className="flex justify-center items-center h-[50vh] sm:h-[80vh]">
      <div className="bg-[#ffffff20] sm:bg-transparent lg:bg-[#ffffff20] w-full sm:w-1/2 h-full sm:h-4/5 rounded-2xl flex flex-col justify-center items-center">
        <div>
          <span>
            <Logo />
          </span>
        </div>

        <h2 className="font-semibold">Sign in to your account</h2>

        <p className="font-semibold">
          Don&apos;t have an account?&nbsp;
          <Link to={"/signup"} className="text-blue-600 font-bold">
            Sign Up
          </Link>
        </p>

        {error && <p>{error}</p>}

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col justify-center items-center mt-4 sm:mt-12 w-full"
        >
          <Input
            // label="Email: "
            type="email"
            placeholder="Email"
            className="text-xl p-2 m-2 rounded-md sm:w-[150%] sm:-translate-x-[18%] sm:mb-4"
            {...register("email", {
              required: true,
            })}
          />

          <Input
            // label="Password: "
            type="password"
            placeholder="Password"
            className="text-black text-xl p-2 m-2 rounded-md sm:w-[150%] sm:-translate-x-[18%] sm:mb-4"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 71,
            })}
          />

          <div className="self-center translate-x-24 sm:translate-x-44 -mt-10 sm:-mt-12 z-10 mb-2">
            <div
              className="flex justify-end items-center"
              onClick={(e) => togglePasswordVisibility(e)}
            >
              <svg
                className="hidden"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#00000080"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#00000080"
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            </div>
            {/* <span>&nbsp;Show Password</span> */}
          </div>

          <Button
            type="submit"
            className="text-center font-semibold px-6 sm:px-24 py-2 m-2 rounded-md sm:mt-6"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
