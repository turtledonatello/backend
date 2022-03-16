let Producto = require('./Producto');
const express = require('express');
const app = express();
app.use(express.json());
let Productos = [
  { title: 'Producto 1', price: 123, id: 1, thumbnail: 'urlThumb' },
];
let ban = true;

app.listen(8080, () => {
  console.log(`SERVIDOR http://localhost:8080`);
});
process.on('uncaughtException', function (err) {
  if (err.code === 'EADDRINUSE') console.log('Servidor ya iniciado');
  else console.log(err);
});

app.post('/api/productos/guardar', (req, res) => {
  let inc = Productos.length;

  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );

  producto.id = inc + 1;

  Productos.push(producto);
  res.sendStatus(201);
});

app.get('/api/productos/listar', function (req, res) {
  if (!Productos || Productos.length === 0) {
    res.send({ error: 'No hay prodcutos cargados' });
  }
  res.send(Productos);
});

app.get('/api/productos/listar/:id', (req, res) => {
  const id = req.params.id;
  const product = Productos.find((prod) => prod.id == id);
  if (!product) {
    res.send({ error: 'Producto no encontrado' });
  }
  res.send(product);
});
