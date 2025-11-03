const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
app.use(express.json());

const port = 3000;
const acervo = './acervo.json';
const clientela = './clientela.json';
const locacoes = './locacoes.json';

class Filme {
    _titulo;
    _ano;
    _diretor;
    _genero;
    _tipoMidia;

    constructor(codigo, titulo, ano, diretor, genero, tipomidia) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.ano = ano;
        this.diretor = diretor;
        this.genero = genero;
        this.tipoMidia = tipomidia;
    }

    get titulo() {
        return this._titulo;
    }
    set titulo(novoTitulo) {
        if (typeof novoTitulo !== 'string' || !novoTitulo) {
            throw new Error('Titulo inválido');
        }
        this._titulo = novoTitulo.toUpperCase();
    }

    get ano() {
        return this._ano;
    }
    set ano(novoAno) {
        if (typeof novoAno !== 'number' || !novoAno) {
            throw new Error('Ano inválido');
        }
        this._ano = novoAno;
    }

    get diretor() {
        return this._diretor;
    }
    set diretor(novoDiretor) {
        if (typeof novoDiretor !== 'string' || !novoDiretor) {
            throw new Error('Diretor inválido');
        }
        this._diretor = novoDiretor.toUpperCase();
    }

    get genero() {
        return this._genero;
    }
    set genero(novoGenero) {
        if (typeof novoGenero !== 'string' || !novoGenero) {
            throw new Error('Gênero inválido');
        }
        this._genero = novoGenero;
    }

    get tipoMidia() {
        return this._tipoMidia;
    }
    set tipoMidia(novoTipoMidia) {
        if (typeof novoTipoMidia !== 'string' || !novoTipoMidia) {
            throw new Error('Tipo de mídia inválido');
        }
        this._tipoMidia = novoTipoMidia;
    }
}

async function lerDados(caminho) {
    const dados = await jsonfile.readFile(caminho);
    return dados;
}

async function escreverDados(caminho, dados) {
    await jsonfile.writeFile(caminho, dados, { spaces: 2 });
}

app.get('/', (req, res) => {
    res.send('GERENCIADOR: LOCADORA SHOE-LEATHER');
});

app.get('/filme', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;
        res.status(200).json(filmes);
    } catch {
        res.status(500).json({ erro: 'Erro ao ler acervo de filmes' });
    }
});

app.post('/filme', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;

        const { titulo, ano, diretor, genero, tipoMidia } = req.body;

        const novoFilme = new Filme(
            Date.now(),
            titulo,
            ano,
            diretor,
            genero,
            tipoMidia
        );

        filmes.push(novoFilme);
        await escreverDados(acervo, dadosCompletos);

        res.status(201).json({ mensagem: `Filme ${novoFilme.titulo} cadastrado com sucesso` });
    } catch (erro) {
        if (erro.message.includes('inválido')) {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: 'Erro ao salvar o filme' });
    }
});

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`);
});
