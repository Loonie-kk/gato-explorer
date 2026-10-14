const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const gatos = require("./data/cats.json");
const app = express();
const PORT = 3000;
app.use(cors());

app.use(
  "/fotos",
  express.static(
    path.join(__dirname, "data/fotos"), 
  ),
);

function sortear(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

app.get("/api/gatos/aleatorio", (req, res) => {
  const todasAsFotos = Object.values(gatos).flat();
  const item = sortear(todasAsFotos);
  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`,
  });
});

app.get("/api/gatos/:raca", (req, res) => {
  const raca = req.params.raca.toLocaleLowerCase();
  if (!gatos[raca]) {
    res.status(404).json({
      status: "error",
      message: `Raça "${raca}" não encontrada`,
    });

    return;
  }

  const item = sortear(gatos[raca]); 
  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📂 Coloque as fotos manualmente em: data/fotos/`);
});