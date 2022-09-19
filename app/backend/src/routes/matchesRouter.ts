import { Router } from 'express';
// import Authorization from '../middlewares/tokenMiddleware';
// import RequestUser from '../interfaces/interfaceRequest';
import MatchesController from '../controllers/matchesController';

const router = Router();
const matchesController = new MatchesController();
// const authorization = new Authorization();

router.get('/', (req, res) => matchesController.getAll(req, res));

export default router;
