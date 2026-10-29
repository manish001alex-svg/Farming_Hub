import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const App = () => {

  const { handleMe } = useAuth();

  const user = useSelector(state => state.auth.user)
  console.log("User: ", user);

  useEffect(() => {
    handleMe();
  }, [])

  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer style={{
        top: "70px",
        right: "20px",
      }} />
    </div>
  );
};

export default App;