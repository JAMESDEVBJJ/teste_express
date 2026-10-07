import pool from '../db.js';

const getAll = async () => {
    const result = await pool.query(
        'SELECT * FROM produtos ORDER BY id'
    );

    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM produtos WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const create = async (nome, preco, estoque) => {
    const result = await pool.query(
        `INSERT INTO produtos (nome, preco, estoque)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nome, preco, estoque]
    );

    return result.rows[0];
};

const update = async (id, nome, preco, estoque) => {
    const result = await pool.query(
        `UPDATE produtos
         SET nome = $1, preco = $2, estoque = $3
         WHERE id = $4
         RETURNING *`,
        [nome, preco, estoque, id]
    );

    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM produtos WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};