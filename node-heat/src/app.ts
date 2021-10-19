import "dotenv/config";
import express from 'express';
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";

import { router } from './routes'

// Constante para iniciar chamadas do express
const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connect", socket => {
    console.log(`Connected" ${socket.id}`);
})

// Função para receber função do tipo json
app.use(express.json());


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

export { serverHttp, io };

