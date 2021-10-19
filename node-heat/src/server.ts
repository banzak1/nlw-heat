import { serverHttp } from "./app";




// Execuetando servidor na rota 4000
serverHttp.listen(4000, () =>
    console.log('Listening on port 4000')
);