const jwt = require('jsonwebtoken')

module.exports.getAccessToken = async (req, res) => {
    const data = req.body;
    //console.log(data)
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res
        .json({
            access_token: token,
            userId:data.userId,
            email:data.email,
            type:data.type,
            username:data.username
        })
        .status(200);
}