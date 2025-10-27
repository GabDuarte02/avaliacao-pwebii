const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json()) // importante para receber JSON no body

// ------------------- CLASSES -------------------
class Filme {
    _codigo
    _titulo
    _diretor
    _genero
    _tipoMidia

    constructor(codigo, titulo, diretor, genero, tipoMidia) {
        this.codigo = codigo
        this.titulo = titulo
        this.diretor = diretor
        this.genero = genero
        this.tipoMidia = tipoMidia
    }

    get codigo() { return this._codigo }
    set codigo(valor) { 
        if (typeof valor !== 'number') throw new Error('Código inválido.')
        this._codigo = valor 
    }

    get titulo() { return this._titulo }
    set titulo(valor) { 
        if (typeof valor !== 'string' || !valor.trim()) throw new Error('Título inválido.')
        this._titulo = valor.toUpperCase() 
    }

    get diretor() { return this._diretor }
    set diretor(valor) { 
        if (typeof valor !== 'string' || !valor.trim()) throw new Error('Diretor inválido.')
        this._diretor = valor.toUpperCase() 
    }

    get genero() { return this._genero }
    set genero(valor) { 
        if (typeof valor !== 'string' || !valor.trim()) throw new Error('Gênero inválido.')
        this._genero = valor.toUpperCase() 
    }

    get tipoMidia() { return this._tipoMidia }
    set tipoMidia(valor) { 
        if (typeof valor !== 'string' || !valor.trim()) throw new Error('Tipo de mídia inválido.')
        this._tipoMidia = valor.toUpperCase() 
    }
}

class Cliente {
    _numeroCarteira
    _cpf
    _nome
    _locacoes
    _historico

    constructor(numeroCarteira, cpf, nome) {
        this.numeroCarteira = numeroCarteira
        this.cpf = cpf
        this.nome = nome
        this._locacoes = []
        this._historico = []
    }

    get numeroCarteira() { return this._numeroCarteira }
    set numeroCarteira(valor) { 
        if (typeof valor !== 'string' || !valor.trim()) throw new Error('Carteira inválida.')
        this._numeroCarteira = valor 
    }

    get cpf() { return this._cpf }
    set cpf(valor) { 
        if (typeof valor !== 'string' || valor.length !== 11) throw new Error('CPF deve ter 11 dígitos.')
        this._cpf = valor 
    }

    get nome() { return this._nome }
    set nome(valor) { 
        if (typeof valor !== 'string' || valor.split(' ').length < 2) throw new Error('Informe nome e sobrenome.')
        this._nome = valor.toUpperCase() 
    }

    get locacoes() { return this._locacoes }
    set locacoes(valor) { this._locacoes = valor }

    get historico() { return this._historico }
    set historico(valor) { this._historico = valor }
}

class Locacao {
    _codigo
    _codigoFilme
    _numeroCarteira
    _dataLocacao
    _dataDevolucaoPrevista
    _devolucaoEfetiva

    constructor(codigo, codigoFilme, numeroCarteira, dataLocacao, dataDevolucaoPrevista, devolucaoEfetiva = null) {
        this.codigo = codigo
        this.codigoFilme = codigoFilme
        this.numeroCarteira = numeroCarteira
        this.dataLocacao = dataLocacao
        this.dataDevolucaoPrevista = dataDevolucaoPrevista
        this.devolucaoEfetiva = devolucaoEfetiva
    }

    get codigo() { return this._codigo }
    set codigo(valor) { this._codigo = valor }

    get codigoFilme() { return this._codigoFilme }
    set codigoFilme(valor) { this._codigoFilme = valor }

    get numeroCarteira() { return this._numeroCarteira }
    set numeroCarteira(valor) { this._numeroCarteira = valor }

    get dataLocacao() { return this._dataLocacao }
    set dataLocacao(valor) { this._dataLocacao = valor }

    get dataDevolucaoPrevista() { return this._dataDevolucaoPrevista }
    set dataDevolucaoPrevista(valor) { this._dataDevolucaoPrevista = valor }

    get devolucaoEfetiva() { return this._devolucaoEfetiva }
    set devolucaoEfetiva(valor) { this._devolucaoEfetiva = valor }
}

class Historico {
    _codigo
    _codigoFilme
    _numeroCarteira
    _dataLocacao
    _devolucaoEfetiva

    constructor(codigo, codigoFilme, numeroCarteira, dataLocacao, devolucaoEfetiva) {
        this.codigo = codigo
        this.codigoFilme = codigoFilme
        this.numeroCarteira = numeroCarteira
        this.dataLocacao = dataLocacao
        this.devolucaoEfetiva = devolucaoEfetiva
    }

    get codigo() { return this._codigo }
    set codigo(valor) { this._codigo = valor }

    get codigoFilme() { return this._codigoFilme }
    set codigoFilme(valor) { this._codigoFilme = valor }

    get numeroCarteira() { return this._numeroCarteira }
    set numeroCarteira(valor) { this._numeroCarteira = valor }

    get dataLocacao() { return this._dataLocacao }
    set dataLocacao(valor) { this._dataLocacao = valor }

    get devolucaoEfetiva() { return this._devolucaoEfetiva }
    set devolucaoEfetiva(valor) { this._devolucaoEfetiva = valor }
}

// ------------------- ARQUIVOS -------------------
function lerDados(arquivo) {
    try { return JSON.parse(fs.readFileSync(arquivo, 'utf8')) }
    catch { return [] }
}

function salvarDados(arquivo, dados) {
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2))
}

function numeroCarteirinha() {
    return String(Math.floor(Math.random() * 100000)).padStart(5, '0')
}

// ------------------- ARRAYS -------------------
let acervoFilmes = lerDados('acervoFilmes.json')
let clientela = lerDados('clientela.json')
let locacoes = lerDados('locacoes.json')
let historico = lerDados('historico.json')

// ------------------- FUNÇÕES -------------------
function cadastraFilme(data) {
    const { titulo, diretor, genero, tipoMidia } = data
    const codigo = Date.now()
    const novoFilme = new Filme(codigo, titulo, diretor, genero, tipoMidia)
    acervoFilmes.push(novoFilme)
    salvarDados('acervoFilmes.json', acervoFilmes)
    return novoFilme
}

function cadastraCliente(data) {
    const { cpf, nome } = data
    const numeroCarteira = numeroCarteirinha()
    const novoCliente = new Cliente(numeroCarteira, cpf, nome)
    clientela.push(novoCliente)
    salvarDados('clientela.json', clientela)
    return novoCliente
}

function alugaFilme(codigoFilme, numeroCarteira) {
    const filme = acervoFilmes.find(f => f._codigo === Number(codigoFilme))
    const cliente = clientela.find(c => c._numeroCarteira === numeroCarteira)
    if (!filme) throw new Error('Filme não encontrado.')
    if (!cliente) throw new Error('Cliente não encontrado.')
    if (locacoes.some(l => l._codigoFilme === filme._codigo)) throw new Error('Filme já alugado.')

    const dataAtual = new Date()
    const dataDevolucao = new Date()
    dataDevolucao.setDate(dataAtual.getDate() + 7)

    const codigoLocacao = Date.now()
    const novaLocacao = new Locacao(
        codigoLocacao,
        filme._codigo,
        cliente._numeroCarteira,
        dataAtual.toLocaleDateString('pt-BR'),
        dataDevolucao.toLocaleDateString('pt-BR')
    )

    locacoes.push(novaLocacao)
    cliente._locacoes.push(codigoLocacao)
    salvarDados('locacoes.json', locacoes)
    salvarDados('clientela.json', clientela)

    return { filme, cliente, novaLocacao }
}

function devolveFilme(codigoFilme) {
    const indexLocacao = locacoes.findIndex(l => l._codigoFilme === Number(codigoFilme))
    if (indexLocacao === -1) throw new Error('Filme não encontrado nas locações ativas.')

    const locacaoConcluida = locacoes.splice(indexLocacao, 1)[0]
    const cliente = clientela.find(c => c._numeroCarteira === locacaoConcluida._numeroCarteira)
    if (!cliente) throw new Error('Cliente não encontrado.')
if (indexClienteLoc > -1) {
        cliente._locacoes.splice(indexClienteLoc, 1)
    }
    cliente._historico.push(locacaoConcluida._codigo)

    const dataDevolucaoEfetiva = new Date().toLocaleDateString('pt-BR')
    const novoHistorico = new Historico(
        locacaoConcluida._codigo,
        locacaoConcluida._codigoFilme,
        locacaoConcluida._numeroCarteira,
        locacaoConcluida._dataLocacao,
        dataDevolucaoEfetiva
    )

    historico.push(novoHistorico)

    salvarDados('locacoes.json', locacoes)
    salvarDados('historico.json', historico)
    salvarDados('clientela.json', clientela)

    return { historico: novoHistorico, cliente }
}

app.get('/', (req, res) => res.send('GERENCIADOR: LOCADORA SHOE-LEATHER'))

app.get('/acervo', (req, res) => res.json(acervoFilmes))
app.get('/clientela', (req, res) => res.json(clientela))
app.get('/locacoes', (req, res) => res.json(locacoes))
app.get('/historico', (req, res) => res.json(historico))

app.post('/cadastrar-filme', (req, res) => {
    try {
        const novo = cadastraFilme(req.body)
        res.status(201).json(novo)
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.post('/cadastrar-cliente', (req, res) => {
    try {
        const novo = cadastraCliente(req.body)
        res.status(201).json(novo)
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.put('/alugar-filme/:codigoFilme/:numeroCarteira', (req, res) => {
    try {
        const { codigoFilme, numeroCarteira } = req.params
        const r = alugaFilme(codigoFilme, numeroCarteira)
        res.json({
            mensagem: `Filme "${r.filme._titulo}" alugado por ${r.cliente._nome}.`,
            locacao: r.novaLocacao
        })
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.put('/devolver-filme/:codigoFilme', (req, res) => {
    try {
        const { codigoFilme } = req.params
        const r = devolveFilme(codigoFilme)
        res.json({
            mensagem: `Filme devolvido por ${r.cliente._nome}.`,
            registro: r.historico
        })
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.delete('/remover-filme/:codigo', (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo)

        // Impede remover filme alugado
        const alugado = locacoes.some(l => l._codigoFilme === codigo)
        if (alugado) throw new Error('Não é possível remover. Filme está alugado.')

        const index = acervoFilmes.findIndex(f => f._codigo === codigo)
        if (index === -1) throw new Error('Filme não encontrado.')

        const removido = acervoFilmes.splice(index, 1)[0]
        salvarDados('acervoFilmes.json', acervoFilmes)

        res.json({ mensagem: `Filme ${removido._titulo} removido com sucesso.`, filmeRemovido: removido })
    } catch (erro) {
        res.status(400).json({ erro: erro.message })
    }
})

app.delete('/remover-cliente/:numeroCarteira', (req, res) => {
    try {
        const numeroCarteira = req.params.numeroCarteira
        const cliente = clientela.find(c => c._numeroCarteira === numeroCarteira)
        if (!cliente) throw new Error('Cliente não encontrado.')

        if (cliente._locacoes.length > 0) throw new Error('Não é possível remover. Cliente possui locações ativas.')

        const index = clientela.findIndex(c => c._numeroCarteira === numeroCarteira)
        const removido = clientela.splice(index, 1)[0]
        salvarDados('clientela.json', clientela)

        res.json({ mensagem: `Cliente ${removido._nome} removido com sucesso.`, clienteRemovido: removido })
    } catch (erro) {
        res.status(400).json({ erro: erro.message })
    }
})

// ------------------- INICIAR SERVIDOR -------------------
const port = 3000
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
