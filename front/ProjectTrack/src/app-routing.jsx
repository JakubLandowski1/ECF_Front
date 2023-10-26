import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Form from "./components/Form";
import Details from "./components/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    }, 
    {
        path: "/Form",
        element: <Form />,

    },
    {
        path: "/details",
        element: <Details/>,

    }
]
)

    export default router