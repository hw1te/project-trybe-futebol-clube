import { Router } from 'express';
// import Authorization from '../middlewares/tokenMiddleware';
// import RequestUser from '../interfaces/interfaceRequest';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();
// const authorization = new Authorization();

router.get('/home', (req, res) => leaderboardController.getAll(req, res));

export default router;
