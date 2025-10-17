const express = require('express');
const app = express();

class Filme {
    #titulo;
    #diretor;
    #genero;
    #dataLocacao;
    #dataDevolucao;

    constructor(titulo, direto, genero, dataLocacao, dataDevolucao){
        this.titulo = titulo;
        this.diretor = diretor;
        this.genero = genero;

        this.dataLocacao = null;
        this.dataDevolucao = null;
    }

    get titulo () {
        return this.#titulo
    }
};

class Cliente {
    #carteira
    #cpf
    #nome
    #locacoes
    #pendencias
}

class Fornecedor {
    #id
    #cnpj
    #nome
    #contato
}

class Funcionario {
    #matricula
    #cpf
    #nome
    #especialidade
}

app.get('/', (req, res) => {
    res.send('SITE: LOCADORA SHOE-LEATHER');
});

app.get('/clientes', (req, res) => {
    res.json(clientela);
});

app.get('/acervo', (req, res) => {
    res.json(acervoFilmes);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
