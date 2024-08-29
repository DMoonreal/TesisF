exports.sucess = (req, res, mensaje, status) => {
  const statusCode = status || 200;
  const mensajeOK = mensaje || "";
  res.status(status).send({
    error: false,
    status: statusCode,
    body: mensajeOK,
  });
};

exports.error = (req, res, mensaje, status) => {
  const statusCode = status || 500;
  const mensajeErr = mensaje || "Intento Fallido Vuelva Intentarlo mas tarde";
  res.status(status).send({
    error: true,
    status: statusCode,
    body: mensajeErr,
  });
};
