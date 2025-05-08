import { getDirectors, getMovies } from "@/utils/db";

export default async function handler(req, res) {

	const movies = await getMovies();
	const directors = await getDirectors();

	if (req.method === "GET") {
		directors.forEach((director) => {
			director.movies = movies.filter((movie) => movie.directorId === director.id);
		});

		if (!directors || directors.length === 0) {
			return res.status(404).json({ message: "No directors found" });
		}
		
		res.status(200).json(directors);
	}
}