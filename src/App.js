import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AddJob from "./components/jobs/addJob";
// import ErrorPage from "./components/errorPage"

import Header from "./components/header";
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/addJob",
      element: <AddJob />,
    },
    // {
    //   path: "*",
    //   element: <ErrorPage />,
    // }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
