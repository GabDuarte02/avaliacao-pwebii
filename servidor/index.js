const express = require('express');
const app = express();

app.use(express.json());

let operarios = [
    {
        id: 12345,
        nome: 'Jucenal',
        dataNascimento: '15.05.2002',
        sexo: 'masculino'
    }
];

//mensagem inicial
app.get('/', (req, res) => {
    res.send('Banco de funcionários da Metalúrgica Cruz & Cia.')
})

//mostra a lista de operários ativos na fábrica
app.get('/operarios', (req, res) => {
    res.json(operarios);
});

app.get('/operarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const operario = operarios.find(o => o.id === id);

    if (!operario) {
        return res.status(404).send('Operário não encontrado.');
    } else

        res.json(operario)
});

//cadastramos uma nova operária
app.post('/operarios', (req, res) => {
    const novoOperario = {
        id: 56789,
        nome: 'Ana Silva',
        dataNascimento: '10.10.2003',
        sexo: 'feminino'
    };
    operarios.push(novoOperario);
    res.status(201).json(novoOperario);
});

app.put('/operarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = operarios.findIndex(o => o.id === id);

    if (index === -1) {
        return res.status(404).send('Operário não encontrado.');
    }

    //precisamos atualizar o objeto de ID 12345, que está sem sobrenome e sua data está incorreta
    const operarioAtualizado = {
        id: 12345,
        nome: 'Jucenal Santos',
        dataNascimento: '01.01.2003',
        sexo: 'masculino'
    };

    operarios[index] = operarioAtualizado;
    res.json(operarioAtualizado);
});
app.patch('/operarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = operarios.findIndex(o => o.id === id);

    if (index === -1) {
        return res.status(404).send('Operário não encontrado.');
    }

    const operarioExistente = operarios[index];
    const dadosParaAtualizar = req.body;

    const operarioAtualizado = {
        ...operarioExistente, 
        ...dadosParaAtualizar
    };
    
    operarioAtualizado.id = id;

    operarios[index] = operarioAtualizado;
    res.json(operarioAtualizado);
});
//simula o desligamento de um funcionário
app.delete('/operarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = operarios.findIndex(o => o.id === id);

    if (index === -1) {
        return res.status(404).send('Operário não encontrado.');
    }

    operarios.splice(index, 1);
    res.status(200).send('Operário deletado com sucesso.');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
