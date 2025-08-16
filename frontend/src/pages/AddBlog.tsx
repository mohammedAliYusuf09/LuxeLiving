import { useState } from "react";
import TipTap from "../components/TipTap";
import type { BlogInterface } from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { notifyError, notifySuccess } from "@/lib/tostCollection";


function AddBlog() {
   const editor = useEditor({
    extensions: [StarterKit, Image], // define your extension array
    content: "Write Your blog here...", // initial content
  });

  const [formData, setFromData] = useState<BlogInterface>({
    title: "",
    htmlBody: ""
  });

  const [isLoading, setLoading] = useState(false);

  const submitBlog = async () => {
      axios.defaults.withCredentials = true;
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/blog/create-blog',formData)
      return response.data;
    }
    

   const queryClient = useQueryClient();
   
    const { mutate } = useMutation({
       mutationFn: submitBlog,
       onSuccess: (responseData) => {
         // Optionally refetch or update query cache
         queryClient.invalidateQueries({ queryKey: ["blogs"] });
         setFromData({
          title: "",
          htmlBody: ""
        })
        //  notify(responseData.message);
        notifySuccess(responseData.message);
         editor.chain().focus().clearContent().run();
         setLoading(false)
       },
       onError: (error:AxiosError) => {
            notifyError(error.message || "An error occurred");
           },
    });
     
     

  const handelTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        setFromData(prev => ({
            ...prev,
            [name]: value,
        }));
  }

  const handleHtmlSave = (body: string) => {
    setFromData(pre => ({
      ...pre,
      htmlBody: body
    }))
  }


  
  
  
  return (
    <>

    <input
          type="text"
          name="title"
          placeholder="Title*"
          value={formData.title}
          onChange={handelTitleChange}
          className="w-full bg-[#262626] p-3 rounded border border-gray-700"
        />
    <TipTap handleHtmlSave={handleHtmlSave} editor={editor}/>

    
      <button
        disabled={isLoading }
        className="bg-blue-400 px-2 py-1 rounded-md cursor-pointer mt-2 hover:bg-blue-600 transition-colors ease-in-out duration-150"
        onClick={() => mutate()}
      >{
        isLoading  ? "Uploading..." : "Create Blog"
      }
      </button>
    </>
  );
}

export default AddBlog