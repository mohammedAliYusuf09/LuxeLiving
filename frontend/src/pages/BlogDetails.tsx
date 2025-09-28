import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom"
import type { Blog } from "../lib/types";
import "../lib/blog.css"
import { useBlogStore } from "../store/useBlogStore";

function BlogDetails() {
    const {id} = useParams()

    const { setBlog } = useBlogStore();

   
    

    

    const getBlogDetails = async (): Promise<Blog | string> => {
        try {
          axios.defaults.withCredentials = true;
          const response = await axios.get(`http://localhost:3000/api/v1/blog/get-details/${id}`);
          setBlog(response.data.blog);
          return response.data.blog;
        } catch (error: unknown) {
          if (error instanceof Error) {
            return error.message;
          }
          return "An unknown error occurred";
        }
      };
    
      const { isPending, error, data } = useQuery({
        queryKey: ['blogDetails'],
        queryFn: getBlogDetails
      })

      if (data) {
        console.log(data);
      }

       

      if(error){
        return <h5 className="text-center mt-4 text-red">{error?.message}</h5>
      }

      if(!isPending && typeof data !== "string"){
        return (
            <div>
                <h1 className="text-3xl font-semibold mb-6">{data.title}</h1>
                <div className="html-content" dangerouslySetInnerHTML={{ __html: data.htmlBody }} />
                <div className="mt-6">
                  <Link to={`/blogs/edit/${data._id}`}
                  className="text-gray-200 bg-[#171717] mt-6 font-semibold px-2 py-1 rounded-md cursor-pointer 
                  hover:bg-gray-300 hover:text-[#121212] transition-colors ease-in-out duration-200 border-2 border-white"
                  >Edit Blog
                </Link>
                </div>
                
            </div>
        )
      }else{
        return <h2 className="text-center text-2xl mt-4 ">Loading...</h2>
      }

}      

export default BlogDetails