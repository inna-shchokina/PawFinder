import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useUserAuth } from "../contexts/UserAuthContext";
import { ToastContainer } from "react-toastify";

const localInitialState = { email: "", password: "" };
function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}
function Login() {
  const [{ email, password }, localDispatch] = useReducer(
    reducer,
    localInitialState
  );
  const { isAuthenticated, handleLogin } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(email, password);
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return (
    <main>
      <div className="bg-light w-[80%] md:w-[50%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
        <h2 className="text-[2.4rem] font-bold">
          Please enter your credentials
        </h2>
        <form
          className="registerForm flex flex-col gap-[5rem] w-[70%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              localDispatch({ type: "setEmail", payload: e.target.value })
            }
            required
          />
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              localDispatch({ type: "setPassword", payload: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
          >
            Login
          </button>
        </form>
        <h2 className="text-[2.4rem] font-bold">Or</h2>
        <button className="btn flex items-center gap-[1rem] bg-white py-[1rem] px-[2rem] text-[1.6rem] rounded-[1.5rem] hover:bg-light hover:border-2 hover:border-dark">
          <span>
            <FcGoogle className="text-[2.4rem]" />
          </span>
          <span>Sign up with Google</span>
        </button>
        <h3 className="text-[1.4rem]">
          Not a member yet?{" "}
          <Link to="/register" className="font-semibold">
            Sign up
          </Link>
        </h3>
      </div>
      <ToastContainer className="text-[1.4rem] w-[30%]" />
    </main>
  );
}

export default Login;
