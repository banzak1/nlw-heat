import "dotenv/config";
import express from 'express';

import { router } from './routes'

// Constante para iniciar chamadas do express
const app = express();

// Função para receber as rotas
app.use(router);

// Chamada get, para pode acessar a autenticação do github, utilizando o ID já salvo no arquivo .env
app.get("/github", (request, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

//Chamada para solicitar o codigo do usuário autenticado na aplicação.
app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);

});

// Execuetando servidor na rota 4000
app.listen(4000, () => console.log('Listening on port 4000'));
