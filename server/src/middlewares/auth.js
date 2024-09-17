import { Jwt } from '../libs/jwt.js';
import { prisma } from '../config/db.js';


const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) throw { status: 403, message: 'header authorization required' }

        const token = header.split(' ')[1];

        if (!token) {
            throw { status: 402, message: 'token required' }
        }

        const decodedToken = Jwt.verifyToken(token);

        if (!decodedToken) {
            throw { status: 402, message: 'token required' }
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        });

        if (!existingUser) {
            throw { status: 404, message: 'user not found' }
        }

        req.user = {
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email
        }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    auth
}
