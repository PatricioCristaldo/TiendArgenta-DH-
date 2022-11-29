let db = require('../../database/models')

module.exports = {
    listado: (req, res) => {
        db.Productos.findAll()
            .then(productos => {
                let totalResp={
                    referencia: 'LISTADO DE PRODUCTOS',
                    status :200,
                    meta:{
                        count: productos.length,
                        countByCategory: {
                            Cotillon: productos.filter(byCategory => byCategory.categoriasId == 1).length,
                            Coleccionables: productos.filter(byCategory => byCategory.categoriasId == 2).length,
                            IndumentariaMujer: productos.filter(byCategory => byCategory.categoriasId == 3).length,
                            IndumentariaHombre: productos.filter(byCategory => byCategory.categoriasId == 4).length,
                            IndumentariaMujer: productos.filter(byCategory => byCategory.categoriasId == 5).length,
                            url: `http://localhost:3012/api/productos/`
                        },
                    },                    
                    data: productos.map( byCategory => {
                        return {
                            id: byCategory.id,
                            name: byCategory.titulo,
                            description: byCategory.descripcion,
                            detail: "http://localhost:3012/api/productos/"+byCategory.id
                        }
                    })
                }
                return res.status(200).json(totalResp)
            }).catch(errors => res.status(500).json('Error al acceder a la vista'));
    },
    detalles: (req, res) => {
        const id = req.params.id;
        db.Productos.findByPk(id, {
            include: [{all: true}]
        })
            .then(productos => {
                let detailResp={
                    referencia: 'DETALLE DE PRODUCTO',
                    status: 200,
                    meta: {
                        
                        imagen: "/images/productos/"+productos.imagenes[0].nombre,
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                    },
                    data: {
                        id: productos.id,
                        titulo: productos.titulo,
                        categoria: productos.categoria,
                        subCategoria: productos.subcategoria,
                        precio: productos.precio,
                        descuento: productos.descuento,
                        stock: productos.stock,
                        descripcion: productos.descripcion,
                        volver: `http://localhost:3012/api/productos/`
                    }
                }
                return res.status(200).json(detailResp)
            }).catch(error => res.send(error))
    }
}