const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Obtener Productos
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { users: users, title: "Home Page" });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Agregar Producto
router.post("/add", async (req, res) => {
  try {
    const user = new User({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      Cantidad: req.body.Cantidad,
    });
    await user.save();
    req.session.message = {
      type: "success",
      message: "Producto Agregado Con Exito!",
    };
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});
//Viajar a la vista Productos
router.get("/add", (req, res) => {
  res.render("add_prod", { title: "Add Prod" });
});

// Editar Producto
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    // Busca el producto por su id
    if (!user) {
      return res.redirect("/");
    }

    res.render("edit_prod", { user: user, title: "Edit Prod" });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Actualizar Producto
router.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findByIdAndUpdate(id, {
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      Cantidad: req.body.Cantidad,
    });

    if (!user) {
      return res.redirect("/");
    }
    req.session.message = {
      type: "success",
      message: "Producto Actualizado Con Exito!",
    };
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});


//Eliminar Producto
router.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await User.findByIdAndDelete(id);
    if (!response) {
      return res.redirect("/");
    }
    req.session.message = {
      type: "success",
      message: "Producto Eliminado Con Exito!",
    };
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});
module.exports = router;
