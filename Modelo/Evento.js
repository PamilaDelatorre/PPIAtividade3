import EventoDAO from "../DAO/EventoDAO.js";

export default class Evento{
    //atributos privados
    #codigo
    #nome
    #descricao
    #dataInicio
    #dataFim
    #valorPista
    #valorVip
    #valorCamarote
    #avaliacao

    constructor(codigo, nome, descricao, dataInicio, dataFim, valorPista, valorVip, valorCamarote, avaliacao){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#dataInicio = dataInicio;
        this.#dataFim = dataFim;
        this.#valorPista = valorPista;
        this.#valorVip = valorVip;
        this.#valorCamarote = valorCamarote;
        this.#avaliacao = avaliacao
    }

    // métodos javascript getters e setters
    get codigo() {
        return this.#codigo;
    }
    
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }
    
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get descricao() {
        return this.#descricao;
    }
    
    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get dataInicio() {
        return this.#dataInicio;
    }
    
    set dataInicio(novaData) {
        this.#dataInicio = novaData;
    }

    get dataFim() {
        return this.#dataFim;
    }
    
    set dataFim(novaData) {
        this.#dataFim = novaData;
    }

    get valorPista() {
        return this.#valorPista;
    }
    
    set valorPista(novoValor) {
        this.#valorPista = novoValor;
    }

    get valorVip() {
        return this.#valorVip;
    }
    
    set valorVip(novoValor) {
        this.#valorVip = novoValor;
    }

    get valorCamarote() {
        return this.#valorCamarote;
    }
    
    set valorCamarote(novoValor) {
        this.#valorCamarote = novoValor;
    }

    get avaliacao() {
        return this.#avaliacao;
    }
    
    set avaliacao(novaAvaliacao) {
        this.#avaliacao = novaAvaliacao;
    }

     //sobrescrita do método toString()
    toString() {
        return `Nome: ${this.#nome}
        Descrição: ${this.#descricao}
        Data de Início: ${this.#dataInicio}
        Data de Fim: ${this.#dataFim}
        Valor Pista: R$ ${this.#valorPista}
        Valor VIP: R$ ${this.#valorVip}
        Valor Camarote: R$ ${this.#valorCamarote}
        Avaliação: ${this.#avaliacao} estrelas`;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            descrição: this.#descricao,
            dataInicio: this.#dataInicio,
            dataFim: this.#dataFim,
            valorPista: this.#valorPista,
            valorVIP: this.#valorVip,
            valorCamarote: this.#valorCamarote,
            avaliacao: this.#avaliacao
        }
    }

    async incluir(){
        const eventoDAO = new EventoDAO();
        this.codigo = await eventoDAO.gravar(this);
    }

    async alterar(){
        const eventoDAO = new EventoDAO();
        await eventoDAO.alterar(this);
    }

    async excluir(){
        const eventoDAO = new EventoDAO();
        await eventoDAO.excluir(this);
    }

    async consultar(termoBusca){
        const eventoDAO = new EventoDAO();
        return await eventoDAO.consultar(termoBusca);
    }
}