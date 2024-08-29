const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("Servidor Escuchando 4000");
});
