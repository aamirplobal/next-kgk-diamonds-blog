"use client"; // Ensure this component is treated as a client-side component

import { Trash2 } from "lucide-react";

const DeletePost = ({ id }: { id: number }) => {
  const handleDelete = async (id: number) => {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error("Backend URL is not defined.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogPosts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Post ${id} deleted successfully`);
        window.location.href = "/"; // Redirect to home page using window.location
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="text-red-500 hover:text-red-700 transition-colors"
      aria-label="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
};

export default DeletePost;
