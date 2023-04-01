import "./style.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

///----My imports
import Home from "./pages/home";
import Profile from "./pages/profile";
import { routesPublic } from "./config/routes";
import Layout from "./components/Layout";
import Create from "./components/Stories/Create";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Register from "./pages/register";
import Login from "./pages/login";
import { UserContext } from "./context/authContext";
import ShowStory from "./components/Stories/ShowStory";
import Messenger from "./components/Messenger";
//dsa
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(UserContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" replace />;
    return children;
  };
  const Protected = ({ children }) => {
    if (currentUser) return <Navigate to="/" />;

    return children;
  };
  const router = createBrowserRouter([
    {
      path: routesPublic.home,
      element: (
        <ProtectedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      ),
      children: [{ path: routesPublic.home, element: <Home /> }],
    },
    {
      path: routesPublic.storiesCreate,
      element: (
        <ProtectedRoute>
          <Create />
        </ProtectedRoute>
      ),
    },
    {
      path: routesPublic.profile + "/:userId",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: routesPublic.storiesShow,
      element: (
        <ProtectedRoute>
          <ShowStory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <Protected>
          <Login />{" "}
        </Protected>
      ),
    },
    {
      path: "/register",
      element: (
        <Protected>
          <Register />
        </Protected>
      ),
    },
    {
      path: routesPublic.messenger,
      element: (
        <ProtectedRoute>
          <Messenger />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div className={`App theme-${darkMode ? "dark" : "light"}`}>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
