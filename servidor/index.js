const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

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

    get codigo() {
        return this._codigo
    }

    set codigo(novoCodigo) {
        if (typeof novoCodigo !== 'number') {
            throw new Error('Código inválido.')
        }
        this._codigo = novoCodigo
    }

    get titulo() {
        return this._titulo
    }

    set titulo(novoTitulo) {
        if (typeof novoTitulo !== 'string' || novoTitulo.trim() === '') {
            throw new Error('Título inválido.')
        }
        this._titulo = novoTitulo.toUpperCase()
    }

    get diretor() {
        return this._diretor
    }

    set diretor(novoDiretor) {
        if (typeof novoDiretor !== 'string' || novoDiretor.trim() === '') {
            throw new Error('Diretor inválido.')
        }
        this._diretor = novoDiretor.toUpperCase()
    }

    get genero() {
        return this._genero
    }

    set genero(novoGenero) {
        if (typeof novoGenero !== 'string' || novoGenero.trim() === '') {
            throw new Error('Gênero inválido.')
        }
        this._genero = novoGenero.toUpperCase()
    }

    get tipoMidia() {
        return this._tipoMidia
    }

    set tipoMidia(novoTipoMidia) {
        if (typeof novoTipoMidia !== 'string' || novoTipoMidia.trim() === '') {
            throw new Error('Tipo de mídia inválido.')
        }
        this._tipoMidia = novoTipoMidia.toUpperCase()
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

    get numeroCarteira() {
        return this._numeroCarteira
    }

    set numeroCarteira(novoNumeroCarteira) {
        if (typeof novoNumeroCarteira !== 'string' || novoNumeroCarteira.trim() === '') {
            throw new Error('Carteira inválida.')
        }
        this._numeroCarteira = novoNumeroCarteira
    }

    get cpf() {
        return this._cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'string' || novoCpf.trim() === '') {
            throw new Error('CPF inválido.')
        }
        if (novoCpf.length !== 11) {
            throw new Error('CPF deve ter 11 dígitos.')
        }
        this._cpf = novoCpf
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido.')
        }
        if (novoNome.split(' ').length < 2) {
            throw new Error('Informe nome e sobrenome.')
        }
        this._nome = novoNome.toUpperCase()
    }

    get locacoes() {
        return this._locacoes
    }

    set locacoes(novasLocacoes) {
        this._locacoes = novasLocacoes
    }



    get historico() {
        return this._historico
    }

    set historico(novoHistorico) {
        this._historico = novoHistorico
    }
}

class Locacao {
    _codigo
    _codigoFilme
    _numeroCarteira
    _dataLocacao
    _dataDevolucaoPrevista
    _devolucaoEfetiva

    constructor(codigo, codigoFilme, numeroCarteira, dataLocacao, dataDevolucaoPrevista, devolucaoEfetiva) {
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
    _codigoFilme
    _registros

    constructor(codigoFilme) {
        this.codigoFilme = codigoFilme
        this._registros = []
    }

    get codigoFilme() { return this._codigoFilme }
    set codigoFilme(valor) { this._codigoFilme = valor }

    get registros() { return this._registros }
    set registros(valor) { this._registros = valor }
}

function lerDados(arquivo) {
    try {
        const dados = fs.readFileSync(arquivo, 'utf8')
        return JSON.parse(dados)
    } catch {
        return []
    }
}

function salvarDados(arquivo, dados) {
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2))
}

function numeroCarteirinha() {
    return String(Math.floor(Math.random() * 100000)).padStart(5, '0')
}

function cadastraFilme(data) {
    console.log('\n----- CADASTRAR FILME -----')
    try {
        const { titulo, diretor, genero, tipoMidia } = data
        const codigo = Date.now()
        const novoFilme = new Filme(codigo, titulo, diretor, genero, tipoMidia)
        acervoFilmes.push(novoFilme)
        salvarDados('acervoFilmes.json', acervoFilmes)
        return novoFilme
    } catch (e) {
        console.log(e.message)
        throw e
    }
}

function cadastraCliente(data) {
    console.log('\n----- CADASTRAR CLIENTE -----')
    try {
        const { cpf, nome } = data
        const numeroCarteira = numeroCarteirinha()
        const novoCliente = new Cliente(numeroCarteira, cpf, nome)
        clientela.push(novoCliente)
        salvarDados('clientela.json', clientela)
        return novoCliente
    } catch (e) {
        console.log(e.message)
        throw e
    }
}

function alugaFilme(codigoFilme, numeroCarteira) {
    const filme = acervoFilmes.find(f => f._codigo == codigoFilme)
    const cliente = clientela.find(c => c._numeroCarteira == numeroCarteira)

    if (!filme) {
        throw new Error('Filme não encontrado.')
    }

    if (!cliente) {
        throw new Error('Cliente não encontrado.')
    }

    const jaAlugado = locacoes.some(l => l._codigoFilme == codigoFilme)
    if (jaAlugado) {
        throw new Error('Filme já alugado.')
    }

    const dataAtual = new Date()
    const dataDevolucao = new Date()
    dataDevolucao.setDate(dataAtual.getDate() + 7)

    const codigoLocacao = Date.now()
    const dataLocacaoStr = dataAtual.toLocaleDateString('pt-BR')
    const dataDevolucaoStr = dataDevolucao.toLocaleDateString('pt-BR')

    const novaLocacao = new Locacao(
        codigoLocacao,
        filme._codigo,
        cliente._numeroCarteira,
        dataLocacaoStr,
        dataDevolucaoStr,
        null
    )

    locacoes.push(novaLocacao)
    
    cliente._locacoes.push(codigoLocacao)

    salvarDados('locacoes.json', locacoes)
    salvarDados('clientela.json', clientela)

    return { filme, cliente, novaLocacao }
}

function devolveFilme(codigoFilme) {
    const locacaoIndex = locacoes.findIndex(l => l._codigoFilme == codigoFilme)
    
    if (locacaoIndex === -1) {
        throw new Error('Filme não encontrado nas locações ativas.')
    }

    const [locacaoConcluida] = locacoes.splice(locacaoIndex, 1)

    const cliente = clientela.find(c => c._numeroCarteira === locacaoConcluida._numeroCarteira)
    
    if (cliente) {
        const clienteLocIndex = cliente._locacoes.indexOf(locacaoConcluida._codigo)
        if (clienteLocIndex > -1) {
            cliente._locacoes.splice(clienteLocIndex, 1)
        }
        cliente._historico.push(locacaoConcluida._codigo)
    }

    const dataDevolucaoEfetiva = new Date().toLocaleDateString('pt-BR')

    const novoRegistro = {
        codigoLocacao: locacaoConcluida._codigo,
        numeroCarteira: locacaoConcluida._numeroCarteira,
        dataLocacao: locacaoConcluida._dataLocacao,
        dataDevolucaoEfetiva: dataDevolucaoEfetiva
    }

    let historicoDoFilme = historico.find(h => h._codigoFilme == locacaoConcluida._codigoFilme)

    if (historicoDoFilme) {
        historicoDoFilme._registros.push(novoRegistro)
    } else {
        historicoDoFilme = new Historico(locacaoConcluida._codigoFilme)
        historicoDoFilme._registros.push(novoRegistro)
        historico.push(historicoDoFilme)
    }

    salvarDados('locacoes.json', locacoes)
    salvarDados('historico.json', historico)
    salvarDados('clientela.json', clientela)

    return { historico: historicoDoFilme, cliente }
}


function adiaDevolucao(codigoFilme, dias = 3) {
    const locacao = locacoes.find(l => l._codigoFilme == codigoFilme)

    if (!locacao) {
        throw new Error('Filme não está alugado.')
    }
    
    const filme = acervoFilmes.find(f => f._codigo == codigoFilme)
    const cliente = clientela.find(c => c._numeroCarteira === locacao._numeroCarteira)

    const dataAntiga = new Date(locacao._dataDevolucaoPrevista.split('/').reverse().join('-'))
    dataAntiga.setDate(dataAntiga.getDate() + dias)

    locacao._dataDevolucaoPrevista = dataAntiga.toLocaleDateString('pt-BR')

    salvarDados('locacoes.json', locacoes)

    return { filme, cliente, locacao }
}

function removeFilme(codigo) {
    const cod = Number(codigo)

    const alugado = locacoes.some(l => l._codigoFilme === cod)
    if (alugado) {
        throw new Error('Não é possível remover. Filme está alugado.')
    }

    const index = acervoFilmes.findIndex(f => f._codigo === cod)
    if (index === -1) throw new Error('Filme não encontrado.')
    
    const removido = acervoFilmes.splice(index, 1)[0]
    salvarDados('acervoFilmes.json', acervoFilmes)
    return removido
}

function removeCliente(numeroCarteira) {
    const carteira = String(numeroCarteira)
    
    const cliente = clientela.find(c => c._numeroCarteira === carteira)
    if (!cliente) {
        throw new Error('Cliente não encontrado.')
    }

    if (cliente._locacoes.length > 0) {
        throw new Error('Não é possível remover. Cliente possui locações ativas.')
    }

    const index = clientela.findIndex(c => c._numeroCarteira === carteira)
    
    const removido = clientela.splice(index, 1)[0]
    salvarDados('clientela.json', clientela)
    return removido
}

let acervoFilmes = lerDados('acervoFilmes.json')
let clientela = lerDados('clientela.json')
let locacoes = lerDados('locacoes.json')
let historico = lerDados('historico.json')

app.get('/', (req, res) => res.send('GERENCIADOR: LOCADORA SHOE-LEATHER'))

app.get('/acervo', (req, res) => res.json(acervoFilmes))

app.get('/clientela', (req, res) => res.json(clientela))

app.get('/locacoes', (req, res) => res.json(locacoes))

app.get('/historico', (req, res) => res.json(historico))

app.post('/cadastrar-filme', (req, res) => {
    try {
        const novo = cadastraFilme(req.body)
        res.status(201).send(`Filme ${novo._titulo} cadastrado!`)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.post('/cadastrar-cliente', (req, res) => {
    try {
        const novo = cadastraCliente(req.body)
        res.status(201).send(`Cliente ${novo._nome} cadastrado com carteira ${novo._numeroCarteira}!`)
    } catch (e) {
        res.status(400).send(e.message)
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

// ENDPOINT DEVOLVERFILME MUDOU A RESPOSTA
app.put('/devolver-filme/:codigoFilme', (req, res) => {
    try {
        const { codigoFilme } = req.params
        const r = devolveFilme(codigoFilme)
        res.json({
            mensagem: `Filme devolvido por ${r.cliente._nome}.`,
            // Retorna o objeto de histórico do filme, que agora contém o array de registros
            registroAgrupadoDoFilme: r.historico
        })
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.patch('/adiar-devolucao/:codigoFilme/:dias', (req, res) => {
    try {
        const { codigoFilme, dias } = req.params
        const r = adiaDevolucao(codigoFilme, parseInt(dias) || 3)
        res.json({
            mensagem: `Devolução de "${r.filme._titulo}" adiada para ${r.locacao._dataDevolucaoPrevista}.`,
            locacao: r.locacao
        })
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.delete('/remover-filme/:codigo', (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo)
        const filmeRemovido = removeFilme(codigo)
        res.json({
            mensagem: `Filme ${filmeRemovido._titulo} removido com sucesso.`,
            filmeRemovido
        })
    } catch (erro) {
        res.status(400).json({ erro: erro.message })
    }
})

app.delete('/remover-cliente/:numeroCarteira', (req, res) => {
    try {
        const numeroCarteira = req.params.numeroCarteira
        const clienteRemovido = removeCliente(numeroCarteira)
        res.json({
            mensagem: `Cliente ${clienteRemovido._nome} removido com sucesso.`,
            clienteRemovido
        })
    } catch (erro) {
        res.status(400).json({ erro: erro.message })
    }
})

const port = 3000

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
