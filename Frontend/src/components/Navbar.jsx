import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-primary p-4 flex justify-between">
      <Link to="/" className="text-xl font-heading">Blog App</Link>
      <div>
        {!token && <Link to="/login" className="mr-4">Login</Link>}
        {!token && <Link to="/signup" className="mr-4">Signup</Link>}
        {token && <Link to="/create" className="btn-secondary mr-4">New Blog</Link>}
        {token && (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
