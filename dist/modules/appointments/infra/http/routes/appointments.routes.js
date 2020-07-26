"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AppointmentController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/AppointmentController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var appointmentsRouter = express_1.Router();
var appointmentController = new AppointmentController_1.default();
appointmentsRouter.use(ensureAuthenticated_1.default);
// Post http://localhost:3333/appointments
// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
appointmentsRouter.post('/', appointmentController.create);
exports.default = appointmentsRouter;
