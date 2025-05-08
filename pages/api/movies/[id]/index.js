import { getMovies } from "@/utils/db";

export default async function handler(req, res) {
	const id = req.query.id;
	const method = req.method;
	
	const movies = await getMovies();

	if (method === "GET") {
		const movie = movies.find((movie) => movie.id === id);
		if (!movie) {
			return res.status(404).json({ message: "Movie not found" });
		}
		return res.status(200).json(movie);
	}
}