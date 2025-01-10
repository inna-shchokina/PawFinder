import { useReducer } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  fullName: "",
  password: "",
  email: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setFullName":
      return { ...state, fullName: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
function Registration() {
  const [{ fullName, password, email }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const navigate = useNavigate();

  async function registerUserToDataBase(user) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        user
      );
      // console.log("user is in the data base");
      toast.success("Wow you are a paw finder!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { fullName, email, password, userType: "individual" };
    registerUserToDataBase(newUser);
  }

  /*   async function registerUserToDataBase(user) {
    try {
      await axios.post(`http://localhost:8000/api/auth/register`, user);
      console.log("user is in the data base");
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { fullName, email, password, userType: "individual" };
    registerUserToDataBase(newUser);
    navigate("/");
  } */

  /*   const handleGoogleSignUp = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/google/callback");
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleGoogleSignUp = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <main>
      <div className="bg-light w-[80%] md:w-[50%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[5rem] shadow-sm">
      <h2 className="text-dark text-[22px] font-semibold -mt-4 text-center mb-6">Create your account</h2>
        <form
          className="registerForm flex flex-col gap-[3rem] w-[100%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
          {/* Full Name Input */}
        <div>
          <label
            htmlFor="fullName"
            className="ml-8 block text-dark font-bold text-[14px] mb-2"
          >
            Full Name
          </label>
          <div>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) =>
                dispatch({ type: "setFullName", payload: e.target.value })
              }
              placeholder="Enter your full name"
              className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
              placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
              focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
              required
            />
          </div>
        </div>

          {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="ml-8 block text-dark font-bold text-[14px] mb-2"
          >
            Email
          </label>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                dispatch({ type: "setEmail", payload: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
              placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
              focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
              required
            />
          </div>
        </div>

          {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="ml-8 block text-dark font-bold text-[14px] mb-2"
          >
            Password
          </label>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) =>
                dispatch({ type: "setPassword", payload: e.target.value })
              }
              placeholder="Enter your password"
              className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
              placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
              focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
              required
            />
          </div>
        </div>

          {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full 
            hover:bg-[#8D9F19] transition"
          >
            Sign up
          </button>
        </div>
        </form>
        <h2 className="text-[2rem] font-semibold">or</h2>
        <button
          className="btn flex items-center gap-[1rem] bg-white py-[1rem] px-[2rem] text-[14px] font-medium rounded-[4rem] hover:bg-light hover:border-2 hover:border-dark -mt-6"
          onClick={handleGoogleSignUp}
        >
          <span>
          <FcGoogle className="text-[2rem]" />
          </span>
          <span>Sign up with Google</span>
        </button>
        <h3 className="text-[1.4rem]">
          Already a member?{" "}
          <Link to="/login" className="font-semibold">
            Login
          </Link>
        </h3>
      </div>
      <ToastContainer className="text-[1.4rem]" />
    </main>
  );
}

export default Registration;
