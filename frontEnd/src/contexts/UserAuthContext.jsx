import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const UserAuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...initialState };
    case "addQuestionnare":
      return {
        ...state,
        user: { ...state.user, questionnaire: action.payload },
      };
    default:
      return state;
  }
}

function UserAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function handleLogin(email, password) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userLoggedIn = res.data.user;
      console.log(userLoggedIn);
      dispatch({ type: "login", payload: userLoggedIn });
    } catch (error) {
      alert("🛑EMAIL OR PASSWORD IS INCORRECT🛑");
    }
  }
  
  function handleLogout() {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        dispatch({ type: "logout" });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        alert("Failed to log out. Please try again.");
      });
  }
  useEffect(() => {
    if (user?.userId) {
      (async function updateUser() {
        try {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}`,
            user
          );
        } catch (error) {
          console.error("Failed to update user:", error);
        }
      })();
    }
  }, [user]);

  async function addQuestionnaireToUser(newQuestionnaire) {
    dispatch({ type: "addQuestionnare", payload: newQuestionnaire });

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}`,
        { questionnaire: newQuestionnaire }
      );
    } catch (error) {
      console.error("Failed to add questionnaire:", error);
    }
  }

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        handleLogout,
        dispatch,
        addQuestionnaireToUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined)
    throw new Error("the provider has been used outside of the context");
  return context;
}

export { UserAuthProvider, useUserAuth };
