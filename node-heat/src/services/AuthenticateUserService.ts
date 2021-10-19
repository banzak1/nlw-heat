import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from "jsonwebtoken"


/**
 * Receber o code(string)
 * Recuperar o access.token no github
 * Recuperar infos do user no gituhb
 * Verificar se o usuário existe no banco de dados
 * ----- SIM = Gera um token
 * ----- NAO = Cria no DB, gera um token
 * Retorna o token com as infos do user
 */

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {
    // Função para receber o código da autenticação
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        // Chamada para enviar o parametros do acesso
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        // Chamada para recuperar infos do user no gituhb
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            },
        });

        // Desestruturando o conteudo do data
        const { login, id, avatar_url, name } = response.data;

        // Verificar no DB se o usuário ja existo
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        });

        // Caso o usuário não exista, é criado no DB com as informações dele
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        // Criação do token e validação
        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return { token, user };
    }

}

export { AuthenticateUserService };