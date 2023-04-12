const express = require('express');
const app = express();
const port = 8100;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

let nombre;
let correo;
let curso;
let nivel;
let costo;
let pago;

app.post('/niveles', (req, res) => {
    nombre = req.body.nombre;
    correo = req.body.correo;
    curso = req.body.curso;
    res.render('niveles', { nombre: nombre, correo: correo, curso: curso });
  });

  
  app.post('/pago', (req, res) => {

     nivel = req.body.nivel;
    
    if (nivel === 'basico') {
      costo = 100;
    } else if (nivel === 'intermedio') {
      costo = 200;
    } else if (nivel === 'avanzado') {
      costo = 300;
    }else if (nivel.includes('basico') && nivel.includes('intermedio') && nivel.includes('avanzado')) {
      costo = 600;
    }else if (nivel.includes('basico')   && nivel.includes('intermedio')) {
      costo = 300;
    }else if (nivel.includes('basico') && nivel.includes('avanzado')) {
      costo = 400;
    }else if (nivel.includes('intermedio') && nivel.includes('avanzado')) {
      costo = 500;
    }

  
    res.render('pago', { nombre, correo: correo, curso: curso , nivel, costo:costo});

    });


    app.post('/datos', (req, res) => {
    
      pago = req.body.pago;
    
      let metodo = "";
    
      if (pago === 'tarjeta') {
        metodo = "Tarjeta de credito";
      } else if (pago === 'efectivo') {
        metodo = "Efectivo";
        costo = costo * 0.9
      } 
    
      res.render('datos', { nombre, correo, curso , nivel,costo, metodo:metodo});
  
      });
app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
