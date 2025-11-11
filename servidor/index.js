const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
app.use(express.json());

const port = 3000;
const acervo = './acervoFilmes.json';
const clientela = './clientela.json';
const locacoes = './locacoes.json';

// ========== CLASSE FILME ==========
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

app.get('/', (req, res) => {
    res.send('GERENCIADOR: LOCADORA SHOE-LEATHER');
});

app.get('/filme', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;
        res.status(200).json(filmes);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao ler acervo de filmes' });
    }
});

app.get('/filme/:codigo', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;

        const filmeAchado = filmes.find(f => f.codigo === codigo);

        res.status(200).json(filmeAchado)

    } catch (erro) {
        res.status(400).json({ erro: `${erro.message}` });
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

        res.status(201).json({ mensagem: `Filme ${novoFilme._titulo} cadastrado com sucesso` });
    } catch (erro) {
        if (erro.message.includes('inválido')) {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: 'Erro ao salvar o filme' });
    }
});

app.put('/filme/:codigo', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        const { titulo, ano, diretor, genero, tipoMidia } = req.body;

        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;

        const index = filmes.findIndex(f => f.codigo === codigo);
        if (index === -1) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        const filmeAtual = filmes[index];

        if (titulo) filmeAtual._titulo = titulo;
        if (ano) filmeAtual._ano = ano;
        if (diretor) filmeAtual._diretor = diretor;
        if (genero) filmeAtual._genero = genero;
        if (tipoMidia) filmeAtual._tipoMidia = tipoMidia;

        await escreverDados(acervo, dadosCompletos);

        res.status(200).json({ mensagem: `Filme ${filmeAtual._titulo} atualizado com sucesso` });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

app.patch('/filme/:codigo', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        const novosDados = req.body;

        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;

        const index = filmes.findIndex(f => f.codigo === codigo);
        if (index === -1) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        const filme = filmes[index];

        if (novosDados.titulo !== undefined) filme._titulo = novosDados.titulo;
        if (novosDados.ano !== undefined) filme._ano = novosDados.ano;
        if (novosDados.diretor !== undefined) filme._diretor = novosDados.diretor;
        if (novosDados.genero !== undefined) filme._genero = novosDados.genero;
        if (novosDados.tipoMidia !== undefined) filme._tipoMidia = novosDados.tipoMidia;

        await escreverDados(acervo, dadosCompletos);

        res.status(200).json({ mensagem: `Filme ${filme._titulo} atualizado parcialmente com sucesso.` });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

app.delete('/filme/:codigo', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);

        const dadosCompletos = await lerDados(acervo);
        const filmes = dadosCompletos.filmes;

        const index = filmes.findIndex(f => f.codigo === codigo);
        if (index === -1) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        const filmeRemovido = filmes.splice(index, 1)[0];
        await escreverDados(acervo, dadosCompletos);

        res.status(200).json({ mensagem: `Filme ${filmeRemovido._titulo} removido com sucesso` });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// ========== CLASSE LOCAÇÃO ==========
class Locacao {
    _codigoFilme;
    _carteirinhaCliente;
    _dataLocacao;
    _dataDevolucaoPrevista;
    _dataDevolucaoReal;
    _valorLocacao;
    _status;

    constructor(codigoFilme, carteirinhaCliente) {
        this.codigo = Date.now();
        this.codigoFilme = codigoFilme;
        this.carteirinhaCliente = carteirinhaCliente;
        this.dataLocacao = dataLocacao;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.dataDevolucaoReal = null;
        this.valorLocacao = 10;
        this.status = 'ATIVA';
    }

    get codigoFilme() {
        return this._codigoFilme;
    }
    set codigoFilme(novoCodigoFilme) {
        if (typeof novoCodigoFilme !== 'number' || !novoCodigoFilme) {
            throw new Error('Código do filme inválido');
        }
        this._codigoFilme = novoCodigoFilme;
    }

    get carteirinhaCliente() {
        return this._carteirinhaCliente;
    }
    set carteirinhaCliente(novaCarteirinha) {
        if (typeof novaCarteirinha !== 'string' || !novaCarteirinha) {
            throw new Error('Carteirinha inválida');
        }
        this._carteirinhaCliente = novaCarteirinha;
    }

    get dataLocacao() {
        return this._dataLocacao;
    }
    set dataLocacao(novaData) {
        if (typeof novaData !== 'string' || !novaData) {
            throw new Error('Data de locação inválida');
        }
        this._dataLocacao = novaData;
    }

    get dataDevolucaoPrevista() {
        return this._dataDevolucaoPrevista;
    }
    set dataDevolucaoPrevista(novaData) {
        if (typeof novaData !== 'string' || !novaData) {
            throw new Error('Data de devolução prevista inválida');
        }
        this._dataDevolucaoPrevista = novaData;
    }

    get dataDevolucaoReal() {
        return this._dataDevolucaoReal;
    }
    set dataDevolucaoReal(novaData) {
        this._dataDevolucaoReal = novaData;
    }

    get status() {
        return this._status;
    }
    set status(novoStatus) {
        const statusValidos = ['ATIVA', 'DEVOLVIDA', 'ATRASADA'];
        if (!statusValidos.includes(novoStatus)) {
            throw new Error('Status inválido');
        }
        this._status = novoStatus;
    }
}

// ========== ROTAS DE LOCAÇÃO ==========

// Listar todas as locações ativas
app.get('/locacao', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(locacoes);
        res.status(200).json(dadosCompletos.locacoes);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao ler locações ativas' });
    }
});

// Buscar locação por código
app.get('/locacao/:codigo', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        const dadosCompletos = await lerDados(locacoes);
        const locacao = dadosCompletos.locacoes.find(l => l.codigo === codigo);

        if (!locacao) {
            return res.status(404).json({ erro: 'Locação não encontrada' });
        }

        res.status(200).json(locacao);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// Registrar nova locação
app.post('/locacao', async (req, res) => {
    try {
        const { codigoFilme, carteirinhaCliente } = req.body;

        // Valida campos obrigatórios
        if (!codigoFilme || !carteirinhaCliente) {
            return res.status(400).json({
                erro: 'Campos obrigatórios: codigoFilme e carteirinha'
            });
        }

        // Verifica se o cliente existe
        const dadosClientes = await lerDados(clientela);
        const cliente = dadosClientes.clientes.find(c => c.carteirinha === carteirinhaCliente);

        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }

        // Verifica se o filme existe
        const dadosFilmes = await lerDados(acervo);
        const filme = dadosFilmes.filmes.find(f => f.codigo === codigoFilme);

        if (!filme) {
            return res.status(404).json({ erro: 'Filme não encontrado no acervo' });
        }

        // Verifica se o filme já está alugado
        const dadosLocacoes = await lerDados(locacoes);
        const locacoesAtivas = dadosLocacoes.locacoes;

        const filmeAlugado = locacoesAtivas.find(
            l => l._codigoFilme === codigoFilme && l._status === 'ATIVA'
        );

        if (filmeAlugado) {
            return res.status(400).json({ erro: 'Este filme já está alugado' });
        }

        // Cria dados da locação
        const dataLocacao = new Date().toISOString().split('T')[0];
        const dataDevolucaoPrevista = new Date();
        dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 7);

        const novaLocacao = {
            _codigo: Date.now(),
            _codigoFilme: codigoFilme,
            _carteirinhaCliente: carteirinhaCliente,
            _dataLocacao: dataLocacao,
            _dataDevolucaoPrevista: dataDevolucaoPrevista.toISOString().split('T')[0],
            _status: 'ATIVA'
        };

        // Adiciona e salva
        locacoesAtivas.push(novaLocacao);
        await escreverDados(locacoes, dadosLocacoes);

        res.status(201).json({
            mensagem: 'Locação registrada com sucesso!',
            locacao: novaLocacao
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao registrar locação' });
    }
});

// Registrar devolução de filme
app.patch('/locacao/:codigo/devolver', async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        const dataDevolucaoReal = new Date().toISOString().split('T')[0];

        const dadosLocacoes = await lerDados(locacoes);
        const locacoesAtivas = dadosLocacoes.locacoes;

        const index = locacoesAtivas.findIndex(l => l._codigo === codigo);
        if (index === -1) {
            return res.status(404).json({ erro: 'Locação não encontrada' });
        }

        const locacao = locacoesAtivas[index];

        if (locacao.status === 'DEVOLVIDA') {
            return res.status(400).json({ erro: 'Este filme já foi devolvido' });
        }

        // Atualiza status e data
        locacao.status = 'DEVOLVIDA';
        locacao.dataDevolucaoReal = dataDevolucaoReal;

        await escreverDados(locacoes, dadosLocacoes);

        res.status(200).json({
            mensagem: 'Filme devolvido com sucesso!',
            locacao
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// ========== CLASSE CLIENTE ==========
class Cliente {
    _carteirinha;
    _nome;
    _email;
    _telefone;

    constructor(nome, email, telefone) {
        this.carteirinha = gerarCarteirinha();
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    get nome() {
        return this._nome;
    }
    set nome(novoNome) {
        if (typeof novoNome !== 'string' || !novoNome.trim()) {
            throw new Error('Nome inválido');
        }
        this._nome = novoNome.trim().toUpperCase();
    }

    get email() {
        return this._email;
    }
    set email(novoEmail) {
        if (typeof novoEmail !== 'string' || !novoEmail.includes('@')) {
            throw new Error('Email inválido');
        }
        this._email = novoEmail.trim().toLowerCase();
    }

    get telefone() {
        return this._telefone;
    }
    set telefone(novoTelefone) {
        if (typeof novoTelefone !== 'string' || novoTelefone.length < 8) {
            throw new Error('Telefone inválido');
        }
        this._telefone = novoTelefone.trim();
    }
}

// ====== ROTAS ======

// 🔹 Listar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(clientela);
        res.status(200).json(dadosCompletos.clientes);
    } catch {
        res.status(500).json({ erro: 'Erro ao ler dados dos clientes' });
    }
});

// 🔹 Buscar cliente por código
app.get('/clientes/:carteirinha', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(clientela);
        const cliente = dadosCompletos.clientes.find(c => c.carteirinha == req.params.carteirinha);
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch {
        res.status(500).json({ erro: 'Erro ao buscar cliente' });
    }
});

// 🔹 Adicionar cliente
app.post('/clientes', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(clientela);
        const { nome, email, telefone } = req.body;

        if (!dadosCompletos.clientes) dadosCompletos.clientes = [];

        const novoCliente = new Cliente( nome, email, telefone);
        dadosCompletos.clientes.push(novoCliente);

        await escreverDados(clientela, dadosCompletos);
        res.status(201).json({ mensagem: `Cliente ${novoCliente.nome} cadastrado com sucesso!` });
    } catch (erro) {
        if (erro.message.includes('inválido')) {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: 'Erro ao salvar cliente' });
    }
});

// 🔹 Atualizar cliente
app.put('/clientes/:carteirinha', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(clientela);
        const indice = dadosCompletos.clientes.findIndex(c => c.carteirinha == req.params.carteirinha);

        if (indice === -1) {
            return res.status(404).json({ erro: 'Cliente não encontrado.' });
        }

        const { nome, email, telefone } = req.body;

        if (!nome || !email || !telefone) {
            return res.status(400).json({ erro: 'PUT exige nome, email e telefone completos.' });
        }

        dadosCompletos.clientes[indice] = {
            carteirinha: req.params.carteirinha,
            nome,
            email,
            telefone
        };

        await escreverDados(clientela, dadosCompletos);
        res.status(200).json({ mensagem: 'Cliente atualizado com sucesso!' });
    } catch {
        res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
    }
});

// 🔹 Remover cliente
app.delete('/clientes/:carteirinha', async (req, res) => {
    try {
        const dadosCompletos = await lerDados(clientela);
        const clientesFiltrados = dadosCompletos.clientes.filter(c => c.carteirinha != req.params.carteirinha);

        if (clientesFiltrados.length === dadosCompletos.clientes.length) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }

        dadosCompletos.clientes = clientesFiltrados;
        await escreverDados(clientela, dadosCompletos);

        res.status(200).json({ mensagem: 'Cliente removido com sucesso!' });
    } catch {
        res.status(500).json({ erro: 'Erro ao remover cliente' });
    }
});

// ====== FUNÇÕES AUXILIARES ======
async function lerDados(caminho) {
    try {
        const dados = await jsonfile.readFile(caminho);
        return dados;
    } catch {
        return { clientes: [] };
    }
}

async function escreverDados(caminho, dados) {
    await jsonfile.writeFile(caminho, dados, { spaces: 2 });
}

function gerarCarteirinha() {
    const numero = Math.floor(Math.random() * 100000)
    const numeroCarteirinha = String(numero).padStart(5, '0')

    return numeroCarteirinha
}

// LISTEN
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});
