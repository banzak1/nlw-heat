import axios from 'axios';



/**
 * Receber o code(string)
 * Recuperar o access.token no github
 * Verificar se o usuário existe no banco de dados
 * ----- SIM = Gera um token
 * ----- NAO = Cria no DB, gera um token
 * Retorna o token com as infos do user
 */



class AuthenticateUserService {
    // Função para receber o código da autenticação
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        // Chamada para enviar o parametros do acesso
        const response = await axios.post(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        return response.data;
    }

}

export { AuthenticateUserService };