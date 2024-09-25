import { useEffect, useState } from "react";
import authService from "./services/auth.services.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features/auth.slice.js";
import { Outlet } from "react-router-dom";
import { Footer, Header, LoadingPage } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => dispatch(userData ? login(userData) : logout()))
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
