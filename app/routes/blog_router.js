import express from 'express';
import BlogController from "../controllers/blog_controller.js";
import multer from 'multer';
import verifyAccessToken from '../../middlewares/auth_middleware.js';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadSingle = multer({
    storage,
})

const blogRouter = express.Router();
const blogController = new BlogController();

blogRouter.route('/').post(uploadSingle.single('file'), blogController.addBlog);
blogRouter.route('/').get(blogController.getBlogs);
blogRouter.route('/:id').get(blogController.getBlogById);


export default blogRouter;