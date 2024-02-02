//importanciones
require("dotenv").config(); //importa el modulo dotenv
const express = require("express"); //importa el modulo express
const mongoose = require("mongoose"); //importa el modulo mongoose
const session = require("express-session"); //importa el modulo express-session

const app = express(); //crea una instancia de express
const PORT = process.env.PORT || 4000; //crea una variable con el puerto

dbConection(); //ejecuta la funcion dbConection

app.use(express.urlencoded({extended: true})); //permite el uso de json
app.use(express.json()); //permite el uso de json

app.use(session({ //configura la sesion
  secret: "my secret key", //configura el secreto
  saveUninitialized: true, //guarda las sesiones no inicializadas
  resave: false, //no vuelve a guardar las sesiones
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message; //variable local
  delete req.session.message; //elimina la variable de sesion
  next(); //siguiente middleware
}) 

app.set("view engine", "ejs"); //configura el motor de vistas

app.use("/", require("./routes/routes")); //usa el archivo de rutas

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); //inicia el servidor

async function dbConection() { //funcion para conectar a la base de datos
  try {
    await mongoose.connect(process.env.DB_URI); //conecta a la base de datos
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}
