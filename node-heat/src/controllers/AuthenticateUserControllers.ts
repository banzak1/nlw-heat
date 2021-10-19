import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    async handle(request: Request, response: Response) {

        // Instanciando camada de serviço
        const service = new AuthenticateUserService();
        //service.execute();


    }
}

export { AuthenticateUserController };