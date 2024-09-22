import { UserRepositories } from "../repositories/user-repositories.js";
import { Bcrypt } from '../libs/bcrypt.js'
import { Jwt } from "../libs/jwt.js";

export class UserService {
    static async login(params) {
        const user = await UserRepositories.login(params);

        if (!user) {
            throw { status: 402, message: 'invalid credentials' }
        }

        const comparePassword = await Bcrypt.comparePassword(params.password, user.password);

        if (!comparePassword) {
            throw { status: 402, message: 'invalid credentials' }
        }

        const token = Jwt.generateToken({
            id: user.id,
            email: user.email,
            name: user.name
        });

        return token;
    }

    static async register(params) {
        const existingUser = await UserRepositories.login(params);

        if (existingUser) {
            throw { status: 400, message: 'email already exist' }
        }

        const user = await UserRepositories.register(params);

        if (!user) {
            throw { status: 400, message: 'failed to register new user' }
        }

        return user;
    }
}