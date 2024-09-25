/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth.slice.js";
import authService from "../../services/auth.services.js";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .then(() => navigate("/login"))
      .catch((error) => console.log(error));
  };

  return (
    <button onClick={() => logoutHandler()} className={`${className}`}>
      Logout
    </button>
  );
}

export default LogoutBtn;
