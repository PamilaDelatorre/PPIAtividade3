import conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";

//Essa classe tem como responsabilidade gravar, alterar, excluir e consultar Eventos no banco de dados
export default class EventoDAO{

    constructor(){
        this.init(); //iniciailizar o banco de dados
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS Evento (
                     codigo INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
                     nome VARCHAR(100) NOT NULL,
                     descricao VARCHAR(300) NOT NULL,
                     dataInicio DATE NOT NULL,
                     dataFim DATE NOT NULL,
                     valorPista DECIMAL(10, 2) NOT NULL,
                     valorVip DECIMAL(10, 2) NOT NULL,
                     valorCamarote DECIMAL(10, 2) NOT NULL,
                     avaliacao DECIMAL(2, 1) DEFAULT 0.0);`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
        }
    }

    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO Evento(nome, descricao, dataInicio, dataFim, valorPista, valorVip, valorCamarote, avaliacao) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
            const parametros = [
                evento.nome,
                evento.descricao,
                evento.dataInicio,
                evento.dataFim,
                evento.valorPista,
                evento.valorVip,
                evento.valorCamarote,
                evento.avaliacao
            ];
            let resultado = await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
            return await resultado[0].insertId;
        }
    }

    async alterar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE Evento 
                         SET nome = ?, 
                             descricao = ?, 
                             dataInicio = ?, 
                             dataFim = ?, 
                             valorPista = ?, 
                             valorVip = ?, 
                             valorCamarote = ?, 
                             avaliacao = ? 
                         WHERE codigo = ?;`;
            const parametros = [
                evento.nome,
                evento.descricao,
                evento.dataInicio,
                evento.dataFim,
                evento.valorPista,
                evento.valorVip,
                evento.valorCamarote,
                evento.avaliacao,
                evento.codigo
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM Evento WHERE codigo = ?;`;
            const parametros = [
                evento.codigo
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){ //se o termo de busca existir, busca será por nome
            sql = `SELECT * FROM Evento WHERE nome = ?;`;
            parametros.push(termoBusca);
        }
        else{
            sql = `SELECT * FROM Evento order by nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaEventos = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.codigo,
                registro.nome,
                registro.descricao,
                registro.dataInicio,
                registro.dataFim,
                registro.valorPista,
                registro.valorVip,
                registro.valorCamarote,
                registro.avaliacao
            );
            listaEventos.push(evento);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaEventos;
    }
}