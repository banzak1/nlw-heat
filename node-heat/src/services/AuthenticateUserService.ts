import axios from 'axios';



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

        return response.data;
    }

}

export { AuthenticateUserService };