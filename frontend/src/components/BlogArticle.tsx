import { Link } from "react-router-dom";
import type { postInter } from "../lib/utils";
export interface Blog {
  post: postInter;
}

function BlogArticle({ post }: Blog) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h2>
        <time
          className="text-sm text-gray-500 whitespace-nowrap ml-4"
          dateTime={new Date(post.createdAt).toISOString()}
        >
          {post.createdAt}
        </time>
      </div>

      <div className="mt-2 flex space-x-3">
        <Link to={`/blogs/details/${post._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Read →
        </Link>
        <button className="text-red-500 hover:text-gray-700 text-sm cursor-pointer">
         delete 
        </button>
      </div>
    </article>
  );
}

export default BlogArticle;
