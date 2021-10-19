import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserControllers';


const router = Router();

router.post("/authenticade", new AuthenticateUserController().handle)

export { router };