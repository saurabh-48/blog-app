import express from 'express';
import BlogController from "../controllers/blog_controller.js";

const blogRouter = express.Router();
const blogController = new BlogController();

blogRouter.route('/').post(blogController.addBlog);

export default blogRouter;