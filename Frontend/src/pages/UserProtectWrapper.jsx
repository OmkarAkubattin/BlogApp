import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if token is missing
    if (!token) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export default UserProtectWrapper;
