const fs = require('fs');
let productos = JSON.parse(fs.readFileSync(__dirname + "/../database/productos.json"));

const productoController = {
    formulario: function (req,res,next){
        res.render ('index');
    },
    crear: function (req,res,next){
        productos.push(req.body);
        let productosJSON = JSON.stringify(productos,null,2);
        fs.writeFileSync(__dirname + "/../database/productos.json", productosJSON);
        res.send ("Producto Creado");
    },
    editar: function (req, res, next){
        let idProducto = req.params.id;
        let encontrado;
        for (let i = 0; i < productos.length; i++){
            if (productos[i].id == idProducto){
              return res.render('editar', {encontrado: productos[i]});
            };
        };
            res.send('producto no encontrado');
    },
    actualizar: function (req, res, next){
        let idproducto = req.params.id;
        let editarproducto = productos.map(function(productos){
            if(productos.id == idproducto){
                productos = req.body;
                productos.id = idproducto;
            };
            return productos;
        });
        editarproductoJSON = JSON.stringify(editarproducto, null, 2);
        fs.writeFileSync(__dirname + "/../database/productos.json", editarproductoJSON);
        res.render('editar');
    },
    destroy: function(req, res, next){
        let iddestroy = req.params.id;
        let productodestroy = productos.filter(function(productos){
            return productos.id != iddestroy;
        });
        productodestroyJSON = JSON.stringify(productodestroy, null, 2);
        fs.writeFileSync(__dirname + "/../database/productos.json", productodestroyJSON);
        res.send('el producto se elimino');
    },
};
module.exports = productoController;