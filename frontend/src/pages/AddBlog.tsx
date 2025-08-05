import { useState } from "react";
import TipTap from "../components/TipTap";
import type { BlogInterface } from "../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";


function AddBlog() {
   const editor = useEditor({
    extensions: [StarterKit, Image], // define your extension array
    content: "Write Your blog here...", // initial content
  });

  const [formData, setFromData] = useState<BlogInterface>({
    title: "",
    htmlBody: ""
  });

  const notify = (message: string) => toast(message);

  const [isLoading, setLoading] = useState(false);

  const submitBlog = async () => {
      axios.defaults.withCredentials = true;
      setLoading(true);
      await axios.post('http://localhost:3000/api/v1/blog/create-blog',formData)
    }
    

   const queryClient = useQueryClient();
   
    const { mutate  } = useMutation({
       mutationFn: submitBlog,
       onSuccess: () => {
         // Optionally refetch or update query cache
         queryClient.invalidateQueries({ queryKey: ["blogs"] });
         setFromData({
          title: "",
          htmlBody: ""
        })
         notify("Blog Is successfully added");
         editor.chain().focus().clearContent().run();
         setLoading(false)
        
       },
       onError: () => {
         console.log("Blog could not be added");
         notify("Blog could not be added");
         setLoading(false)
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
    console.log(body);
    console.log('hello');
    
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
          className="w-full bg-gray-800 p-3 rounded border border-gray-700"
        />
    <TipTap handleHtmlSave={handleHtmlSave} editor={editor}/>

    
      <button
        disabled={isLoading }
        className="bg-blue-400 px-2 py-1 rounded-md cursor-pointer mt-2 hover:bg-blue-600 transition-colors ease-in-out duration-150"
        onClick={() => mutate()}
      >{
        isLoading  ? "Uploading..." : "Upload Blog"
      }
      </button>

      <ToastContainer 
        position= "bottom-right"
        theme="dark"
        />
    </>
  );
}

export default AddBlog