import { Router } from 'express';
// import Authorization from '../middlewares/tokenMiddleware';
// import RequestUser from '../interfaces/interfaceRequest';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();
// const authorization = new Authorization();

router.get('/home', (req, res) => leaderboardController.getAll(req, res));
router.get('/away', (req, res) => leaderboardController.getAllAway(req, res));
router.get('/', (req, res) => leaderboardController.getAny(req, res));

export default router;
