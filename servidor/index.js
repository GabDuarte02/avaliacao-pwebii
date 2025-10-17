const express = require('express')
const app = express()

class Filme {
    #titulo
    #diretor
    #genero
    #dataLocacao
    #dataDevolucao

    constructor(titulo, diretor, genero) {
        this.titulo = titulo
        this.diretor = diretor
        this.genero = genero
    }

    get titulo() {
        return this.#titulo
    }

    set titulo(novoTitulo) {
        if (typeof novoTitulo !== 'string' || novoTitulo.trim() === '') {
            throw new Error('Por favor, informe um título válido a ser cadastrado.')
        }
        this.#titulo = novoTitulo
    }

    get diretor() {
        return this.#diretor
    }

    set diretor(novoDiretor) {
        if (typeof novoDiretor !== 'string' || novoDiretor.trim() === '') {
            throw new Error('Por favor, informe um diretor válido a ser cadastrado.')
        }
        this.#diretor = novoDiretor
    }

    get genero() {
        return this.#genero
    }

    set genero(novoGenero) {
        if (typeof novoGenero !== 'string' || novoGenero.trim() === '') {
            throw new Error('Por favor, informe um gênero válido a ser cadastrado.')
        }
        this.#genero = novoGenero
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
        if (typeof novoNumeroCarteira !== 'number') {
            throw new Error('Número de carteirinha inválido. Tente novamente.')
        }
        this.#numeroCarteira = novoNumeroCarteira
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(novoCpf) {
        if (typeof novoCpf !== 'number') {
            throw new Error('CPF inválido. Tente novamente.')
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

        this.#nome = novoNome
    }
}

class Fornecedor {
    #id
    #cnpj
    #nome
    #contato

    constructor(cnpj, nome, contato) {
        this.cnpj = cnpj
        this.nome = nome
        this.contato = contato
    }

    get cnpj() {
        return this.#cnpj
    }

    set cnpj(novoCnpj) {
        if (typeof novoCnpj !== 'number') {
            throw new Error('CNPJ inválido. Tente novamente.')
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

        this.#nome = novoNome
    }

    get contato() {
        return this.#contato
    }

    set contato(novoContato) {
        if (typeof novoContato !== 'string' || novoContato.trim() === '') {
            throw new Error('Contato inválido. Tente novamente.')
        }

        this.#contato = novoContato
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
        if (typeof novoCpf !== 'number') {
            throw new Error('CPF inválido. Tente novamente.')
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

        this.#nome = novoNome
    }

    get funcao() {
        return this.#funcao
    }

    set funcao(novaFuncao) {
        if (typeof novaFuncao !== 'string' || novaFuncao.trim() === '') {
            throw new Error('Função inválida. Tente novamente.')
        }
        this.#funcao = novaFuncao
    }
}

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
