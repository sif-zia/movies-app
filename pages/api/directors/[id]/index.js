import { getDirectors } from "@/utils/db";

export default async function handler(req, res) {
	const id = req.query.id;
	const method = req.method;

	const directors = await getDirectors();

	if (method === "GET") {
		const director = directors.find((director) => director.id === id);
		if (!director) {
			return res.status(404).json({ message: "Director not found" });
		}
		return res.status(200).json(director);
	}
}