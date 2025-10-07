const express = require('express');
const app = express();

app.use(express.json());

let operarios = [
    {
        id: 1722308400000,
        nome: 'Jucenal',
        dataNascimento: '15.05.2002',
        sexo: 'masculino'
    }
];

app.get('/', (req, res) =>{
    res.send('Banco de funcionários da Metalúrgica Cruz & Cia.')
})

app.get('/operarios', (req, res) => {
    res.json(operarios);
});

app.get('/operarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const operario = operarios.find(o => o.id === id);

    if (!operario) {
        return res.status(404).send('Operário não encontrado.');
    }
    res.json(operario);
});

app.post('/operarios', (req, res) => {
    const novoOperario = {
        id: Date.now(),
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        sexo: req.body.sexo
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

    const operarioAtualizado = {
        id: id,
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        sexo: req.body.sexo
    };

    operarios[index] = operarioAtualizado;
    res.json(operarioAtualizado);
});

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
