import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BlogArticle from "../components/BlogArticle";
import type { postInter } from "../lib/utils";



function Blogs() {

  const getBlogs = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `http://localhost:3000/api/v1/blog/get-blogs`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

  const { data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });
  


  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 mt-3 ">
          <h5 className="text-white font-semibold">Propertyes</h5>
        </div>
        <Link
          className="text-gray-800 font-semibold bg-white px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors ease-in-out duration-200"
          to={"/blogs/add-blog"}
        >
          Add Blog
        </Link>
      </div>

      {error &&  <h5 className="text-center text-2xl pt-2 text-red-400">{error?.message}</h5>}
     

      {
        data?.coount == 0  || !data
        ? 
        <h2 className="text-center text-2xl pt-6">No Blog Found</h2>  
        :
        <div className="space-y-4 mt-4">
        {data?.blogList.map((post : postInter) => (
          <BlogArticle key={post._id} post={post}/>
        ))}
      </div>
      }
    </>
  );
}

export default Blogs;
