import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import EditBlog from "./pages/EditBlog";
import UserProtectWrapper from "./pages/UserProtectWrapper";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<UserProtectWrapper><CreateBlog /></UserProtectWrapper>} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/edit/:id" element={<UserProtectWrapper><EditBlog /></UserProtectWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
