const express = require('express');
const app = express();

function cadastraFilme() {
    return {
        titulo: '',
        diretor: '',
        genero: '',
        dataLocacao: 0,
        dataDevolucao: 0
    }
};

function cadastraCliente () {
    return {
        id: 0,
        cpf: '',
        nome: '',
        loacao: {
            alugados: [],
            pendencias: {
                multa: 0,
                itensAtrasados: []
            }
        },
    }
};

function cadastraFornecedor () {
    return {
        id: 0,
        nome: '',
        contato: ''
    }
};

let acervoFilmes = [];

const maquinaMortifera = cadastraFilme();
maquinaMortifera.titulo = 'Máquina Mortífera';
maquinaMortifera.diretor = 'Richard Donner';
maquinaMortifera.genero = 'Ação';
acervoFilmes.push(maquinaMortifera);

let clientela = [];

const cliente1 = cadastraCliente();
cliente1.id = 12345;
cliente1.cpf = '123.456.789-10';
cliente1.nome = 'Johnny McLovin';
clientela.push(cliente1);

let fornecedores = [];

const embraFilmes = cadastraFornecedor();
embraFilmes.id = 177777;
embraFilmes.nome = 'Embra Filmes co.'
embraFilmes.contato = '+55 (12) 3456-7890'

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
