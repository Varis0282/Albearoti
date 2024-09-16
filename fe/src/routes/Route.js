import { createBrowserRouter } from "react-router-dom";
import { Blog, BlogPage, Home, Login, Signup } from "../pages";
import PrivateRoute from "./PrivateRoute";
import NewBlog from "../pages/blogNew/BlogNew";


const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoute component={<Home />} />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/blog/:id",
        element: <Blog />,
    },
    {
        path: "/blog/update/:id",
        element: <BlogPage />,
    },
    {
        path: "/blog/new",
        element: <NewBlog />,
    },
]);

export default routes;