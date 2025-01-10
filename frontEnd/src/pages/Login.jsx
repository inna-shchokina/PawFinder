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
      <div className="bg-light w-[80%] md:w-[50%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[5rem] shadow-sm">
      <h2 className="text-dark text-[24px] font-bold -mt-4 text-center mb-6">
          Please enter your credentials
        </h2>
        <form
          className="registerForm flex flex-col gap-[3rem] w-[100%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
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
                  localDispatch({ type: "setEmail", payload: e.target.value })
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
                  localDispatch({ type: "setPassword", payload: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
                placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
                focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
  <button
    type="submit"
    className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full 
    hover:bg-[#8D9F19] transition"
  >
    Login
  </button>
</div>
        </form>
        <h2 className="text-[24px] font-semibold">or</h2>
        <button className="btn flex items-center gap-[1rem] bg-white py-[1rem] px-[2rem] text-[14px] font-medium rounded-[4rem] hover:bg-light hover:border-2 hover:border-dark -mt-6">
          <span>
            <FcGoogle className="text-[2rem]" />
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
