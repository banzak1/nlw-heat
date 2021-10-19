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

    }

}

export { AuthenticateUserService };