class CommentDTO {
    constructor(comment){
        this._id = comment._id;
        this.content = comment.content;
        this.createdAt = comment.createdAt;
        this.auhtorUsername = comment.author.username
    }
};

module.exports = CommentDTO;