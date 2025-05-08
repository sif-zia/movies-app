import { getGenres } from "@/utils/db";

export default async function handler(req, res) {
	const id = req.query.id;
	const method = req.method;

	const genres = await getGenres();

	if (method === "GET") {
		const genre = genres.find((genre) => genre.id === id);
		if (!genre) {
			return res.status(404).json({ message: "Genre not found" });
		}
		return res.status(200).json(genre);
	}
}