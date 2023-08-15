const reportController = require("../controllers/reportController");
module.exports = function (fastify, opts, done) {
  fastify.get("/findAll", reportController.findAll);
  fastify.get("/find/:id", reportController.findOne);
  fastify.get(
    "/findAllReportsFromUser/:id",
    reportController.findAllReportsFromUser,
  );
  fastify.get(
    "/findAllReportedsFromUser/:id",
    reportController.findAllReportedsFromUser,
  );
  fastify.post("/create", reportController.createReport);
  fastify.patch("/update/:id", reportController.updateReport);
  done();
};
