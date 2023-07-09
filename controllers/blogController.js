const Joi = require("joi");
const Blog = require("../models/blog");
const fs = require("fs");
const { BACKEND_SERVER_PATH, CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require("../config/index");
const BlogDTO = require("../dto/blog");
const BlogDetailDTO = require("../dto/blogDetail");
const Comment = require("../models/comment");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

const mongodbIdPattren = /^[0-9a-fA-F]{24}$/;

const blogController = {
  async create(req, res, next) {
    const blogSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattren).required(),
      photo: Joi.string().required(),
      category: Joi.string().required()
    });

    const { error } = blogSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { title, content, author, photo, description, category } = req.body;

    // const buffer = Buffer.from(
    //   photo.replace(/^data:image\/(png|jgp|jpeg);base64,/, ""),
    //   "base64"
    // );

    // const imagePath = `${Date.now()}_${author}.png`;

    let photoPath;
    try {
       const response = await cloudinary.uploader.upload(photo, {
        folder: 'blogs'
       })

        photoPath = {
        public_id: response.public_id,
        secure_url: response.secure_url
       }

      // console.log("Result",photoPath)
      // fs.writeFileSync(`upload/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }


    let blog;
    try {
      const newBlog = new Blog({
        title: title,
        description: description,
        content: content,
        author: author,
        category, category,
        photoPath: photoPath,
      });

      blog = await newBlog.save();
    } catch (error) {
      return next(error);
    }

    const BlogDto = new BlogDTO(blog);

    return res
      .status(201)
      .json({ blog: BlogDto, message: "Successfully Created" });
  },

  async getAll(req, res, next) {
    let allBlogs;

    const blogs = await Blog.find({});

    allBlogs = [];

    for (let i = 0; i < blogs.length; i++) {
      const dto = new BlogDTO(blogs[i]);
      allBlogs.push(dto);
    }
    // for (let i = 0; i < blogs.length; i++) {
    //   const dto =blogs[i];
    //   allBlogs.push(dto);
    // }

    return res.status(200).json({ blog: allBlogs });
  },
  async getById(req, res, next) {
    const getbyIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattren).required(),
    });

    const { error } = getbyIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let blog;
    try {
      blog = await Blog.findOne({ _id: id }).populate('author');
    } catch (error) {
      return next(error);
    }

    const BlogDetailDto = new BlogDetailDTO(blog);

    return res.status(200).json({ blog: BlogDetailDto });
  },
  async update(req, res, next) {
    const updateBlogSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattren).required(),
      blogId: Joi.string().regex(mongodbIdPattren).required(),
      photo: Joi.string(),
      category: Joi.string().required()
    });

    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { title, description, content, author, photo, blogId, category } = req.body;

    let blog;
    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return next(error);
    }

    // console.log(blog.photoPath[0].public_id);

    const oldPhoto = blog.photoPath[0].public_id;

    try {
      await cloudinary.uploader.destroy(oldPhoto);
    } catch (error) {
      return next(error);
    }

    if (photo) {
      // let previousPhoto = blog.photoPath;
      // previousPhoto = previousPhoto.split("/").at(-1);

      // delete
      // fs.unlinkSync(`upload/${previousPhoto}`);
      // Buffer from client
      // const buffer = Buffer.from(
      //   photo.replace(/^data:image\/(png|jgp|jpeg);base64,/, ""),
      //   "base64"
      // );
      // // allot a random name
      // const imagePath = `${Date.now()}_${author}.png`;
      // // store locally in storage folder
      let photoPath;
      try {
        const response = await cloudinary.uploader.upload(photo, {
          folder: 'blogs'
        })

         photoPath = {
          public_id: response.public_id,
          secure_url: response.secure_url
        }
        // fs.writeFileSync(`upload/${imagePath}`, buffer);
      } catch (error) {
        return next(error);
      }
      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          description,
          content,
          category,
          photoPath: photoPath,
        }
      );
    } else {
      await Blog.updateOne({ _id: blogId }, { title, content, description, category });
    }

    res.status(200).json({ message: "Update Successfuly" });
  },
  async deleteById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattren).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let blog;
    try {
      blog = await Blog.findOne({_id: id})
    } catch (error) {
      return next(error)
    }

    const oldPhoto = blog.photoPath[0].public_id;
     

    try {

      await cloudinary.uploader.destroy(oldPhoto);

      await Blog.deleteOne({ _id: id });

      await Comment.deleteMany({blog: id});
    } catch (error) {
      return next(error);
    }

    res.status(200).json({ message: "Delete Successfully" });
  },
};

module.exports = blogController;
