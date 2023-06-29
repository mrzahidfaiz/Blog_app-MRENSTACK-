const auth = (req, res, next) =>{

    const {accessToken, refreshToken} = req.cookies

    if(!accessToken || !refreshToken){
        const error = {
            status: 401,
            message: 'Unauthorized'
        }
        return next(error);
    }

    next();
}

module.exports = auth;