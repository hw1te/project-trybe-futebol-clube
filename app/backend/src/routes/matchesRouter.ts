import { Router } from 'express';
// import Authorization from '../middlewares/tokenMiddleware';
// import RequestUser from '../interfaces/interfaceRequest';
import MatchesController from '../controllers/matchesController';

const router = Router();
const matchesController = new MatchesController();
// const authorization = new Authorization();

router.get('/', (req, res) => matchesController.getAll(req, res));
router.post('/', (req, res) => matchesController.create(req, res));
router.patch('/:id/finish', (req, res) => matchesController.end(req, res));

export default router;
