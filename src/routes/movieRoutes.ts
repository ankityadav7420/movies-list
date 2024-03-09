import express from 'express';
import MovieController from '../controllers/moviesController';

const router = express.Router();

router.get('/movies', MovieController.listMovies);
router.get('/search', MovieController.searchMovies);
router.post('/movies', MovieController.addMovie);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);

export default router;
