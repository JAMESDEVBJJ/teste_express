import express from "express";
import productsRepository from "../repository/productRepo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsRepository.getAll();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productsRepository.getById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const product = await productsRepository.create(nome, preco, estoque);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    const product = await productsRepository.update(
      req.params.id,
      nome,
      preco,
      estoque
    );

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await productsRepository.remove(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json({
      message: "Produto deletado com sucesso",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

export default router;
