// controllers/MovieController.ts
import { Request, Response } from 'express';
import MovieModel, { Movie } from '../models/movieModels';

class MovieController {

    //get all movies
    async listMovies(req: Request, res: Response): Promise<void> {
        try {
            const movies: Movie[] = await MovieModel.find({});
            const count: number = await MovieModel.countDocuments({});

            res.status(201).json({
                message: "All movies listed succesfully",
                count,
                movies,
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //search movies
    async searchMovies(req: Request, res: Response): Promise<void> {
        const query: string = req.query.q as string;

        try {
            const regex = new RegExp(query, 'i');

            const movies: Movie[] = await MovieModel.find({
                $or: [
                    { title: { $regex: regex } },
                    { genre: { $regex: regex } },
                ],
            });
            const totalMovies: number = movies.length;

            res.status(200).json({
                message: "Searched Movies listed successfully",
                count: totalMovies,
                movies,
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //add new movie
    async addMovie(req: Request, res: Response): Promise<void> {
        const { title, genre, rating, streamingLink }: Movie = req.body;
        try {
            const newMovie: Movie = new MovieModel({ title, genre, rating, streamingLink });
            await newMovie.save();
            res.status(201).json({
                message: "New Movie Created succesfully",
                newMovie
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // update movies
    async updateMovie(req: Request, res: Response): Promise<void> {
        const movieId: string = req.params.id;
        const updateData: Partial<Movie> = req.body;
        try {
            const updatedMovie: Movie | null = await MovieModel.findByIdAndUpdate(movieId, updateData, {
                new: true,
            });
            if (updatedMovie) {
                res.status(201).json({
                    message: "Movie Updated succesfully",
                    updatedMovie
                });
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    //delete movie
    async deleteMovie(req: Request, res: Response): Promise<void> {
        const movieId: string = req.params.id;
        try {
            const deletedMovie: Movie | null = await MovieModel.findByIdAndDelete(movieId);
            if (deletedMovie) {
                res.status(201).json({
                    message: "Movie deleted succesfully",
                    deletedMovieId: movieId
                });
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new MovieController();
