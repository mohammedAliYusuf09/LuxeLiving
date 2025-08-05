import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Blog } from "../model/blog.model.js";



const uploadBlogImage = async (req, res) => {
    console.log(req);
    const { email } = req.agent;
    const  image  = req.file;

    console.log("Image", image);
    

    if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!image) {
        return res.status(401).json({ success: false, message: "Image file is required" });
    }
    const imagePath = image.path;
    try {
    // upload on cloudnary
    const {url} = await uploadOnCloudinary(imagePath);
    // return respons
        return res
        .status(200)
        .json({ success: true, message: "Image uploaded on cloudinary successfully", url});
    
    } catch (error) {
    console.error("Error uploading image", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }

}

const addBlog = async (req, res) => {
    const { email } = req.agent;
    
    if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {title, htmlBody} = req.body;

    if(!title || !htmlBody){
        return res.status(401).json({ success: false, message: "Title and Blog-body are required"})
    }
    const newBlog = {
        title,
        htmlBody
    }

    try {
        // add new blog
        const blog = await Blog.create(newBlog)
    
        return res
        .status(201)
        .json({
        success: true,
        message: "Blog added successfully",
        blog,
        });
    } catch (error) {
        return res
        .status(400)
        .json({ success: false, message: "Internal server error while creating blog" });
    }

}

const getBlogList = async (req, res) => {
    try {
        const { email } = req.agent;
        if (!email) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const blogList = await Blog.find().select("-htmlBody");
        if(!blogList){
            return res.status(401).json({success: true,message: "Blog List dose not exist"})
        }
        return res.status(200).json({
            success: true,
            count: blogList.length,
            blogList
        });
    } catch (error) {
        console.error("Error fetching blog list:", error);
        return res.status(500).json({ success: false, message: "Server Error while fetching bloglist"});
    }
}

export {
    uploadBlogImage,
    addBlog,
    getBlogList
}