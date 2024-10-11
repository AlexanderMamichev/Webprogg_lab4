import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import inventoryLoader from "./inventoryLoader.mjs";


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        path: "view-order", 
        Component: ViewOrder,
      },
      {},
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>
      },
      {
        path: '/*',     //fångar alla invalid rout.
        element: <p> 404 Not Found </p>
      },
    ]
  },
]);
export default router;