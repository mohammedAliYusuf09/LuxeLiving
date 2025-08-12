import "../extrastyle/tiptap.css"
import {  EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Editor } from '@tiptap/core';
import { MdFormatBold } from "react-icons/md";
import { HiItalic } from "react-icons/hi2";
import { MdOutlineFormatStrikethrough } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { TbClearFormatting } from "react-icons/tb";
import { RiFormatClear } from "react-icons/ri";
import { BsParagraph } from "react-icons/bs";
import { HiMiniH1 } from "react-icons/hi2";
import { HiMiniH2 } from "react-icons/hi2";
import { HiMiniH3 } from "react-icons/hi2";
import { RiH4 } from "react-icons/ri";
import { RiH5 } from "react-icons/ri";
import { RiH6 } from "react-icons/ri";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { BiCodeBlock } from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { MdHorizontalRule } from "react-icons/md";
import { BsFileBreak } from "react-icons/bs";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import axios from "axios";

interface TipTapProp {
  handleHtmlSave: ( body: string) => void,
  editor: Editor
}



function TipTap({ handleHtmlSave, editor }: TipTapProp) {
  

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const handleImageUploadAndSetOnEditer = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blog/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response?.data.url) {
        if (!editor) {
          console.warn("Editor not initialized.");
          return;
        }

        editor.chain().focus().setImage({ src: response.data.url }).run();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const passhtmlContent = () => {
    if(editor){
      const htmlContent = editor.getHTML();
      console.log(htmlContent);
      handleHtmlSave(htmlContent)
    }
  }



  return (
    <div className="bg-white">
      <div className="button-group py-2 flex items-center justify-center gap-1 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : "btnTop"}
        >
          <MdFormatBold/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : "btnTop"}
        >
          <HiItalic/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : "btnTop"}
        >
          <MdOutlineFormatStrikethrough/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : "btnTop"}
        >
          <FaCode />
        </button>
        <button
          className={editorState.isHeading1 ? "is-active" : "btnTop"}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <TbClearFormatting/>
        </button>
        <button
          className={editorState.isHeading1 ? "is-active" : "btnTop"}
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <RiFormatClear/>
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : "btnTop"}
        >
          <BsParagraph/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : "btnTop"}
        >
          <HiMiniH1/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : "btnTop"}
        >
          <HiMiniH2/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : "btnTop"}
        >
         <HiMiniH3/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : "btnTop"}
        >
          <RiH4/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : "btnTop"}
        >
          <RiH5/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : "btnTop"}
        >
          <RiH6/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : "btnTop"}
        >
          <MdFormatListBulleted/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : "btnTop"}
        >
          <GoListOrdered/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : "btnTop"}
        >
          <BiCodeBlock/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : "btnTop"}
        >
          <GrBlockQuote/>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={editorState.isOrderedList ? "is-active" : "btnTop"}
        >
          <MdHorizontalRule/>
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={editorState.isOrderedList ? "is-active" : "btnTop"}
        >
          <BsFileBreak/>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className={editorState.isOrderedList ? "is-active" : "btnTop"}
        >
          <FaUndoAlt/>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className={editorState.isOrderedList ? "is-active" : "btnTop"}
        >
          <FaRedoAlt/>
        </button>
        <label htmlFor="imageToUpload" className="cursor-pointer btnTop flex items-center gap-2">
          <FaRegImage className="text-xl" />
          <input
            id="imageToUpload"
            type="file"
            name="imageToUpload"
            accept="image/*"
            onChange={handleImageUploadAndSetOnEditer}
            className="hidden"
          />
        </label>  
       

       
      </div>

      <BubbleMenu editor={editor}>
        <div className="bg-white flex gap-2 py-1 px-1 border-[1px] border-stone-300 rounded-md">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            // className={editorState.isBold ? "is-active" : "btn"}
            className={editorState.isBold ? "btn-active" : "btn"}
          >
            <MdFormatBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={editorState.isItalic ? "btn-active" : "btn"}
          >
            <HiItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editorState.canStrike}
            className={editorState.isStrike ? "btn-active" : "btn"}
          >
            <MdOutlineFormatStrikethrough />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editorState.isHeading1 ? "btn-active" : "btn"}
          >
            <HiMiniH1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editorState.isHeading2 ? "btn-active" : "btn"}
          >
            <HiMiniH2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editorState.isHeading3 ? "btn-active" : "btn"}
          >
            <HiMiniH3 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editorState.isBulletList ? "btn-active" : "btn"}
          >
            <MdFormatListBulleted />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editorState.isOrderedList ? "btn-active" : "btn"}
          >
            <GoListOrdered />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editorState.isCodeBlock ? "btn-active" : "btn"}
          >
            <BiCodeBlock />
          </button>
        </div>
      </BubbleMenu>

      <EditorContent className="tiptap overflow-auto" editor={editor} />

      <div className="flex justify-end">
        <button
          className="flex gap-2 items-center my-2 mr-2 bg-[#262626] rounded-sm cursor-pointer px-2 py-1 text-white hover:bg-[#161414]"
          onClick={passhtmlContent}
        >
          <MdDownloadDone />
          Done
        </button>
      </div>        
       
    </div>
  );
}

export default TipTap;

// onClick={() => {
//           if (editor) {
//             console.log(editor.getHTML());
//           }
//         }}
