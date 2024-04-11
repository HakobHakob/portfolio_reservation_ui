import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}

// children => our components, which we want to send context data
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  // Wehwn we will refreash our page, we should stay logged in, not  be logged out
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
