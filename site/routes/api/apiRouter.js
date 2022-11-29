const {listado, detalles} = require('../../controllers/apiController/apiProductos');
const {listUsers, idUsers} = require('../../controllers/apiController/apiUsers');
const express = require('express');
const router = express.Router();

/* GET API DE PRODUCTOS. */
router.get('/usuarios', listUsers);
router.get('/usuarios/:id', idUsers);

/* GET API DE PRODUCTOS. */
router.get('/productos', listado);
router.get('/productos/:id', detalles);


module.exports = router;