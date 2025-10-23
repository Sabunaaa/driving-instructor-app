"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: string;
  status: "published" | "draft";
  views: number;
  createdAt: string;
}

const BlogTable: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      title: "10 Tips for New Drivers",
      author: "John Smith",
      category: "Driving Tips",
      status: "published",
      views: 1245,
      createdAt: "2024-10-15",
    },
    {
      id: 2,
      title: "Road Safety Guide",
      author: "Sarah Johnson",
      category: "Safety",
      status: "published",
      views: 892,
      createdAt: "2024-10-10",
    },
    {
      id: 3,
      title: "Common Driving Mistakes",
      author: "Michael Brown",
      category: "Driving Tips",
      status: "draft",
      views: 0,
      createdAt: "2024-10-18",
    },
    {
      id: 4,
      title: "Winter Driving Essentials",
      author: "Emily Davis",
      category: "Seasonal",
      status: "published",
      views: 567,
      createdAt: "2024-10-05",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    category: "",
  });

  const handleAddBlog = () => {
    if (newBlog.title && newBlog.author && newBlog.category) {
      const blog: BlogPost = {
        id: Math.max(...blogs.map((b) => b.id), 0) + 1,
        title: newBlog.title,
        author: newBlog.author,
        category: newBlog.category,
        status: "draft",
        views: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setBlogs([...blogs, blog]);
      setNewBlog({ title: "", author: "", category: "" });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      published: "bg-green-50 text-green-700 border border-green-200",
      draft: "bg-gray-50 text-gray-700 border border-gray-200",
    };
    return badgeClasses[status as keyof typeof badgeClasses] || "";
  };

  return (
    <div>
      {/* Add Blog Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {/* Add Blog Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Blog Post</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBlog}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No blog posts yet. Click "Add New Blog" to create one.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          blog.status
                        )}`}
                      >
                        <span className="capitalize">{blog.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-gray-500" />
                        {blog.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogTable;
