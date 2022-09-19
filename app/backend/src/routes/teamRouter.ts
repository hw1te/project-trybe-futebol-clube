import { Router } from 'express';
// import Authorization from '../middlewares/tokenMiddleware';
// import RequestUser from '../interfaces/interfaceRequest';
import TeamsController from '../controllers/teamsController';

const router = Router();
const teamsController = new TeamsController();
// const authorization = new Authorization();

router.get('/', (req, res) => teamsController.getAll(req, res));
router.get('/:id', (req, res) => teamsController.getById(req, res));

export default router;
