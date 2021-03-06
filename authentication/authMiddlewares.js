const jwt = require('jsonwebtoken');
const { isPasswordValid } = require('./authServices');

const {getAdminByEmail } = require('../database/repository/admin/adminAuthRepository');
const {findByEmail}=require('../database/repository/manufacturer/manufacturerAuthRepository')
module.exports.login = async(req, res, next) => {

    const { password, type,email } = req.body;

    // Fetching userData from database
   //console.log(password,email,type)

    let userInfo;

    try{
        if (type === "manufacturer") {
            userInfo=await findByEmail(email);
            console.log("in line 19 ",userInfo);
        }
    }catch (e) {
        return res.status(500).json({
            error: e.sqlMessage
        });
    }

    try{
        //console.log("enter?")
        if (type === "admin") {
            console.log("what......",email)
            userInfo= await getAdminByEmail(email);
            console.log("in line 15 ",userInfo);
        }

    }catch (e){
        return res.status(500).json({
            error: e.sqlMessage
        });
    }
    console.log("now in ")
    console.log(userInfo)
    if (!userInfo) {
        return res.sendStatus(404);
    }

    userInfo = userInfo[0];

    const hashPass = userInfo.password;

    //  Add more info if needed
    let userId,username;
    if (type === "admin") userId = userInfo.a_id;
    if (type === "manufacturer") userId = userInfo.m_id;
    username=userInfo.username;

    if (hashPass && isPasswordValid(hashPass, password)) {
        req.body = {
            userId,
            email,
            type,
            username
        }
        next();

    } else {
        res.status(401).send({ error: 'Invalid email or password' });
    }
}

module.exports.isValidAdminJWTToken = (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const userData = jwt.decode(authorization[1], process.env.JWT_SECRET);
                if (userData.type != 'admin')
                    return res.status(403).send();
                req.body.userId = userData.userId;
                next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}



module.exports.isValidManufacturerJWTToken = (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const userData = jwt.decode(authorization[1], process.env.JWT_SECRET);
                if (userData.type != 'manufacturer')
                    return res.status(403).send();
                req.body.userId = userData.userId;
                next();
            }
        } catch (err) {
            console.log("what is error: "+err)
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}