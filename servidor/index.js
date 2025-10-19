const express = require('express')
const app = express()
const prompt = require('prompt-sync')()

class Filme {
    _codigo
    _titulo
    _diretor
    _genero
    _tipoMidia
    _dataLocacao
    _dataDevolucao

    constructor(codigo, titulo, diretor, genero, tipoMidia) {
        this.codigo = codigo
        this.titulo = titulo
        this.diretor = diretor
        this.genero = genero
    }

    get codigo() {
        return this._codigo
    }

    set codigo(novoCodigo) {
        if(typeof novoCodigo !== 'number'){
            throw new Error('Código inválido. Tente novamente.')
        }

        this._codigo = novoCodigo
    }

    get titulo() {
        return this._titulo
    }

    set titulo(novoTitulo) {
        if (typeof novoTitulo !== 'string' || novoTitulo.trim() === '') {
            throw new Error('Por favor, informe um título válido a ser cadastrado.')
        }
        this._titulo = novoTitulo.toUpperCase()
    }

    get diretor() {
        return this._diretor
    }

    set diretor(novoDiretor) {
        if (typeof novoDiretor !== 'string' || novoDiretor.trim() === '') {
            throw new Error('Por favor, informe um diretor válido a ser cadastrado.')
        }
        this._diretor = novoDiretor.toUpperCase()
    }

    get genero() {
        return this._genero
    }

    set genero(novoGenero) {
        if (typeof novoGenero !== 'string' || novoGenero.trim() === '') {
            throw new Error('Por favor, informe um gênero válido a ser cadastrado.')
        }
        this._genero = novoGenero.toUpperCase()
    }
    
    get tipoMidia() {
        return this._tipoMidia
    }

    set tipoMidia(novoTipoMidia) {
        if(typeof novoTipoMidia !== 'string' || novoTipoMidia.trim() === '') {
            throw new Error('Tipo de Mídia inválido. Tente novamente.')
        }
        this._tipoMidia = novoTipoMidia.toUpperCase()
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
    }

    get numeroCarteira() {
        return this._numeroCarteira
    }

    set numeroCarteira(novoNumeroCarteira) {
        if (typeof novoNumeroCarteira !== 'String' || novoNumeroCarteira.trim() === '') {
            throw new Error('Número de carteirinha inválido. Tente novamente.')
        }
        this._numeroCarteira = novoNumeroCarteira
    }

    get cpf() {
        return this._cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'string' || novoCpf.trim() === '') {
            throw new Error('CPF inválido. Tente novamente.')
        } else if (novoCpf.split('').length < 11) {
            throw new Error('CPF incompleto, coloque todos os caracteres.')
        } else if (novoCpf.split('').length > 11) {
            throw new Error('O CPF informado é muito grande, informe corretamente.')
        }
        this._cpf = novoCpf
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this._nome = novoNome.toUpperCase()
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
            throw new Error('Matrícula inválida. Tente novamente.')
        }
        this._matricula = novaMatricula
    }

    get cpf() {
        return this._cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'string' || novoCpf.trim() === '') {
            throw new Error('CPF inválido. Tente novamente.')
        } else if (novoCpf.split('').length < 11) {
            throw new Error('CPF incompleto, coloque todos os caracteres.')
        } else if (novoCpf.split('').length > 11) {
            throw new Error('O CPF informado é muito grande, informe corretamente.')
        }
        this._cpf = novoCpf
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this._nome = novoNome.toUpperCase()
    }

    get funcao() {
        return this._funcao
    }

    set funcao(novaFuncao) {
        if (typeof novaFuncao !== 'string' || novaFuncao.trim() === '') {
            throw new Error('Função inválida. Tente novamente.')
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
            throw new Error('ID inválido. Tente novamente.')
        }
        this._id = novoId
    }

    get cnpj() {
        return this._cnpj
    }

    set cnpj(novoCnpj) {
        if (typeof novoCnpj !== 'string' || novoCnpj.trim() === '') {
            throw new Error('CNPJ inválido. Tente novamente.')
        } else if (novoCnpj.split('').length < 14) {
            throw new Error('CNPJ incompleto, coloque todos os caracteres.')
        } else if (novoCnpj.split('').length > 14) {
            throw new Error('O CNPJ informado é muito grande, informe corretamente.')
        }
        this._cnpj = novoCnpj
    }

    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this._nome = novoNome.toUpperCase()
    }

    get contato() {
        return this._contato
    }

    set contato(novoContato) {
        if (typeof novoContato !== 'string' || novoContato.trim() === '') {
            throw new Error('Contato inválido. Tente novamente.')
        }

        this._contato = novoContato.toUpperCase()
    }
}

function cadastraFilme() {
    console.log('-----CADASTRO DE FILME -----')

    try {
        const codigo = Date.now()
        const titulo = prompt('Título: ')
        const diretor = prompt('Diretor: ')
        const genero = prompt('Gênero: ')
        const tipoMidia = prompt('Tipo de Mídia: ')

        const novoFilme = new Filme(codigo, titulo, diretor, genero, tipoMidia)
        acervoFilmes.push(novoFilme)

        console.log(`\nCadastro do filme ${novoFilme.titulo} efetuado com sucesso!`)
        return novoFilme
    }
    catch(erro) {
        console.log(`\nFalha ao cadastrar filme: ${erro.message}`)
    }
}

function numeroCarteirinha() {
    const numero = Math.floor(Math.random() * 100000)
    const numeroCarteirinha = String(numero).padStart(5, '0')

    return numeroCarteirinha
}

function cadastraCliente() {
    console.log ('----- CADASTRO DE CLIENTE -----')

    try {
        const numeroCarteira = numeroCarteirinha()
        const cpf = prompt('CPF: ')
        const nome = prompt('Nome Completo: ')

        const novoCliente = new Cliente(numeroCarteira, cpf, nome)
        clientela.push(novoCliente)

        return novoCliente
    }
    catch(erro) {
        console.log(`\nFalha ao cadastrar cliente: ${erro.message}`)
    }
}

function cadastraFuncionario() {
    console.log('-----CADASTRO DE FUNCIONÁRIO-----')
    try {
        const matricula = Date.now()
        const cpf = prompt('CPF: ')
        const nome = prompt('Nome Completo: ')
        const funcao = prompt('Função: ')

        const novoFuncionario = new Funcionario(matricula, cpf, nome, funcao)
        funcionarios.push(novoFuncionario)

        return novoFuncionario
    }
    catch(erro) {
        console.log(`Falha ao cadastrar funcionário: ${erro.message}`)
    }
}

function cadastraFornecedor() {
    console.log('-----CADASTRO DE FORNECEDOR-----')

    try {
        const id = Date.now()
        const cnpj = prompt('CNPJ: ')
        const nome = prompt('Nome: ')
        const contato = prompt('Contato: ')

        const novoFornecedor = new Fornecedor(id, cnpj, nome, contato)
        fornecedores.push(novoFornecedor)

        return novoFornecedor
    }
    catch(erro) {
        console.log(`Falha ao cadastrar fornecedor: ${erro.message}`)
    }
}

let acervoFilmes = []
let clientela = []
let funcionarios = []
let fornecedores = []

app.get('/', (req, res) => {
    res.send('SITE: LOCADORA SHOE-LEATHER')
})

app.get('/acervo', (req, res) => {
    res.json(acervoFilmes)
})

app.get('/clientes', (req, res) => {
    res.json(clientela)
})

app.get('/funcionarios', (req, res) => {
    res.json(funcionarios)
})

app.get('/fornecedores', (req, res) => {
    res.json(fornecedores)
})

app.post('/cadastrar-filme', (req, res) => {
    const novoFilme = cadastraFilme();

    if (novoFilme) {
        res.send(`O filme ${novoFilme._titulo} foi cadastrado com sucesso!`)
    } else {
        res.status(400).send('Falha ao cadastrar filme.')
    }
})

app.post('/cadastrar-cliente', (req, res) => {
    const novoCliente = cadastraCliente()

    if (novoCliente) {
        res.send(`O cliente ${novoCliente._nome} foi cadastrado com sucesso!`)
    } else {
        res.status(400).send('Falha ao cadastrar cliente.')
    }
})

app.post('/cadastrar-funcionario', (req, res) => {
    const novoFuncionario = cadastraFuncionario()

    if (novoFuncionario) {
        res.send(`O funcionario ${novoFuncionario._nome} foi cadastrado com sucesso!`)
    } else {
        res.status(400).send('Falha ao cadastrar funcionário.')
    }
})

app.post('/cadastrar-fornecedor', (req, res) => {
    const novoFornecedor = cadastraFornecedor()

     if (novoFornecedor) {
        res.send(`O fornecedor ${novoFornecedor._nome} foi cadastrado com sucesso!`)
    } else {
        res.status(400).send('Falha ao cadastrar fornecedor.')
    }
})

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
