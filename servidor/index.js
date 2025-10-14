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
        cpf: 0,
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
        contato: 0
    }
};

let acervoFilmes = [];

const maquinaMortifera = cadastraFilme();
maquinaMortifera.titulo = 'Máquina Mortífera'
maquinaMortifera.diretor = 'Richard Donner'
maquinaMortifera.genero = 'Ação'

acervoFilmes.push(maquinaMortifera)

app.get('/', (req, res) => {
    res.send('SITE: LOCADORA SHOE-LEATHER')
});

app.get('/acervo', (req, res) => {
    res.json(acervoFilmes)
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
