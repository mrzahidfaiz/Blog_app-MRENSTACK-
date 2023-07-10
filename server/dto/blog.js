class BlogDTO{
    constructor(blog){
        this._id = blog._id;
        this.title = blog.title;
        this.description = blog.description;
        this.category = blog.category;
        this.content = blog.content;
        this.photoPath = blog.photoPath;
        this.author = blog.author;
    }
}

module.exports = BlogDTO;