import { Link } from "react-router-dom";
import type { postInter } from "../lib/types";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export interface Blog {
  post: postInter;
}

function BlogArticle({ post }: Blog) {
  const notify = (message: string) => toast(message);

  const date = new Date(post.createdAt);
 
// Example: "8/8/2025" (in a US locale)
const readableDateTime = date.toLocaleString();

  const deleteBlog = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `http://localhost:3000/api/v1/blog/delete/${post._id}`
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (responseData) => {
      // responseData is passed directly to onSuccess
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify(responseData.message);
    },
    onError: (error:AxiosError) => {
      notify(error.message || "An error occurred");
    },
  });

  return (
    <article className="p-6 bg-[#171717] rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <h2 className="text-xl font-semibold text-white line-clamp-2">
          {post.title}
        </h2>
        <time
          className="text-sm text-gray-500 whitespace-nowrap sm:ml-4"
          dateTime={new Date(post.createdAt).toISOString()}
        >
          {readableDateTime}
        </time>
      </div>

      <div className="mt-2 flex space-x-3">
        <Link
          to={`/blogs/details/${post._id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read →
        </Link>
        <button
          className="text-red-500 hover:text-gray-700 text-sm cursor-pointer"
          onClick={() => mutate()}
        >
          delete
        </button>
      </div>
    </article>
  );
}

export default BlogArticle;
