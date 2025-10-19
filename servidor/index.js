const express = require('express')
const app = express()
const prompt = require('prompt-sync')()

class Filme {
    #codigo
    #titulo
    #diretor
    #genero
    #tipoMidia
    #dataLocacao
    #dataDevolucao

    constructor(codigo, titulo, diretor, genero, tipoMidia) {
        this.titulo = titulo
        this.diretor = diretor
        this.genero = genero
    }

    get codigo() {
        return this.#codigo
    }

    set codigo(novoCodigo) {
        if(typeof novoCodigo !== 'number'){
            throw new Error('Código inválido. Tente novamente.')
        }

        this.#codigo = novoCodigo
    }

    get titulo() {
        return this.#titulo
    }

    set titulo(novoTitulo) {
        if (typeof novoTitulo !== 'string' || novoTitulo.trim() === '') {
            throw new Error('Por favor, informe um título válido a ser cadastrado.')
        }
        this.#titulo = novoTitulo.toUpperCase()
    }

    get diretor() {
        return this.#diretor
    }

    set diretor(novoDiretor) {
        if (typeof novoDiretor !== 'string' || novoDiretor.trim() === '') {
            throw new Error('Por favor, informe um diretor válido a ser cadastrado.')
        }
        this.#diretor = novoDiretor.toUpperCase()
    }

    get genero() {
        return this.#genero
    }

    set genero(novoGenero) {
        if (typeof novoGenero !== 'string' || novoGenero.trim() === '') {
            throw new Error('Por favor, informe um gênero válido a ser cadastrado.')
        }
        this.#genero = novoGenero.toUpperCase()
    }
    
    get tipoMidia() {
        return this.#tipoMidia
    }

    set tipoMidia(novoTipoMidia) {
        if(typeof novoTipoMidia !== 'string' || novoTipoMidia.trim() === '') {
            throw new Error('Tipo de Mídia inválido. Tente novamente.')
        }
        this.#tipoMidia = novoTipoMidia.toUpperCase()
    }
}

class Cliente {
    #numeroCarteira
    #cpf
    #nome
    #locacoes
    #pendencias

    constructor(numeroCarteira, cpf, nome) {
        this.numeroCarteira = numeroCarteira
        this.cpf = cpf
        this.nome = nome
    }

    get numeroCarteira() {
        return this.#numeroCarteira
    }

    set numeroCarteira(novoNumeroCarteira) {
        if (typeof novoNumeroCarteira !== 'String' || novoNumeroCarteira.trim() === '') {
            throw new Error('Número de carteirinha inválido. Tente novamente.')
        }
        this.#numeroCarteira = novoNumeroCarteira
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'string' || novoCpf.trim() === '') {
            throw new Error('CPF inválido. Tente novamente.')
        } else if (novoCpf.split('').length < 11) {
            throw new Error('CPF incompleto, coloque todos os caracteres.')
        } else if (novoCpf.split('').length > 11) {
            throw new Error('O CPF informado é muito grande, informe corretamente.')
        }
        this.#cpf = novoCpf
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this.#nome = novoNome.toUpperCase()
    }
}

class Funcionario {
    #matricula
    #cpf
    #nome
    #funcao

    constructor(matricula, cpf, nome, funcao) {
        this.matricula = matricula
        this.cpf = cpf
        this.nome = nome
        this.funcao = funcao
    }

    get matricula() {
        return this.#matricula
    }

    set matricula(novaMatricula) {
        if (typeof novaMatricula !== 'number') {
            throw new Error('Matrícula inválida. Tente novamente.')
        }
        this.#matricula = novaMatricula
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'string' || novoCpf.trim() === '') {
            throw new Error('CPF inválido. Tente novamente.')
        } else if (novoCpf.split('').length < 11) {
            throw new Error('CPF incompleto, coloque todos os caracteres.')
        } else if (novoCpf.split('').length > 11) {
            throw new Error('O CPF informado é muito grande, informe corretamente.')
        }
        this.#cpf = novoCpf
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this.#nome = novoNome.toUpperCase()
    }

    get funcao() {
        return this.#funcao
    }

    set funcao(novaFuncao) {
        if (typeof novaFuncao !== 'string' || novaFuncao.trim() === '') {
            throw new Error('Função inválida. Tente novamente.')
        }
        this.#funcao = novaFuncao.toUpperCase()
    }
}

class Fornecedor {
    #id
    #cnpj
    #nome
    #contato

    constructor(id, cnpj, nome, contato) {
        this.id = id
        this.cnpj = cnpj
        this.nome = nome
        this.contato = contato
    }

    get id() {
        return this.#id
    }
    
    set id(novoId) {
        if (typeof novoId !== 'number') {
            throw new Error('ID inválido. Tente novamente.')
        }
    }

    get cnpj() {
        return this.#cnpj
    }

    set cnpj(novoCnpj) {
        if (typeof novoCnpj !== 'string' || novoCnpj.trim() === '') {
            throw new Error('CNPJ inválido. Tente novamente.')
        } else if (novoCnpj.split('').length < 14) {
            throw new Error('CNPJ incompleto, coloque todos os caracteres.')
        } else if (novoCnpj.split('').length > 14) {
            throw new Error('O CNPJ informado é muito grande, informe corretamente.')
        }
        this.#cnpj = novoCnpj
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        if (typeof novoNome !== 'string' || novoNome.trim() === '') {
            throw new Error('Nome inválido. Tente novamente.')
        } else if (novoNome.split(' ').length < 2) {
            throw new Error('Por favor, digite nome e sobrenome para o cadastro.')
        }

        this.#nome = novoNome.toUpperCase()
    }

    get contato() {
        return this.#contato
    }

    set contato(novoContato) {
        if (typeof novoContato !== 'string' || novoContato.trim() === '') {
            throw new Error('Contato inválido. Tente novamente.')
        }

        this.#contato = novoContato.toUpperCase()
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

        console.log(`\nCliente ${novoCliente.nome} cadastrado com sucesso!`)
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

        console.log(`\nFuncionário ${novoFuncionario.nome} cadastrado com sucesso!`)
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

        console.log(`Fornecedor ${novoFornecedor.nome} cadastrado com sucesso!`)
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

app.get('/clientes', (req, res) => {
    res.json(clientela)
})

app.get('/acervo', (req, res) => {
    res.json(acervoFilmes)
})

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
