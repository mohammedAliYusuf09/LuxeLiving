import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import type { Blog } from "../lib/utils";
import "../lib/blog.css"

function BlogDetails() {
    const {id} = useParams()

    const getBlogDetails = async (): Promise<Blog | string> => {
        try {
          axios.defaults.withCredentials = true;
          const response = await axios.get(`http://localhost:3000/api/v1/blog/get-details/${id}`);
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

      if(error){
        return <h5 className="text-center mt-4 text-red">{error?.message}</h5>
      }

      if(!isPending && typeof data !== "string"){
        return (
            <div>
                <h1 className="text-3xl font-semibold mb-6">{data.title}</h1>
                <div className="html-content" dangerouslySetInnerHTML={{ __html: data.htmlBody }} />
            </div>
        )
      }else{
        return <h2 className="text-center text-2xl mt-4 ">Loading...</h2>
      }

}      

export default BlogDetails