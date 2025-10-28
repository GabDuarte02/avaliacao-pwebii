const express = require('express');
const app = express();
const fs = require('fs');

class Cliente {
    _cpf;
    _nome;
    
    constructor (numeroCarteira, cpf, nome) {
        this.numeroCarteira = numeroCarteira;
        this.cpf = cpf;
        this.nome = nome;
    }

    get cpf() {
        return this.cpf;
    };
    set cpf(novoCpf) {
        if(typeof novoCpf !== 'string' || !novoCpf || novoCpf.split('').length < 11) {
            throw new Error('CPF inválido.');
        }

        this._cpf = novoCpf
    };

    get nome() {
        return this.nome;
    };
    set nome(novoNome) {
        if(typeof novoNome !== 'string' || !novoNome){
            throw new Error('Nome inválido.');
        } else if (novoNome.split(' '). length < 2){
            throw new Error('Por favor, inserir nome completo.');
        };
        this._nome = novoNome;
    };
};

class Filme {
    constructor(codigo, titulo, ano, diretor, genero){
        this.codigo = codigo;
        this.titulo = titulo;
        this.ano = ano;
        this.diretor = diretor;
        this.genero = genero
    };
};
