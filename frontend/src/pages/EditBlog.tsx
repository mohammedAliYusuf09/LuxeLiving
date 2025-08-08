import { useState } from "react";
import TipTap from "../components/TipTap";
import type { BlogInterface } from "../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";

function EditBlog() {
  const { id } = useParams<{ id: string }>(); // Get the ID from URL params

  // const getBlogDetails = async (): Promise<Blog> => {
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const response = await axios.get(
  //       `http://localhost:3000/api/v1/blog/get-details/${id}`
  //     );
  //     console.log("API Response:", response);
  //     return response.data.blog;
  //   } catch (error) {
  //     console.error("Error fetching blog details:", error);
  //     throw error; // Important to re-throw for React Query to catch
  //   }
  // };

  // const { error, data } = useQuery({
  //   queryKey: ["blogUpdate", id],
  //   queryFn: getBlogDetails,
  // });

  const { blog } = useBlogStore();
  const navigate = useNavigate();

  const [formData, setFromData] = useState<BlogInterface>({
    title: blog?.title || "",
    htmlBody: blog?.htmlBody || "",
  });

  console.log("formData", formData);

  const editor = useEditor({
    extensions: [StarterKit, Image], // define your extension array
    content: formData?.htmlBody, // initial content
  });

  const notify = (message: string) => toast(message);

  const [isLoading, setLoading] = useState(false);

  const updateBlog = async () => {
    axios.defaults.withCredentials = true;
    setLoading(true);
    const response = await axios.put(
      `http://localhost:3000/api/v1/blog/update/${id}`,
      formData
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateBlog,
    onSuccess: (responseData) => {
      // Optionally refetch or update query cache
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setFromData({
        title: "",
        htmlBody: "",
      });
      notify(responseData.message);
      editor.chain().focus().clearContent().run();
      setLoading(false);
      navigate("/blogs");
    },
    onError: (error: AxiosError) => {
      console.log("Blog could not be Updated");
      notify(error.message || "An error occurred");
    },
  });

  const handelTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHtmlSave = (body: string) => {
    console.log(body);
    console.log("hello");
    setFromData((pre) => ({
      ...pre,
      htmlBody: body,
    }));
  };

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
      <TipTap handleHtmlSave={handleHtmlSave} editor={editor} />

      <button
        disabled={isLoading}
        className="bg-blue-400 px-2 py-1 rounded-md cursor-pointer mt-2 hover:bg-blue-600 transition-colors ease-in-out duration-150"
        onClick={() => mutate()}
      >
        {isLoading ? "Updating..." : "Update Blog"}
      </button>

      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default EditBlog;
