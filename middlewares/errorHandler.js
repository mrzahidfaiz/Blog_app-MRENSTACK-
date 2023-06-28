const errorHandler = (error, req, res, next) => {
    
    let status = 500;
    let data = {
        message: 'Internal Server Error'
    }

    if(error.status){
        status = error.status;
    }
    if(error.message){
        data.message = error.message;
    }

    res.status(status).json(data);
}

module.exports = errorHandler;