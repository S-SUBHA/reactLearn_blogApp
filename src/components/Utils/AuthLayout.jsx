/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../index.js";

export default function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) navigate("/login");
    else if (!authentication && authStatus) navigate("/");
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <LoadingPage /> : <div>{children}</div>;
}
