import { getMovies } from "@/utils/db";

export default async function handler(req, res) {
	const movies = await getMovies();

	if (req.method === "GET") {
		if (!movies || movies.length === 0) {
			return res.status(404).json({ message: "No directors found" });
		}

		res.status(200).json(movies);
	}
}