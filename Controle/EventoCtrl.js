import Evento from "../Modelo/Evento.js";

export default class EventoCtrl{
    //os métodos abaixo serão chamados a partir de requisições vindas da Internet
    //os métodos deverão ser capazes de manipular requisições HTTP e produzir respostas HTTP

    //reponsável por processar requisições HTTP do tipo POST
    gravar(req, resp){
        //recebemos uma requisição HTTP do tipo POST e ela é o tipo JSON
        if(req.method == 'POST' && req.is('application/json')){
            const dados = req.body;
            const nome = dados.nome; 
            const descricao = dados.descricao;
            const dataInicio = dados.dataInicio;
            const dataFim = dados.dataFim;
            const valorPista = dados.valorPista;
            const valorVip = dados.valorVip;
            const valorCamarote = dados.valorCamarote;
            const avaliacao = dados.avaliacao;

            if(nome && descricao && dataInicio && dataFim && valorPista && valorVip && valorCamarote && avaliacao){
                const evento = new Evento(0, nome, descricao, dataInicio, dataFim, valorPista, valorVip, valorCamarote, avaliacao);

                //resolver a promessa de gravar um cliente (método incluir é assincrono)
                evento.incluir().then(() => {
                    resp.status(201).json({
                        "status": true,
                        "mensagem": "Evento incluído com sucesso!"
                    })
                }).catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o evento: " + erro.message
                    })
                })
            }else{
                resp.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Informe todos os dados do evento"
                })
            }
            
        }else{
            resp.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            })
        }
    };

    //reponsável por processar requisições HTTP do tipo PUT/PATCH
    alterar(req, resp){
        if(req.method == 'PUT' || req.method == 'PATCH' && req.is('application/json')){
            const dados = req.body;
            const codigo = req.params.codigo;
            const nome = dados.nome; 
            const descricao = dados.descricao;
            const dataInicio = dados.dataInicio;
            const dataFim = dados.dataFim;
            const valorPista = dados.valorPista;
            const valorVip = dados.valorVip;
            const valorCamarote = dados.valorCamarote;
            const avaliacao = dados.avaliacao;

            if(codigo && nome && descricao && dataInicio && dataFim && valorPista && valorVip && valorCamarote && avaliacao){
                const evento = new Evento(codigo, nome, descricao, dataInicio, dataFim, valorPista, valorVip, valorCamarote, avaliacao);

                evento.alterar().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": "Evento alterado com sucesso!"
                    })
                }).catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o evento: " + erro.message
                    })
                })
            }else{
                resp.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Informe todos os dados do evento"
                })
            }
        }else{
            resp.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            })
        }
    };

    //reponsável por processar requisições HTTP do tipo DELETE
    excluir(req, resp){
        if(req.method == 'DELETE'){
            const codigo = req.params.codigo;

            if(codigo){
                const evento = new Evento(codigo);

                evento.excluir().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": "Evento excluido com sucesso!"
                    })
                }).catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o evento: " + erro.message
                    })
                })
            }else{
                resp.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Informe o codigo do evento"
                })
            }
        }else{
            resp.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            })
        }
    };

    //reponsável por processar requisições HTTP do tipo GET
    consultar(req, resp){
        //o termo de busca será uma informação que será passada na url
        //o objeto parmas da requisição acumula os parametros passados na url 
        let termoBusca = req.params.termoBusca;

        if(!termoBusca){
            termoBusca = "";
        }

        if(req.method == 'GET'){
            const evento = new Evento();
            evento.consultar(termoBusca).then((eventos) => {
                return resp.status(200).json({
                    "status": true,
                    "listaEventos": eventos
                });
            }).catch((erro) => {
                return resp.status(400).json({
                    "status": false,
                    "mensagem": 'Erro ao consultar os eventos: ' + erro.message
                });
            });
        }else{
            resp.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            })
        }
    };
}