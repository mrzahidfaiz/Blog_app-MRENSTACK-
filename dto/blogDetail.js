class BlogDetailDTO{
    constructor(blog){
        this._id = blog._id;
        this.content = blog.content;
        this.description = blog.description;
        this.category =blog.category;
        this.title = blog.title;
        this.photo = blog.photoPath;
        this.createdAt = blog.createdAt;
        this.authorName = blog.author.name;
        this.authorUsername = blog.author.username;
    }
}

module.exports = BlogDetailDTO;