const Joi = require('joi');
const Comment = require('../models/comment');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const commentController = {
    async create (req, res, next) {
        const commentCreateSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blog: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = commentCreateSchema.validate(req.body);
        if(error){
            return next(error);
        }

        const {content, blog, author} = req.body;

        try {
            const newComment = new Comment({
                content, blog, author
            });

            await newComment.save();
        } catch (error) {
            return next(error);
        }

        return res.status(201).json({messgae: 'comment created'});
    },
    async getById () {}
}

module.exports = commentController;