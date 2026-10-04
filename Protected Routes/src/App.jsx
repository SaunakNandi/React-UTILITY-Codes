import { Children } from "react";
import "./App.css";
import { ProtectedRoute } from "./Protected-Route";
import Dashboard from "./components/Dashboard";
import { Profile } from "./components/profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
];
function App() {
  const RouteGuard = createBrowserRouter(routes);
  return <RouterProvider router={RouteGuard} />;
}

export default App;
