import { UserService } from "../services/user-services.js";

export class UserController {
    static async login(req, res, next) {
        try {
            const data = req.body;
            const user = await UserService.login(data);

            res.status(200).json({ accessToken: user });
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const data = req.body;
            const user = await UserService.register(data);

            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
}