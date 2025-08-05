import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { verifyAgent } from '../middleware/auth.middleware.js';
import { addBlog, getBlogList, uploadBlogImage } from '../controller/blog.controller.js';


const blogRouter = express.Router();

blogRouter.post('/create-blog', verifyAgent, addBlog);
blogRouter.post('/upload-image', verifyAgent, upload.single('image'), uploadBlogImage);
blogRouter.get('/get-blogs', verifyAgent, getBlogList);

export default blogRouter;


