import { Router } from 'express';
import Authorization from '../middlewares/tokenMiddleware';
import RequestUser from '../interfaces/interfaceRequest';
import LoginController from '../controllers/loginController';

const router = Router();
const loginController = new LoginController();
const authorization = new Authorization();
router.post('/', (req, res) => loginController.login(req, res));
router.get(
  '/validate',
  (req, res, next) => authorization.validateToken(req as RequestUser, res, next),
  (req, res) => loginController.getRole(req as RequestUser, res),
);

export default router;
