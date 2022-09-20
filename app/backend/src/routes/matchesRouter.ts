import { Router } from 'express';
import Authorization from '../middlewares/tokenMiddleware';
import MatchesController from '../controllers/matchesController';
import RequestUser from '../interfaces/interfaceRequest';

const router = Router();
const matchesController = new MatchesController();
const authorization = new Authorization();

router.get('/', (req, res) => matchesController.getAll(req, res));
router.post(
  '/',
  (req, res, next) => authorization.validateToken(req as RequestUser, res, next),
  (req, res) => matchesController.create(req, res),
);
router.patch('/:id', (req, res) => matchesController.update(req, res));
router.patch('/:id/finish', (req, res) => matchesController.end(req, res));

export default router;
