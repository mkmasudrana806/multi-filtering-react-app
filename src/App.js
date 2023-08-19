import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./components/router/Routes";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
