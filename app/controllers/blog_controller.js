import { LogFactory } from "../../lib/logger.js";
import Blog from "../models/blog.js";

class BlogController{

    async addBlog(req, res, next){
        const userId = req.query.user_id;
        console.log('File Config',req.file);
        if(!userId){
            return res.status(401).json({
                message: 'User not found!'
            });
        }
        let imageUrl
        if(req.file){
            imageUrl = req.file?.path;
        }
        const {
            title,
            description,
            location,
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
            return res.status(501).json(error);
        }
    }

    async getBlogs(req, res, next){
        try {
            const userId = req.query.user_id;
            if(!userId){
                return res.status(401).json({
                    message: 'User not found!'
                });
            }
            const blogs = await Blog.findAll({
                where: {
                    user_id: userId
                }
            });
            return res.status(200).json(blogs);
        } catch (error) {
            LogFactory.getLogger().error('Error while fetching blogs', error);
            return res.status(501).json(error);
        }
    }

    async getBlogById(req, res, next){
        const userId = req.query.user_id;
        if(!userId){
            return res.status(401).json({
                message: 'User not found!'
            });
        }
        const blogId = req.params.id;
        const blog = await Blog.findOne({
            where: {
                user_id: userId,
                id: blogId,
            }
        });
        if(!blog){
            return res.status(404).json({
                message: 'Blog not found'
            })
        };
        return res.status(200).json(blog);
    }

    async checkUpload(req, res, next){
        res.json(req.file);
    }
}

export default BlogController;