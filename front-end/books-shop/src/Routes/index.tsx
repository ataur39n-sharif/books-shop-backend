import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SigninPage } from "../Pages/Signin";
import { SignupPage } from "../Pages/Signup";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
    },
    {
        path:'/signin',
        element:<SigninPage/>
    },
    {
        path:'signup',
        element:<SignupPage/>
    }
])

export default router