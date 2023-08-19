const { createBrowserRouter } = require("react-router-dom");
const { default: AllMonitor } = require("../monitor/AllMonitor");

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllMonitor></AllMonitor>,
    // loader: () => fetch("https://star-tech-server.vercel.app/monitor"),
  },
]);

export default router;
