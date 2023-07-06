const Joi = require('joi');
const Comment = require('../models/comment');
const CommentDTO = require('../dto/comment');

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
    async getById (req, res, next) {
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = getByIdSchema.validate(req.params);

        if(error){
            return next(error);
        }
        const { id } = req.params;

        let comments;
        try {
            comments = await Comment.findOne({_id: id}).populate('author');
        } catch (error) {
            return next(error);
        }

        const CommentsDto = [];

        for(let i = 0; i < comments.lenght; i++){
            const dto = new CommentDTO(comments[i]);
            CommentsDto.push(dto);
        }

        return res.status(200).json({data: CommentsDto});

    }
}

module.exports = commentController;