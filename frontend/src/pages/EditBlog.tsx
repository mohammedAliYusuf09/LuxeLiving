import { useState } from "react";
import TipTap from "../components/TipTap";
import type { BlogInterface } from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";
import { notifyError, notifySuccess } from "@/lib/tostCollection";

function EditBlog() {
  const { id } = useParams<{ id: string }>(); // Get the ID from URL params

  const { blog } = useBlogStore();
  const navigate = useNavigate();

  const [formData, setFromData] = useState<BlogInterface>({
    title: blog?.title || "",
    htmlBody: blog?.htmlBody || "",
  });


  const editor = useEditor({
    extensions: [StarterKit, Image], // define your extension array
    content: formData?.htmlBody, // initial content
  });

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
      notifySuccess(responseData.message);
      editor.chain().focus().clearContent().run();
      setLoading(false);
      navigate(-2);
    },
    onError: (error: AxiosError) => {

      notifyError(error.message || "An error occurred");
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
        className="w-full bg-[#262626] p-3 rounded border border-gray-700"
      />
      <TipTap handleHtmlSave={handleHtmlSave} editor={editor} />

      <button
        disabled={isLoading}
        className="bg-blue-400 px-2 py-1 rounded-md cursor-pointer mt-2 hover:bg-blue-600 transition-colors ease-in-out duration-150"
        onClick={() => mutate()}
      >
        {isLoading ? "Updating..." : "Update Blog"}
      </button>
    </>
  );
}

export default EditBlog;
