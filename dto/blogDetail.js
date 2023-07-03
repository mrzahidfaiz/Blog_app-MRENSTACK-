class BlogDetailDTO {
    constructor(blog){
        this._id = blog._id;
        this.title = blog.title;
        this.description = blog.description;
        this.content = blog.content;
        this.photoPath = blog.photoPath;
        this.authorusername = blog.author.username;
        this.authorname = blog.author.name;
    }
};

module.exports = BlogDetailDTO;