import { prisma } from '../config/db.js'
import { Bcrypt } from '../libs/bcrypt.js';
export class UserRepositories {

    static async login(params) {
        const user = await prisma.user.findFirst({
            where: {
                email: params.email
            }
        });

        return user;
    }

    static async register(params) {
        const { name, email, password } = params;
        const hashPassword = await Bcrypt.hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        });

        return user;
    }
}