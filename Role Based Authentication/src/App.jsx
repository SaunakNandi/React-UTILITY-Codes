import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./auth-context";
import ProtectedRoutes from "./Protected-Routes";
import Invoice from "./Invoice";
function App() {
  return (
    <AuthContext>
      <Routes>
        <Route
          path="/invoice"
          element={
            <ProtectedRoutes permission={"invoice:view"}>
              <Invoice />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthContext>
  );
}

export default App;
