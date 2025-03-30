import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Store userId when logging in

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Blog deleted successfully!");
      // Redirect user after deletion (optional)
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        <p className="mt-4 text-gray-600">{blog.content}</p>
        {console.log(blog.author)}
        {/* Show Edit & Delete buttons if the user is logged in and is the author */}
        {token && blog.author && blog.author === userId && (
          <div className="mt-6 flex space-x-4">
            <Link to={`/edit/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
