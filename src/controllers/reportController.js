const dbConnection = require("../db/dbConnection");
const User = require("../models/userModel");
const Report = require("../models/reportModel");
const errorHandler = require("../errors/errorHandler");
// const pushToQ = require("../queue/pushToQueueHandler");

const findAll = async (request, reply) => {
  try {
    const id = request.headers.authorization;
    if (id == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(id).exec();

      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const findAllReports = await Report.find().exec();
        if (!findAllReports) {
          return await errorHandler(
            404,
            "reports-not-found",
            true,
            request,
            reply,
          );
        }

        await reply.code(200).send({
          success: true,
          data: findAllReports,
        });
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const findOne = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findOneReport = await Report.findById(id).exec();

        if (!findOneReport) {
          return await errorHandler(
            404,
            "report-not-found",
            true,
            request,
            reply,
          );
        }
        await reply.code(200).send({
          success: true,
          data: findOneReport,
        });
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const findAllReportsFromUser = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findAllReports = await Report.find({
          reported_by_user: id,
        }).exec();

        if (!findAllReports) {
          return await errorHandler(
            404,
            "reports-not-found",
            true,
            request,
            reply,
          );
        }
        await reply.code(200).send({
          success: true,
          data: findAllReports,
        });
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const findAllReportedsFromUser = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findAllReports = await Report.find({
          reported_user: id,
        }).exec();
        if (!findAllReports) {
          return await errorHandler(
            404,
            "reports-not-found",
            true,
            request,
            reply,
          );
        } else {
          await reply.code(200).send({
            success: true,
            data: findAllReports,
          });
        }
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const createReport = async (request, reply) => {
  try {
    const userId = request.headers.authorization;

    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const createdReport = await Report.create({
          ...request.body.data,
          reported_by_user: userId,
        });

        if (!createdReport) {
          return await errorHandler(
            400,
            "report-not-created",
            true,
            request,
            reply,
          );
        } else {
          await reply.code(201).send({
            success: true,
            data: createdReport,
          });
        }
      }
    }
  } catch (error) {
    return await errorHandler(400, error, false, request, reply);
  }
};

const updateReport = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findReport = await Report.findById(id).exec();

        if (!findReport) {
          return await errorHandler(
            404,
            "report-not-found",
            true,
            request,
            reply,
          );
        } else {
          const updatedReport = await Report.findByIdAndUpdate(
            findReport._id,
            {
              ...request.body,
            },
            { new: true },
          ).exec();

          if (!updatedReport) {
            return await errorHandler(
              400,
              "report-update-failed",
              true,
              request,
              reply,
            );
          } else {
            await reply.code(200).send({
              success: true,
              data: updatedReport,
            });
          }
        }
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

module.exports = {
  findAll,
  findOne,
  findAllReportsFromUser,
  findAllReportedsFromUser,
  createReport,
  updateReport,
};
