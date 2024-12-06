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
      <div className="bg-light  w-[80%] md:w-[50%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
        <h2 className="text-[2.4rem] font-bold">Create your account</h2>
        <form
          className="registerForm flex flex-col gap-[5rem] w-[70%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              dispatch({ type: "setFullName", payload: e.target.value })
            }
            required
          />

          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            required
          />
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
          >
            Sign up
          </button>
        </form>
        <h2 className="text-[2.4rem] font-bold">Or</h2>
        <button
          className="btn flex items-center gap-[1rem] bg-white py-[1rem] px-[2rem] text-[1.6rem] rounded-[1.5rem] hover:bg-light hover:border-2 hover:border-dark"
          onClick={handleGoogleSignUp}
        >
          <span>
            <FcGoogle className="text-[2.4rem]" />
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
