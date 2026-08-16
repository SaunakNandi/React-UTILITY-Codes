import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

type initialStateType = {
  count: number;
  username: string;
};

const initialState: initialStateType = {
  count: 0,
  username: "",
};

type Action =
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_USERNAME"; payload: string };

function AppReducer(state: initialStateType, action: Action) {
  switch (action.type) {
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    default:
      return state;
  }
}

const StateContext = createContext<initialStateType | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("useAppState must be within AppProvider");
  return context;
};

export const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) throw new Error("useAppState must be within AppProvider");
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </StateContext.Provider>
  );
};
