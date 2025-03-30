import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/blogs`)
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Latest Blogs</h1>
        
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available.</p>
        ) : (
          <div className="space-y-6">
            {blogs.map(blog => (
              <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.content.substring(0, 150)}...</p>
                <p className="text-gray-600 mt-2">Author : @{blog.author.name}</p>
                <Link to={`/blog/${blog._id}`} className="inline-block mt-3 text-blue-600 font-semibold hover:underline">
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
