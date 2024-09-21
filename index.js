import express from "express";
import rotaEvento from "./Rotas/rotaEvento.js";

const app = express();
const host = '0.0.0.0'; //todas as interfaces de rede
const porta = 4000;

//permite que o servidor interprete o corpo da requsição como JSON
app.use(express.json());

app.use('/eventos', rotaEvento);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
})