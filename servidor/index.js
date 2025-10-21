const express = require('express')
const app = express()
const prompt = require('prompt-sync')()
const fs = require('fs')

class Filme {
    _codigo
    _titulo
    _diretor
    _genero
    _tipoMidia
    _dataLocacao
    _dataDevolucao
    _fornecidoPor
    _alugadoPor

    constructor(codigo, titulo, diretor, genero, tipoMidia, fornecidoPor) {
        this.codigo = codigo
        this.titulo = titulo
        this.diretor = diretor
        this.genero = genero
        this.tipoMidia = tipoMidia
        this.fornecidoPor = fornecidoPor
        this._dataLocacao = 0
        this._dataDevolucao = 0
        this._alugadoPor = null
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

    get fornecidoPor() {
        return this._fornecidoPor
    }

    set fornecidoPor(fornecedor) {
        if (typeof fornecedor !== 'string' || fornecedor.trim() === '') {
            throw new Error('Fornecedor inválido.')
        }
        this._fornecidoPor = fornecedor.toUpperCase()
    }

    get dataLocacao() {
        return this._dataLocacao
    }

    set dataLocacao(valor) {
        this._dataLocacao = valor
    }

    get dataDevolucao() {
        return this._dataDevolucao
    }

    set dataDevolucao(valor) {
        this._dataDevolucao = valor
    }
}

class Cliente {
    _numeroCarteira
    _cpf
    _nome
    _locacoes
    _pendencias

    constructor(numeroCarteira, cpf, nome) {
        this.numeroCarteira = numeroCarteira
        this.cpf = cpf
        this.nome = nome
        this._locacoes = []
        this._pendencias = []
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

    get pendencias() {
        return this._pendencias
    }

    set pendencias(novasPendencias) {
        this._pendencias = novasPendencias
    }
}

class Funcionario {
    _matricula
    _cpf
    _nome
    _funcao

    constructor(matricula, cpf, nome, funcao) {
        this.matricula = matricula
        this.cpf = cpf
        this.nome = nome
        this.funcao = funcao
    }

    get matricula() {
        return this._matricula
    }

    set matricula(novaMatricula) {
        if (typeof novaMatricula !== 'number') {
            throw new Error('Matrícula inválida.')
        }
        this._matricula = novaMatricula
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
        this._nome = novoNome.toUpperCase()
    }

    get funcao() {
        return this._funcao
    }

    set funcao(novaFuncao) {
        if (typeof novaFuncao !== 'string' || novaFuncao.trim() === '') {
            throw new Error('Função inválida.')
        }
        this._funcao = novaFuncao.toUpperCase()
    }
}

class Fornecedor {
    _id
    _cnpj
    _nome
    _contato

    constructor(id, cnpj, nome, contato) {
        this.id = id
        this.cnpj = cnpj
        this.nome = nome
        this.contato = contato
    }

    get id() {
        return this._id
    }

    set id(novoId) {
        if (typeof novoId !== 'number') {
            throw new Error('ID inválido.')
        }
        this._id = novoId
    }

    get cnpj() {
        return this._cnpj
    }

    set cnpj(novoCnpj) {
        if (typeof novoCnpj !== 'string' || novoCnpj.trim() === '') {
            throw new Error('CNPJ inválido.')
        }
        if (novoCnpj.length !== 14) {
            throw new Error('CNPJ deve ter 14 dígitos.')
        }
        this._cnpj = novoCnpj
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido.')
        }
        this._nome = novoNome.toUpperCase()
    }

    get contato() {
        return this._contato
    }

    set contato(novoContato) {
        if (typeof novoContato !== 'string' || novoContato.trim() === '') {
            throw new Error('Contato inválido.')
        }
        this._contato = novoContato.toUpperCase()
    }
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

function cadastraFilme() {
    console.log('\n----- CADASTRAR FILME -----')
    try {
        const codigo = Date.now()
        const titulo = prompt('Título: ')
        const diretor = prompt('Diretor: ')
        const genero = prompt('Gênero: ')
        const tipoMidia = prompt('Tipo de Mídia: ')
        const fornecidoPor = prompt('Fornecedor: ')
        const novoFilme = new Filme(codigo, titulo, diretor, genero, tipoMidia, fornecidoPor)
        acervoFilmes.push(novoFilme)
        salvarDados('acervoFilmes.json', acervoFilmes)
        return novoFilme
    } catch (e) {
        console.log(e.message)
    }
}

function cadastraCliente() {
    console.log('\n----- CADASTRAR CLIENTE -----')
    try {
        const numeroCarteira = numeroCarteirinha()
        const cpf = prompt('CPF: ')
        const nome = prompt('Nome Completo: ')
        const novoCliente = new Cliente(numeroCarteira, cpf, nome)
        clientela.push(novoCliente)
        salvarDados('clientela.json', clientela)
        return novoCliente
    } catch (e) {
        console.log(e.message)
    }
}

function cadastraFuncionario() {
    console.log('\n----- CADASTRAR FUNCIONÁRIO -----')
    try {
        const matricula = Date.now()
        const cpf = prompt('CPF: ')
        const nome = prompt('Nome Completo: ')
        const funcao = prompt('Função: ')
        const novoFuncionario = new Funcionario(matricula, cpf, nome, funcao)
        funcionarios.push(novoFuncionario)
        salvarDados('funcionarios.json', funcionarios)
        return novoFuncionario
    } catch (e) {
        console.log(e.message)
    }
}

function cadastraFornecedor() {
    console.log('\n----- CADASTRAR FORNECEDOR -----')
    try {
        const id = Date.now()
        const cnpj = prompt('CNPJ: ')
        const nome = prompt('Nome da Empresa: ')
        const contato = prompt('Contato: ')
        const novoFornecedor = new Fornecedor(id, cnpj, nome, contato)
        fornecedores.push(novoFornecedor)
        salvarDados('fornecedores.json', fornecedores)
        return novoFornecedor
    } catch (e) {
        console.log(e.message)
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

    if (filme._dataLocacao !== 0) {
        throw new Error('Filme já alugado.')
    }

    const dataAtual = new Date()
    const dataDevolucao = new Date()
    dataDevolucao.setDate(dataAtual.getDate() + 7)

    filme._dataLocacao = dataAtual.toLocaleDateString('pt-BR')
    filme._dataDevolucao = dataDevolucao.toLocaleDateString('pt-BR')
    filme._alugadoPor = numeroCarteira

    cliente._locacoes.push({
        codigoFilme: filme._codigo,
        titulo: filme._titulo,
        dataLocacao: filme._dataLocacao,
        dataDevolucao: filme._dataDevolucao
    })

    salvarDados('acervoFilmes.json', acervoFilmes)
    salvarDados('clientela.json', clientela)

    return { filme, cliente }
}

function adiaDevolucao(codigoFilme, dias = 3) {
    const filme = acervoFilmes.find(f => f._codigo == codigoFilme)

    if (!filme) {
        throw new Error('Filme não encontrado.')
    }

    if (filme._dataLocacao === 0) {
        throw new Error('Filme não está alugado.')
    }

    const cliente = clientela.find(c =>
        c._locacoes && c._locacoes.some(l => l.codigoFilme == codigoFilme)
    )

    if (!cliente) {
        throw new Error('Cliente associado não encontrado.')
    }

    const dataNova = new Date(filme._dataDevolucao.split('/').reverse().join('-'))
    dataNova.setDate(dataNova.getDate() + dias)

    filme._dataDevolucao = dataNova.toLocaleDateString('pt-BR')

    const locacaoCliente = cliente._locacoes.find(l => l.codigoFilme == codigoFilme)
    locacaoCliente.dataDevolucao = filme._dataDevolucao

    salvarDados('acervoFilmes.json', acervoFilmes)
    salvarDados('clientela.json', clientela)

    return { filme, cliente }
}

function removeFilme(codigo) {
    const cod = Number(codigo)
    const index = acervoFilmes.findIndex(f => f._codigo === cod)
    if (index === -1) throw new Error('Filme não encontrado.')
    const removido = acervoFilmes.splice(index, 1)[0]
    salvarDados('acervoFilmes.json', acervoFilmes)
    return removido
}

function removeCliente(numeroCarteira) {
    const carteira = String(numeroCarteira)
    const index = clientela.findIndex(c => c._numeroCarteira === carteira)
    if (index === -1) throw new Error('Cliente não encontrado.')
    const removido = clientela.splice(index, 1)[0]
    salvarDados('clientela.json', clientela)
    return removido
}

function desligaFuncionario(matricula) {
    const mat = Number(matricula)
    const index = funcionarios.findIndex(f => f._matricula === mat)
    if (index === -1) throw new Error('Funcionário não encontrado.')
    const removido = funcionarios.splice(index, 1)[0]
    salvarDados('funcionarios.json', funcionarios)
    return removido
}

function desligaFornecedor(cnpj) {
    const c = String(cnpj)
    const index = fornecedores.findIndex(f => f._cnpj === c)
    if (index === -1) throw new Error('Fornecedor não encontrado.')
    const removido = fornecedores.splice(index, 1)[0]
    salvarDados('fornecedores.json', fornecedores)
    return removido
}

let acervoFilmes = lerDados('acervoFilmes.json')
let clientela = lerDados('clientela.json')
let funcionarios = lerDados('funcionarios.json')
let fornecedores = lerDados('fornecedores.json')

app.get('/', (req, res) => res.send('GERENCIADOR: LOCADORA SHOE-LEATHER'))

app.get('/acervo', (req, res) => res.json(acervoFilmes))

app.get('/clientela', (req, res) => res.json(clientela))

app.get('/funcionarios', (req, res) => res.json(funcionarios))

app.get('/fornecedores', (req, res) => res.json(fornecedores))

app.post('/cadastrar-filme', (req, res) => {
    const novo = cadastraFilme()
    if (novo) {
        res.send(`Filme ${novo._titulo} cadastrado!`)
    } else {
        res.status(400).send('Erro.')
    }
})

app.post('/cadastrar-cliente', (req, res) => {
    const novo = cadastraCliente()
    if (novo) {
        res.send(`Cliente ${novo._nome} cadastrado!`)
    } else {
        res.status(400).send('Erro.')
    }
})

app.post('/cadastrar-fornecedor', (req, res) => {
    const novo = cadastraFornecedor()
    if (novo) {
        res.send(`Fornecedor ${novo._nome} cadastrado!`)
    } else {
        res.status(400).send('Erro.')
    }
})

app.post('/cadastrar-funcionario', (req, res) => {
    const novo = cadastraFuncionario()
    if (novo) {
        res.send(`Funcionário ${novo._nome} cadastrado!`)
    } else {
        res.status(400).send('Erro.')
    }
})

app.put('/alugar-filme/:codigoFilme/:numeroCarteira', (req, res) => {
    try {
        const { codigoFilme, numeroCarteira } = req.params
        const r = alugaFilme(codigoFilme, numeroCarteira)
        res.json({
            mensagem: `Filme "${r.filme._titulo}" alugado por ${r.cliente._nome}.`,
            filme: r.filme,
            cliente: r.cliente
        })
    } catch (e) {
        res.status(400).json({ erro: e.message })
    }
})

app.patch('/adiar-devolucao/:codigoFilme/:dias', (req, res) => {
    try {
        const { codigoFilme, dias } = req.params
        const r = adiaDevolucao(codigoFilme, parseInt(dias))
        res.json({
            mensagem: `Devolução de "${r.filme._titulo}" adiada para ${r.filme._dataDevolucao}.`,
            filme: r.filme,
            cliente: r.cliente
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
        res.status(404).json({ erro: erro.message })
    }
})

app.delete('/remover-cliente/:numeroCarteira', (req, res) => {
    try {
        const numeroCarteira = parseInt(req.params.numeroCarteira)
        const clienteRemovido = removeCliente(numeroCarteira)
        res.json({
            mensagem: `Cliente ${clienteRemovido._nome} removido com sucesso.`,
            clienteRemovido
        })
    } catch (erro) {
        res.status(404).json({ erro: erro.message })
    }
})

app.delete('/desligar-funcionario/:matricula', (req, res) => {
    try {
        const matricula = parseInt(req.params.matricula)
        const funcionarioRemovido = desligaFuncionario(matricula)
        res.json({
            mensagem: `Funcionário ${funcionarioRemovido._nome} desligado com sucesso.`,
            funcionarioRemovido
        })
    } catch (erro) {
        res.status(404).json({ erro: erro.message })
    }
})

app.delete('/desligar-fornecedor/:cnpj', (req, res) => {
    try {
        const cnpj = parseInt(req.params.cnpj)
        const fornecedorRemovido = desligaFornecedor(cnpj)
        res.json({
            mensagem: `Fornecedor ${fornecedorRemovido._nome} removido com sucesso.`,
            fornecedorRemovido
        })
    } catch (erro) {
        res.status(404).json({ erro: erro.message })
    }
})

const port = 3000

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
