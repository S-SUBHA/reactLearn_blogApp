import { useDispatch } from "react-redux";
import authService from "../../services/auth.services.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginReducer } from "../../store/features/auth.slice.js";
import Logo from "../Utils/Logo.jsx";
import { useForm } from "react-hook-form";
import Input from "../Utils/Input.jsx";
import Button from "../Utils/Button.jsx";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  async function handleSignup(data) {
    setError(null);
    console.log(data);

    if (data.password != data.confirm_password) {
      setError("Password and Confirmed-password doesnot match!");
      return;
    }

    try {
      const session = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(loginReducer(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-[70vh] sm:h-[80vh]">
      <div className="bg-[#ffffff20] w-full sm:w-1/2 h-full sm:h-4/5 rounded-2xl flex flex-col justify-center items-center">
        <div>
          <span>
            <Logo />
          </span>
        </div>

        <h2 className="font-semibold">Create an Account</h2>

        <p className="font-semibold">
          Already have an account?&nbsp;
          <Link to={"/login"} className="text-blue-600 font-bold">
            Login
          </Link>
        </p>

        {error && (
          <p className="text-red-500 font-serif font-light py-4">{error}</p>
        )}
        {/* {error && <p>{error}</p>} */}

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col justify-center items-center mt-4 sm:mt-8 w-full"
        >
          <Input
            // label="Name: "
            type="text"
            placeholder="Name"
            className="text-xl p-2 m-2 rounded-md sm:w-[150%] sm:-translate-x-[18%] sm:mb-4"
            {...register("name", {
              required: true,
            })}
          />

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
            type="text"
            placeholder="Password"
            className="text-xl p-2 m-2 rounded-md sm:w-[150%] sm:-translate-x-[18%] sm:mb-4"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 71,
            })}
          />

          <Input
            // label="Confirm-Password: "
            type="text"
            placeholder="Confirm-Password"
            className="text-xl p-2 m-2 rounded-md sm:w-[150%] sm:-translate-x-[18%] sm:mb-4"
            {...register("confirm_password", {
              required: true,
              minLength: 8,
              maxLength: 71,
            })}
          />

          {/* {error && <p className="text-red-500 font-serif font-light py-4">{error}</p>} */}
          <Button
            type="submit"
            className="text-center font-semibold px-6 sm:px-24 py-2 m-2 rounded-md sm:mt-6"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
