import express from 'express';

import dados from '../Data/cardapio.js';

const router = express.Router();


// Verificar se o item existe

function verificarItemExiste(req, res, next) {

    const { id } = req.params;

    const index = dados.findIndex(item => item.id == id);

    if (index < 0) {
        return res.status(404).json({
            erro: "Item do cardápio não encontrado!"
        });
    }

    req.id = id;
    req.index = index;

    return next();
}


// GET - Buscar todos os itens

router.get('/', (req, res) => {

    res.json(dados);

});


// POST - Criar item

router.post('/', (req, res) => {

    const { id, nome, descricao, imagem } = req.body;

    if (!id || !nome || !descricao || !imagem) {

        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });

    }

    const existeItem = dados.some(item => item.id == id);

    if (existeItem) {

        return res.status(400).json({
            erro: "Cadastro já existente!"
        });

    }

    const novoItem = {

        id: Number(id),
        nome,
        descricao,
        imagem

    };

    dados.push(novoItem);

    res.status(201).json(dados);

});


// PUT - Alterar item

router.put('/:id', verificarItemExiste, (req, res) => {

    const { nome, descricao, imagem } = req.body;

    const index = req.index;

    dados[index] = {

        ...dados[index],

        nome: nome !== undefined
            ? nome
            : dados[index].nome,

        descricao: descricao !== undefined
            ? descricao
            : dados[index].descricao,

        imagem: imagem !== undefined
            ? imagem
            : dados[index].imagem

    };

    res.status(200).json(dados[index]);

});


// DELETE - Excluir item

router.delete('/:id', verificarItemExiste, (req, res) => {

    const index = req.index;

    const id = req.id;

    dados.splice(index, 1);

    res.status(204).send();

});


export default router;