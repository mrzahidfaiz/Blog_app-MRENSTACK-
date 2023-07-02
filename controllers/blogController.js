const Joi = require("joi");
const Blog = require("../models/blog");
const fs = require('fs');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require("../dto/blog");

const mongodbIdPattren = /^[0-9a-fA-F]{24}$/;

const blogController = {
  async create(req, res, next) {
    const blogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattren).required(),
      photo: Joi.string().required(),
    });

    const { error } = blogSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { title, content, author, photo } = req.body;

    const buffer = Buffer.from(photo.replace(/^data:image\/(png|jgp|jpeg);base64,/, ''), 'base64');

    const imagePath = `${Date.now()}_${author}.png`;

    try {
        fs.writeFileSync(`upload/${imagePath}`, buffer);
    } catch (error) {
        return next(error);
    }

    let blog;
    try {
      const newBlog = new Blog({
        title: title,
        content: content,
        author: author,
        photoPath: `${BACKEND_SERVER_PATH}/upload/${imagePath}`,
      });

      blog = await newBlog.save();
    } catch (error) {
      return next(error);
    }

    const BlogDto = new BlogDTO(blog)

    return res.status(201).json({blog: BlogDto, message: 'Successfully Created'});
  },
  
  async getAll(req, res, next) {

    let allBlogs;
    
      const blogs = await Blog.find({});
      console.log(blogs)

       allBlogs = []

      for(let i = 0; i < blogs.length; i++){
        const dto = new BlogDTO(blogs[i]);
        console.log("server", dto)
        allBlogs.push(dto)
      }
   
    return res.status(200).json({blog: allBlogs})
  },
  async getById() {},
  async update() {},
  async deleteById() {},
};

module.exports = blogController;
