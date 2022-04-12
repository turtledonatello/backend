const express = require('express');
const multer = require('multer');
const app = express();
const products = [];
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

app.get('/products', (req, res) => {
  res.render('index.ejs', {
    products,
  });
});

app.post('/products', upload.single('file'), (req, res) => {
  // const id = Math.ceil(Math.random() * 100000);
  // console.log(req.body);
  // products.push({ ...req.body, id });
  // res.status(200).redirect('/products');

  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
