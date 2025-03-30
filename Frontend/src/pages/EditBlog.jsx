import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => console.error("Error fetching blog:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Blog updated successfully");
      navigate(`/`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleUpdate}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-4 border rounded" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 mb-4 border rounded"></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Blog</button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
