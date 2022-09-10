import jwt from 'jsonwebtoken';
const secrect = 'test';

const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.spilt(" ");
        const isCustomAuth = token.length < 500;
        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, secrect);
            req.userId = decodeData?.sub;
        }
        next();

    }
    catch (error) {
        console.log(error);
    }

}
export default auth;
