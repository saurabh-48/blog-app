import { LogFactory } from "../../lib/logger.js";
import Blog from "../models/blog.js";

class BlogController{

    async addBlog(req, res, next){
        const userId = req.query.user_id;
        if(!userId){
            return res.status(401).json({
                message: 'User not found!'
            });
        }
        const {
            title,
            description,
            location,
            image_url: imageUrl,
        } = req.body;

        try {
            const blog = await Blog.create({
                title,
                description,
                location,
                image_url: imageUrl,
                user_id: userId
            });

            return res.status(201).json({
                message: "Success",
                blog_id: blog.id,
            })
        } catch (error) {
            LogFactory.getLogger().error('Error while creating blog', error);
        }
        
    }
}

export default BlogController;