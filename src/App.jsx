import { useEffect, useState } from "react";
import authService from "./services/auth.services.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features/auth.slice.js";
import { Outlet } from "react-router-dom";
import { Footer, Header, LoadingPage } from "./components/index.js";
import databaseServices from "./services/db.services.js";
import {
  storeActivePosts,
  storeUserPosts,
} from "./store/features/posts.slice.js";
import { Query } from "appwrite";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if(!userData){
          dispatch(logout());
          return;
        }
        
        dispatch(login(userData));
        databaseServices
          .getPosts([Query.equal("userId", [`${userData.$id}`])])
          .then((posts) => dispatch(storeUserPosts(posts)))
          .catch((error) => console.error(error));
        databaseServices
          .getPosts()
          .then((posts) => dispatch(storeActivePosts(posts)))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Header />
      <main className="mt-32">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
