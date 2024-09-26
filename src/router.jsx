import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {
  AllPostPage,
  CreatePostPage,
  EditPostPage,
  HomePage,
  LoginPage,
  PostPage,
  SignupPage,
  UserPostPages,
} from "./pages/index.js";
import { AuthLayout } from "./components/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout>
            <AllPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/create-post",
        element: (
          <AuthLayout>
            <CreatePostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <AuthLayout>
            <EditPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/posts/:postId",
        element: (
          <AuthLayout>
            <PostPage />
          </AuthLayout>
        ),
      },
      {
        path: "my-posts",
        element: (
          <AuthLayout>
            <UserPostPages />
          </AuthLayout>
        ),
      },
    ],
    errorElement: <LoginPage />,
  },
]);
