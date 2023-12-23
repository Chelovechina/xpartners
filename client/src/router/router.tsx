import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import { NotFound } from "../pages/NotFound/NotFound";
import { Home } from "../pages/Home/Home";
import { PrivateRoute } from "../utils/PrivateRoute";
import { Registration } from "../pages/Registration/Registration";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  { path: "*", element: <NotFound /> },
]);
